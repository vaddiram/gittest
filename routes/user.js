const express = require("express");
const _router = express.Router();
const con = require("../db");

_router.get("/", (req, res) => {
    res.send("Welcome to User Routes.");
});

_router.post("/register", (req, res) => {
    
});

module.exports = _router;