const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const emailRoutes = require('./routes/emailRoutes');
require("dotenv").config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
const apiRoutes = require("./routes/api");

app.use("/api", apiRoutes);
app.use('/email', emailRoutes);

// Manejo de errores genérico
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
