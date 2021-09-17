const router = require("express").Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const Exercise = require("../models/AllExercises.model");
const Ejercicio = require("../models/Ejercicios.model");
const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const FitnessAPI = new Api();


router.get("/elegir-rutina", (req, res) => {

        res.render(`rutinas/indexRutina`)
})



router.post("/rutina", async (req, res) => {
  const {myRadio, myRadio3} = req.body;
  let aleatorio = Math.floor(Math.random() * 10) + 80;
  console.log('**************', myRadio, myRadio3) 
  
  if (myRadio === "Principiante" && myRadio3 === "1"){
        /*  const exercise1 = Exercise.find({ $and:[{ "category.id" : 8 }, {"language.id" : 2 }]}).limit( 4 )
          const exercise2 =  Exercise.find({ $and:[{ "category.id" : 9 }, {"language.id" : 2 }]}).limit( 2 )
        */

          try {
                const exercise1 = await Exercise.find({ $and:[{ "category.id" : 8 }, {"language.id" : 2 }]}).limit( 1 )
                const exercise2 =  await Exercise.find({ $and:[{ "category.id" : 9 }, {"language.id" : 2 }]}).limit( 1 )
                const exercise3 =  await Exercise.find({ $and:[{ "category.id" : 10 }, {"language.id" : 2 }]}).limit( 1 )
                const exercise4 =  await Exercise.find({ $and:[{ "category.id" : 11 }, {"language.id" : 2 }]}).limit( 1 )
                const exercise5 =  await Exercise.find({ $and:[{ "category.id" : 12 }, {"language.id" : 2 }]}).limit( 1 )
                const exercise6 =  await Exercise.find({ $and:[{ "category.id" : 13 }, {"language.id" : 2 }]}).limit( 1 )
                const exercise7 =  await Exercise.find({ $and:[{ "category.id" : 14 }, {"language.id" : 2 }]}).limit( 1 )
                console.log(exercise1)
                if (exercise1 && exercise2 && exercise3 && exercise4 && exercise5 && exercise6 && exercise7) {
                res.render(`rutinas/rutinaPrueba`, { exercise: exercise1, exercise2: exercise2,  exercise3: exercise3, exercise4: exercise4, exercise5: exercise5, exercise6: exercise6, exercise7:exercise7, isLoggedIn: req.user})
               
                }
                } 
                
        catch (error) { 
                next(error) 
        }

        }      



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
