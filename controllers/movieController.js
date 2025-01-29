//importo il file della connessione al database chiamandolo connection
const connection = require("../db");

//definiamo le funzioni callback per gli endpoint(codice effettivo che viene eseguito in un URL specifico).
function Index(req, res) {
    const sql = `SELECT * FROM movies`;
    connection.query(sql, (err, movies) => {
        if (err) {
            return next(new Error(err.message));
        }

        return res.status(200).json(
            movies
        );
    });
};
//ENDPOINT SHOW
function show(req, res) {
    const urlSlug = req.params.slug;
    const sql = `SELECT
    movies.*,
        IFNULL(AVG(reviews.vote), 0) AS average_vote
    FROM
    movies
      LEFT JOIN 
        reviews ON movies.id = reviews.movie_id
    WHERE
    movies.slug = ?
        GROUP BY
    movies.id;`;
    connection.query(sql, [urlSlug], (err, movies) => {
        if (err) {
            return next(new Error(err.message));
        }
        const obj = movies[0];
        return res.status(200).json(obj);
    });
};

const indexReview = async (req, res, next) => {
        //prendo id movie dal parametro url
        const movieSlug = req.params.movieSlug;
        const sql = `SELECT reviews.* FROM reviews JOIN movies ON reviews.movie_id = movies.id WHERE movies.slug = ?;`
        connection.query(sql, [movieSlug], (err, reviews) => {
            if (err) {
                return next(new Error(err.message));
            }
            return res.status(200).json(reviews);
        });
}

const reviewStore = async (req, res) => {
    const movieSlug = req.params.movieSlug;
    const {name, vote, text} = req.body;
    // Validazione voto
  if (isNaN(vote)  || vote < 0 || vote > 5) {
    return res.status(400).json({
      status: "fail",
      message: "Il voto deve essere valore numerico compreso tra 0 e 5",
    });
  }
  // Validazione nome
  if (name.length <= 3) {
    return res.status(400).json({
      status: "fail",
      message: "Il nome deve essere piu lungo di 3 caratteri",
    });
  }
  // Validazione testo
  if (text && text.length > 0 && text.length < 5) {
    return res.status(400).json({
      status: "fail",
      message: "Il testo deve essere lungo almeno 6 caratteri",
    });
  }
  const sql_Book =` 
        SELECT id
        FROM movies
        WHERE slug = ?
      `;
      connection.query(sql_Book, [movieSlug], (err, result) => {
        if (err) {
            return next(new Error(err.message));
        }
        const movieId = result[0].id;
        const sqlReview = `INSERT INTO reviews(movie_id, name, vote, text)
        VALUES (?, ?, ?, ?);`
        connection.query(sql, [movieId], (err, reviews) => {
            if (err) {
                return next(new Error(err.message));
            }
            return res.status(200).json(reviews);
        });
        
    });
}
module.exports = { Index, show, indexReview, reviewStore };
