const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

const DB_HOST = process.env.DB_HOST;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(8080, () => {
      console.log("Server running. Use our API on port: 8080");
    });
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
