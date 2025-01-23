//importiamo express e i controllers
const express = require("express")
const router = express.Router();
const controller = require("../controllers/movieController");
//definiamo gli endpoint Index e show.
router.get("/", controller.Index);
// aggiungo /:id perchè questo parametro viene salvato in una variabile chiamata id, per poi venire utilizzato nella chiamata al database
router.get("/:id", controller.show);
//esportiamo il router
module.exports = router;

