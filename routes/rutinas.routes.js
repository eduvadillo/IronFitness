const router = require("express").Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const Exercise = require("../models/AllExercises.model");
const Ejercicio = require("../models/Ejercicios.model");
const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const FitnessAPI = new Api();


router.post("/rutina", (req, res) => {
  const {myRadio, myRadio3} = req.body;
  let aleatorio = Math.floor(Math.random() * 10) + 80;
  console.log('**************', myRadio, myRadio3) 
  
  if (myRadio === "Principiante" && myRadio3 === "1"){
FitnessAPI.getRandomExercise(aleatorio)
.then((exerciseComplete) => {
//res.send(exerciseComplete.data) })}
  res.render(`rutinas/rutinaPrueba`, { completeExercise: exerciseComplete.data, isLoggedIn: req.user
    })})}

else if (myRadio === "Principiante" && myRadio3 === "3"){
res.render(`rutinas/rutinaPrueba`)}

else if (myRadio === "Principiante" && myRadio3 === "5"){
res.render(`rutinas/rutinaPrueba`)}

 else { res.render(`rutinas/rutinaPrueba2`)}
  });


router.get("/rutina2", (req, res) => {
   Ejercicio.find()
   .then((exercise) => {res.send(exercise)

   })
});

/*
Book.findOne( {book_id} )
        .then((book) => {
          if (book) {
            const layout = req.user ? '/layouts/auth' : '/layouts/noAuth'
            res.status(202).render(`book-details`, { bookDetails: book , layout: layout});
          } else {
            Book.create({book_id,title,authors,pageCount,publishedDate,description,thumbnail,price,buyLink})
            .then((result) => {
              const layout = req.user ? '/layouts/auth' : '/layouts/noAuth'
              res.status(202).render(`book-details`, {bookDetails: result, layout: layout})
            });
          }
        })
        .catch((err) => {
          res.status(400).send(err)
        });
*/

   /*     
  FitnessAPI.getCompleteExercise().then((exerciseComplete) => {
    res.render(`fitness/exerciseCom`, {
      completeExercise: exerciseComplete.data.results,
      isLoggedIn: req.user,
    });
  });
});

*/

module.exports = router;
