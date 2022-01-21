const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const passport = require("passport");
const jwt = require("jwt-simple");

const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;


mongoose.connect("mongodb://localhost/agile", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false,}));
app.use(passport.initialize());

const requireSignin = passport.authenticate("login", { session: false });
const requireAuth = passport.authenticate("jwt", { session: false });

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "Dr. Strange",
};

const tokenForUser = function (user) {
  return jwt.encode(
    {
      sub: user.myID,
      iat: Math.round(Date.now() / 1000),
      exp: Math.round(Date.now() / 1000 + 5 * 60 * 60),
    },
    "Dr. Strange"
  );
};

passport.use(
  "jwt",
  new JwtStrategy(jwtOptions, function (payload, done) {
    return done(null, { myUser: "user", myID: payload.sub });
  })
);

passport.use(
  "login",
  new LocalStrategy(function (username, password, done) {
    const authenticated = username === "Stephen" && password === "Strange";

    if (authenticated) {
      return done(null, { myUser: "user", myID: 1234 });
    } else {
      return done(null, false);
    }
  })
);

app.post("/login", requireSignin, function (req, res, next) {
  res.send({
    token: tokenForUser(req.user),
  });
});

app.get("/login", function (req, res) {
  // This route serves the HTML to the browser
  res.sendFile(__dirname + "/login.html");
});

app.get("/protected", requireAuth, function (req, res) {
  res.send("Access Granted!");
});

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

app.use(mainRoutes);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});