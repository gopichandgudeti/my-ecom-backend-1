const express = require("express");
const cors = require("cors")
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "goodreads.db");

app.use(express.json())
app.use(cors());

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();


app.get('/products/', async (request, response) => {
  const getProductsQuery = `
    SELECT
      *
    FROM
      products;`
  const products = await database.all(getProductsQuery) 
  response.send(products)
});


module.exports = app;