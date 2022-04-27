const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const keys = require('./config/keys');
const app = express();

// DB Setup
mongoose.connect(keys.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, function(err, result) {
  if (err) console.log(err)
  console.log(keys.MONGODB_URI)
});

const PORT = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


const mainRoutes = require("./routes/main");
var authRouter = require('./routes/auth');


app.use(mainRoutes);
app.use('/', authRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});