//preso da documentazione express.com per far startare il server
const express = require('express')
const app = express()
const port = 3000

const cors = require("cors");
require("dotenv").config();
// Rendo disponibile chiamata a server tramite cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.static("public"));
app.use(express.json());
//importo il routers
const router = require("./routes/movieRoutes");
//aggiungo la rotta /movies all'URL
app.use("/movies", router);

// Middleware per rotte inesistenti
app.use((req, res, next) => {
  res.status(404).send("Pagina non trovata... RIP");
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
