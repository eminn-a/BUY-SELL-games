const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { PORT, DB_URL } = require("./src/config/config");
const router = require("./src/router");
const path = require("path");
const { auth } = require("./src/middlewares/authMiddleware");

const app = express();

//mongoose config(change db_url-name)
mongoose
  .connect(DB_URL)
  .then(console.log("DB Connected successfully"))
  .catch((err) => console.log("Connection failed", err.message));

//handlebars config
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "src/views");

//express config
app.use(express.static(path.resolve(__dirname, "./src/public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(router);

app.listen(PORT, () => console.log(`Server is on port:${PORT}`));
