//importiamo express e i controllers
const express = require("express")
const router = express.Router();
const controller = require("../controllers/movieController");
//definiamo gli endpoint Index e show.
router.get("/", controller.Index);
// aggiungo /:id perchè questo parametro viene salvato in una variabile chiamata id, per poi venire utilizzato nella chiamata al database
router.get("/:slug", controller.show);
//esportiamo il router

//endpoint salva review di un film
router.post("/:movieSlug/reviews", controller.reviewStore);

//endpoint mostro tutte le reviews
router.get("/:movieSlug/reviews", controller.indexReview);
module.exports = router;

