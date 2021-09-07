const express = require("express");
const router = express.Router();

//Middleware pour vérifier l'userID
const auth = require("../middleware/auth");

module.exports = router;
