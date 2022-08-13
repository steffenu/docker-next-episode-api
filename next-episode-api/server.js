const express = require("express");
var cors = require("cors");
const app = express();

const routes = require("./routes");

// Basic Server Boilplate

var PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
