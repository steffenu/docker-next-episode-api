const client = require("./mariadb"); // connecting to database
const handler = require("./api/handler");

const url_local = "http://localhost/";

const routes = require("express").Router();
// FIXME https://stackoverflow.com/a/32064391
// https://stackoverflow.com/questions/32650604/close-connection-mysql-node-js/32650853
// ???? leave connection open ... or open close ... or use pool ?
// already fixed by using pool ;) which handles open and closing
// so you dont have to write that stuff yourself

// Index Route
routes.get("/", (req, res) => {
  res.send("WORKING");
});

// dont confuse res with result (alternatitvely name result something else ;))
//ALL SERIES ENTRIES FROM DATABASE
routes.get("/all", async (req, res) => {
  let response = await handler.allSeries();
  res.json(response);
});

routes.get("/add/:title", async (req, res) => {
  let response = await handler.addByTitle(req.params.title); // all data from show
  res.redirect(url_local + "all");
});

// REMOVE SERIES
routes.get("/remove/:id", async (req, res) => {
  let response = await client.query(
    `DELETE FROM users WHERE id= '${req.params.id}'`
  );
  res.redirect(url_local + "all");
});

//SHOWS THAT AIR TODAY
// 1. queries db
// 2. do request for each series and put into array if there is episode ( promise all)
routes.get("/today", async (req, res) => {
  let titles = await handler.queryDb();
  let seriesArray = await handler.today(titles);
  console.log("seriesArray:", seriesArray);
  res.json({ today: seriesArray });
});

routes.get("/tomorrow", async (req, res) => {
  let titles = await handler.queryDb();
  let seriesArray = await handler.tommorrow(titles);
  console.log("seriesArray:", seriesArray);
  res.json({ tommorrow: seriesArray });
});

module.exports = routes;
