const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
const cors = require("cors");
// require Routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const billing = require("./routes/api/billing");
const ont = require("./routes/api/ont");
const alarms = require("./routes/api/alarms");

// initialize express app
const app = express();

// apply middlewares
app.use(passport.initialize());
// apply morgan logger middleware
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db connections
const { billingDbConn, ftthCliDbConn } = require("./config/dbConnection");
// passport config
require("./config/passport")(passport);

/**
 * mongoose
  .connect(db)
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));
 * 
billingDbConn.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to ftthmonitor_billing MySQL!");
}); */

//use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/billing", billing);
app.use("/api/ont", ont);
app.use("/api/alarms", alarms);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
