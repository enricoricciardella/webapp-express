//importo il file della connessione al database chiamandolo connection
const connection = require("../db");

//definiamo le funzioni callback per gli endpoint(codice effettivo che viene eseguito in un URL specifico).
function Index(req, res) {
    const sql = `SELECT * FROM movies`;
    connection.query(sql, (err, movies) => {
        if (err) {
            return next(new Error(err.message));
        }

        return res.status(200).json({
            status: "success",
            data: movies,
        });
    });
};
//ENDPOINT SHOW
function show(req, res) {
    const urlId = req.params.id; 
    const sql = `SELECT * FROM movies WHERE id = ?`;
    connection.query(sql, [urlId], (err, movies) => {
        if (err) {
            return next(new Error(err.message));
        }

        return res.status(200).json({
            status: "success",
            data: movies,
        });
    });
};





module.exports = { Index, show };
