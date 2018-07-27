const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();
//db config
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello"));

//use Routes
app.use("/routes/api/users", users);
app.use("/routes/api/profile", profile);
app.use("/routes/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
