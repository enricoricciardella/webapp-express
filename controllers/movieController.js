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





module.exports = { Index, show };
