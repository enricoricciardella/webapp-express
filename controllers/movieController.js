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

function show(req, res) {
    
};





module.exports = {Index, show};
