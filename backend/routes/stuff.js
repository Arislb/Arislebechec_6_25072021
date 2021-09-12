const express = require("express");
const router = express.Router();

const stuffCtrl = require("../controllers/stuff");
const multer = require("../middleware/multer-config");

//Middleware pour vérifier l'userID
const auth = require("../middleware/auth");

// http://localhost:3000/api/sauces
router.get("/", auth, stuffCtrl.getAllStuff);
router.post("/", auth, multer, stuffCtrl.createSauce);
router.get("/:id", auth, stuffCtrl.getOneSauce);
router.put("/:id", auth, multer, stuffCtrl.modifySauce);
router.delete("/:id", auth, stuffCtrl.deleteSauce);
router.post("/:id/like", auth, stuffCtrl.likeSauce);

module.exports = router;
