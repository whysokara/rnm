const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/demo");
//   console.log("db connected");

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

const monngodb_url =
  "mongodb+srv://rnpkara:kararnp@rnpcluster.u1aekju.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(monngodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((error) => {
    console.log("mondb not connected");
    console.log(error);
  });

// Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Model
const User = mongoose.model("User", userSchema);

server.use(cors()); // link between client and server
server.use(bodyParser.json()); //read body text

// CRUD - POST
server.post("/demo", async (req, res) => {
  let user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  const doc = await user.save();

  console.log(doc);
  res.json(doc);
});

// GET
server.get("/demo", async (req, res) => {
  const docs = await User.find({});
  res.json(docs);
});

server.listen(8080, () => {
  console.log(`Server Started!`);
});
