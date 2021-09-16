// service/index.js
const axios = require("axios");

class FitnessApi {
  constructor() {
    this.api = axios.create({
      baseURL: "https://wger.de/api/v2",
      headers: { Authorization: "0ffdf9c0fe15fd7b1dc42095f522fe4c3f1b819d" },
    });
  }

  getAllMuscles = () => this.api.get("/muscle/");
  getAllExercise = () => this.api.get("https://wger.de/api/v2/exerciseinfo/74");
  getExerciseImage = () => this.api.get("/exerciseimage/?exercise_base=167");
  getCompleteExercise = () => this.api.get("/exerciseinfo/?language=2");

  getOneExercise = () =>
    this.api.get(
      "/exercise/?muscles=1&equipment=3&exercise_base=92&language=2"
    );
  getOneExerciseImage = () => this.api.get("/exerciseimage/?exercise_base=92");

  getMuscleExercise = (id) =>
    this.api.get(`/exercise/?muscles=${id}&language=2`);
  getEquipment = () => this.api.get(`/equipment`);

  getEquipmentExercise = (id) =>
    this.api.get(`/exercise/?equipment=${id}&language=2`);

  getAllCompleteExercise = () => this.api.get(`/exerciseinfo`);

  getRandomExercise = (aleatorio) => this.api.get(`/exerciseinfo/${aleatorio}`);

  //prueba pintar
  getDrawExercise = () => this.api.get(`/muscle`);
}

module.exports = FitnessApi;
