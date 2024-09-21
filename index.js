const express = require('express')
const cors = require('cors');
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const databasePath = path.join(__dirname, 'ecom.db')

const app = express()

app.use(cors());
app.use(express.json())

let database = null

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })

    const port = process.env.PORT || 3000
    app.listen(port, () =>
      console.log(`Server Running at http://localhost:${port}/`),
    )
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()

app.get('/products/', async (request, response) => {
  const getProductsQuery = `
    SELECT
      *
    FROM
      products;`
  const products = await database.all(getProductsQuery) 
  response.json(products)
});


module.exports = app;