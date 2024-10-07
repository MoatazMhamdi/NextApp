const mongoose = require("mongoose");

const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const DB_URL = `mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`;
console.log(DB_URL);

const mongoOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(DB_URL, mongoOpts, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log("\nConnected to the Database.");
  }
});
