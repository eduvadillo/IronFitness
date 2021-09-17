const router = require("express").Router();

const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Ejercicio = require("../models/Ejercicios.model");
const Exercise = require("../models/AllExercises.model");
const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const FitnessAPI = new Api();

router.get("/elegir-categoria", (req, res) => {

        res.render(`fitness/indexEjercicios`,  { isLoggedIn: req.session.user })
})


router.get("/exercise", (req, res) => {
  FitnessAPI.getAllExercise().then((allExercise) => {
    //res.send(allExercise.data);
    res.render(`fitness/exercise`, {
      exercise: allExercise.data,
      isLoggedIn: req.user,
    });
  });
});



router.get("/draw", (req, res) => {
  FitnessAPI.getDrawExercise().then((drawMuscles) => {
    res.render(`fitness/drawExer`, {
      draw: drawMuscles.data.results,
        isLoggedIn: req.session.user 
    });
  });
});

// CREAR Y COMPROBAR FAVORITO

router.get("/ejercicios/:id", isLoggedIn, (req, res) => {
  let id = req.params.id;
  FitnessAPI.getMuscleExercise(id)
    .then((ejerciciosMuscle) => {
      // res.send(ejerciciosMuscle.data)
      res.render(`fitness/ejerciciosMusculo`, {
        exercise: ejerciciosMuscle.data.results,
         isLoggedIn: req.session.user
      });
    })
    .catch((error) => console.log(error));
});


router.get("/equipment", (req, res) => {
Exercise.find()
  FitnessAPI.getEquipment().then((allEquip) => {
    res.render(`fitness/equipment`, {
      equip: allEquip.data.results,
      isLoggedIn: req.session.user
    });
  });
});

router.post("/equipment", isLoggedIn, (req, res) => {
    const  {Barbell, Bench, id3, id4, id9, Kettlebell, id7, id6, id5, id2 } = req.body

    const cleanString = (text) => {const regex = /(<([^>]+)>)/ig
  return text.replace(regex, "")
    }

    if (Barbell) {
  Exercise.find({ $and:[{ "equipment.name" : "Barbell"}, {"language.id" : 2 }]})
  .then((exercise) => { 
          console.log(exercise)
          exercise.forEach((exercise) => {
                exercise.description = cleanString(exercise.description)
          })
         
   res.render(`fitness/equipExercise/gymMat`, {exercise, isLoggedIn: req.session.user}  )
  })
}     else if (Bench) {
  Exercise.find({ $and:[{ "equipment.name" : "Bench"}, {"language.id" : 2 }]})
  .then((exercise) => { 
          res.render(`fitness/equipExercise/gymMat`, {exercise, isLoggedIn: req.session.user} )
  })
}    else if (id3) {
  Exercise.find({ $and:[{ "equipment.id" : 3}, {"language.id" : 2 }]})
  .then((exercise) => { 
          res.render(`fitness/equipExercise/gymMat`, {exercise, isLoggedIn: req.session.user} )
  })
}
 else if (id4) {
  Exercise.find({ $and:[{ "equipment.id" : 4}, {"language.id" : 2 }]})
  .then((exercise) => { 
          res.render(`fitness/equipExercise/gymMat`, {exercise, isLoggedIn: req.session.user} )
  })
}
 else if (id9) {
  Exercise.find({ $and:[{ "equipment.id" : 9}, {"language.id" : 2 }]})
  .then((exercise) => { 
          res.render(`fitness/equipExercise/gymMat`, {exercise, isLoggedIn: req.session.user} )
  })
}
 else if (Kettlebell) {
  Exercise.find({ $and:[{ "equipment.name" : "Kettlebell"}, {"language.id" : 2 }]})
  .then((exercise) => { 
          res.render(`fitness/equipExercise/gymMat`, {exercise, isLoggedIn: req.session.user} )
  })
}  else if (id7) {
  Exercise.find({ $and:[{ "equipment.id" : 7}, {"language.id" : 2 }]})
  .then((exercise) => { 
          res.render(`fitness/equipExercise/gymMat`, {exercise, isLoggedIn: req.session.user} )
  })
}  else if (id6) {
  Exercise.find({ $and:[{ "equipment.id" : 6}, {"language.id" : 2 }]})
  .then((exercise) => { 
          res.render(`fitness/equipExercise/gymMat`, {exercise, isLoggedIn: req.session.user} )
  })
}  else if (id5) {
  Exercise.find({ $and:[{ "equipment.id" : 5}, {"language.id" : 2 }]})
  .then((exercise) => { 
          res.render(`fitness/equipExercise/gymMat`, {exercise, isLoggedIn: req.session.user} )
  })
}   else if (id2) {
  Exercise.find({ $and:[{ "equipment.id" : 2}, {"language.id" : 2 }]})
  .then((exercise) => { 
          res.render(`fitness/equipExercise/gymMat`, {exercise, isLoggedIn: req.session.user} )
  })
}
})




router.get("/allexcercise" , isLoggedIn, (req, res) => {
  FitnessAPI.getAllCompleteExercise()
    .then((ejerciciosEquip) => {
     // res.send(ejerciciosEquip.data);
      res.render(`fitness/exercise`,  { exercise: ejerciciosEquip.data.results, isLoggedIn:req.user.session});
    })
    .catch((error) => console.log(error));
});

//crear favoritos en base de datos

router.post("/add-favorite/:id", isLoggedIn, (req, res) => {
  const { exercise_base, description, name, ejercicioId } = req.body;
  const { id } = req.params;
  console.log(`************`, req.body);
  const idToCheck = req.body.ejercicioId;

  Ejercicio.find({ ejercicioId: idToCheck })
    .then((charArray) => {
      //comprobar si ese apiId ya esta en db ejercicio
      if (charArray.length === 0) {
        Ejercicio.create({
          exercise_base,
          description,
          name,
          ejercicioId,
        }).then((result) => {
          User.findByIdAndUpdate(req.user._id, {
            $push: { favorites: result._id },
          }).then(() => {
            res.redirect("/equipment");
          });
        });
      } else {
        User.findById(req.user._id)
          .then((user) => {
            if (!user.favorites.includes(charArray[0]._id)) {
              User.findByIdAndUpdate(req.user._id, {
                $push: { favorites: charArray[0]._id },
              }).then(() => {
                res.redirect("/equip");
              });
            } else {
              res.redirect("/equip");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })

    .catch((err) => console.log(err));
}); 


router.post("/busqueda-avanzada", isLoggedIn, async (req, res) => {
  const {category, muscles, equipment} = req.body;
  console.log('**************', category, muscles, equipment) 
  
          try {
                const exercise1 = await Exercise.find({ $and:[{ "category.name" : category }, { "muscles.name" : muscles },  { "equipment.name" : equipment } , {"language.id" : 2 }]}).limit( 2 )
                if (exercise1) {
                res.render(`fitness/busquedaAvanzada`, { exercise: exercise1, isLoggedIn:req.user.session})
               
                }
                } 
                
        catch (error) { 
                (error) 
        }

        }     ) 


// favoritos ejercicios equipment


router.post("/equipment/:id", isLoggedIn, (req, res) => {

          const { name, description, category, muscles, equipment, comments } = req.body;

        const query = {
        name: name,
        description: description,
        category: { name: category },
        muscles: [{name: muscles}],
        equipment: [{name: equipment}],
        comments: [{name: comments}],
        }        

  const { id } = req.params;
  console.log(`************`, query);
  const idToCheck = req.body.ejercicioId;

  Ejercicio.find({ ejercicioId: idToCheck })
    .then((charArray) => {
      //comprobar si ese apiId ya esta en db ejercicio
      if (charArray.length === 0) {
        Ejercicio.create({query})
        .then((result) => {
          User.findByIdAndUpdate(req.user._id, {
            $push: { favorites: result._id },
          }).then(() => {
            res.redirect("/equipment");
          });
        });
      } 
})
})


module.exports = router;
