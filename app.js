//preso da documentazione express.com per far startare il server
const express = require('express')
const app = express()
const port = 3000

//importo il routers
const router = require("./routes/movieRoutes");
//aggiungo la rotta /movies all'URL
app.use("/movies", router);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
