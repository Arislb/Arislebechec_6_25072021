const express = require("express");
const router = express.Router();

const stuffCtrl = require("../controllers/stuff");
const multer = require("../middleware/multer-config");

//Middleware pour vérifier l'userID
const auth = require("../middleware/auth");

router.get("/", auth, stuffCtrl.getAllStuff);
router.post("/", auth, multer, stuffCtrl.createSauce);
router.get("/:id", auth, stuffCtrl.getOneSauce);
router.put("/:id", auth, multer, stuffCtrl.modifySauce);
router.delete("/:id", auth, stuffCtrl.deleteSauce);

module.exports = router;
