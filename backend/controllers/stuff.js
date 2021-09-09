const Sauce = require("../models/Sauce");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, sauceObject)
    .then(() => {
      res.status(201).json({
        message: "Sauce updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllStuff = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      switch (req.body.like) {
        case 0:
          if (sauce.usersLiked.includes(req.body.userId)) {
            sauce.likes -= 1;
            sauce.usersLiked = sauce.usersLiked.filter(
              (userid) => userid != req.body.userId
            );
          } else if (sauce.usersDisliked.includes(req.body.userId)) {
            sauce.dislikes -= 1;
            sauce.usersDisliked = sauce.usersDisliked.filter(
              (userid) => userid != req.body.userId
            );
          }
          break;
        case 1:
          sauce.likes += 1;
          sauce.usersLiked.push(req.body.userId);
          break;
        case -1:
          sauce.dislikes += 1;
          sauce.usersDisliked.push(req.body.userId);
          break;
        default:
          console.log("Requête erronée");
      }
      sauce
        .save()
        .then(() => res.status(201).json({ message: "Sauce likée" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) =>
      res.status(403).json({ message: "403:unauthorized request" })
    );
};
