const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Ejercicio = require("../models/Ejercicios.model");

/* GET home page */
router.get("/", isLoggedIn, (req, res, next) => {
  User.findById(req.user._id)
  .then((user) => {
        res.render("index", { user: user, isLoggedIn: req.user });  
  })
});

router.get("/a", isLoggedIn, (req, res, next) => {
  User.findById(req.user._id)
  .then((user) => {
        res.render("index2", { user: user, isLoggedIn: req.user });  
  })
});

//  ejercicios favoritos

router.get("/myfavorites", isLoggedIn, (req, res, next) => {
  User.findById(req.user._id)
  .populate("favorites")
  .then((user) => {
        res.render("favorites", { user: user });
  // res.send(user)
  });
});

module.exports = router;
