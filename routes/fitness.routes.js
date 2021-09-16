const router = require("express").Router();

const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Ejercicio = require("../models/Ejercicios.model");
const Exercise = require("../models/AllExercises.model");
const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const FitnessAPI = new Api();

router.get("/muscles", (req, res) => {
  FitnessAPI.getAllMuscles().then((allMuscles) => {
    res.render(`fitness/mulist`, {
      muscles: allMuscles.data.results,
      isLoggedIn: req.user,
    });
  });
});

router.get("/exercise", (req, res) => {
  FitnessAPI.getAllExercise().then((allExercise) => {
    //res.send(allExercise.data);
    res.render(`fitness/exercise`, {
      exercise: allExercise.data,
      isLoggedIn: req.user,
    });
  });
});

router.get("/musclesexc", (req, res) => {
  FitnessAPI.getCompleteExercise().then((exerciseComplete) => {
    res.render(`fitness/exerciseCom`, {
      completeExercise: exerciseComplete.data.results,
      isLoggedIn: req.user,
    });
  });
});

router.get("/ejercicios", isLoggedIn, (req, res) => {
  FitnessAPI.getOneExercise().then((oneExercise) => {
    //res.send(oneExercise.data.results);
    FitnessAPI.getOneExerciseImage().then((image) => {
      res.render(`fitness/ejercicios`, {
        exercise: oneExercise.data.results,
        exerciseImage: image.data.results,
        isLoggedIn: req.user,
      });
    });
  });
});

router.get("/draw", (req, res) => {
  FitnessAPI.getDrawExercise().then((drawMuscles) => {
    res.render(`fitness/drawExer`, {
      draw: drawMuscles.data.results,
      isLoggedIn: req.user,
    });
  });
});

// CREAR Y COMPROBAR FAVORITO

router.get("/ejercicios/:id", (req, res) => {
  let id = req.params.id;
  FitnessAPI.getMuscleExercise(id)
    .then((ejerciciosMuscle) => {
      // res.send(ejerciciosMuscle.data)
      res.render(`fitness/ejerciciosMusculo`, {
        exercise: ejerciciosMuscle.data.results,
        isLoggedIn: req.user,
      });
    })
    .catch((error) => console.log(error));
});

router.get("/equip", (req, res) => {
  FitnessAPI.getEquipment().then((allEquip) => {
    res.render(`fitness/equip`, {
      equip: allEquip.data.results,
      isLoggedIn: req.user,
    });
  });
});

router.get("/equip/:id", (req, res) => {
  let id = req.params.id;
  FitnessAPI.getEquipmentExercise(id)
    .then((ejerciciosEquip) => {
      // res.send(ejerciciosMuscle.data)
      res.render(`fitness/equipExer`, {
        exercise: ejerciciosEquip.data.results,
        isLoggedIn: req.user,
      });
    })
    .catch((error) => console.log(error));
});

router.get("/allexcercise", (req, res) => {
  FitnessAPI.getAllCompleteExercise()
    .then((ejerciciosEquip) => {
      res.send(ejerciciosEquip.data);
      //res.render(`fitness/equipExer`,  { exercise: ejerciciosEquip.data.results, isLoggedIn:req.user });
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
      //comprobar si ese apiId ya esta en db characters
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
            res.redirect("/equip");
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
}); /*
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
  });
});*/

module.exports = router;
