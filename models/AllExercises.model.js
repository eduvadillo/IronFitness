const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const AllExercisesSchema = new Schema(
  {
    id: String,
    name: String,
    exercise_base: String,
    description: String,
    ejercicioId: String,
    exercise_base: String,
    category: { type: Object },
    muscles: [{}],
    muscles_secondary: [{}],
    equipment: [{}],
    language: { type: Object },
    images: [{}],
    comments: [{}],
  },
  {
    timestamps: true,
  }
);

module.exports = model("allExercise", AllExercisesSchema);
