const router = require("express").Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const Ejercicio = require("../models/Ejercicios.model");
const Exercise = require("../models/AllExercises.model");
const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const FitnessAPI = new Api();



router.get("/crear-ejercicio", (req, res) => {
  
   User.findOne( { nivel: { $eq: "administrador" }} ) 

  .then((found) => {
    // If the user is found, send the message username is taken
    if (found) {
        console.log(`*******************`, found)
        res.render("administrador/crearEjercicio")
 }
 else {res.render("/")}
   
  })})


router.post("/crear-ejercicio", (req, res) => {
          const { name, description, category, muscles, equipment } = req.body;
            Exercise.create({name, description, category, muscles, equipment})
            .then(() => { res.render(`/index`) 
        })
            .catch((err) => {
          res.status(400).send(err)
        })
})




module.exports = router;