const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Import des routes utilisé
const userRoutes = require("./routes/user");

// Chemin pour ce connecté et verifier la connection a MongoDB
mongoose
  .connect(
    "mongodb+srv://Usertest:0000User@cluster0.fwqmh.mongodb.net/Piquante?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

// rajout a l'entête des headers pour autoriser tout le monde  d'utiliser l'API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

//enregistrement des Applications utilisé
app.use("/api/auth", userRoutes);

app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

module.exports = app;
