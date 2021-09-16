require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);

require("./routes/index")(app);

// const index = require("./routes/index");
// app.use("/", index);

// const authRoutes = require("./routes/auth");
// app.use("/auth", authRoutes);

// const charRoutes = require("./routes/characters.routes");
// app.use("/", charRoutes);

require("./error-handling")(app);

module.exports = app;
