module.exports = (app) => {

app.use("/auth", require('./auth'))
app.use("/", require('./fitness.routes'))
app.use("/", require('./base.routes.js'))
app.use("/", require('./rutinas.routes.js'))
app.use("/", require('./admin.routes.js'))


}  


// const router = require("express").Router();

// /* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

// module.exports = router;



 



