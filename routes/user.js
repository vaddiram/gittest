const express = require("express");
const _router = express.Router();
const con = require("../db");

_router.post("", (req, res) => {
    console.log(req.body);
    res.send({ user: req.body.user });
});

_router.post("/addClaim", (req, res) => {
    console.log(req.body);
    res.send({ details: req.body });
});

module.exports = _router;