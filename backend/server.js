const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT || 8080;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
