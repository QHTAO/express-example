const express = require("express");
const cors = require("cors");
const path = require("path");
const database = require("./config/database");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();

const app = express();
app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./routes"));

(async () => {
  await database.connect();
  // seeding data
  const username = "test";
  const password = "123456";
  const User = require("./models/user");
  var user = await User.findOne({ username });
  if (user == null) {
    var user = new User({ username, password });
    await user.save();
  }
  
  app.listen(process.env.PORT);
})();
