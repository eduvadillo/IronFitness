const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Ejercicio = require("../models/Ejercicios.model");

/* GET home page */
router.get("/", (req, res, next) => {
  /*User.findById(req.user._id)
  .then((user) => { */
        res.render("index", { isLoggedIn: req.session.user });  
  })
/* }); */

router.get("/profile", isLoggedIn, (req, res, next) => {
  User.findById(req.user._id)
  .then((user) => { 
          console.log(user)
        res.render("profile", { user, isLoggedIn: req.session.user });  
  })
})

//  ejercicios favoritos

router.get("/myfavorites", isLoggedIn, (req, res, next) => {
  User.findById(req.user._id)
  .populate("favorites")
  .then((user) => {
        res.render("favorites", { user: user, isLoggedIn: req.session.user });
  // res.send(user)
  });
});

module.exports = router;
