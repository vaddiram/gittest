const express = require("express");
const _router = express.Router();
const con = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

_router.post("/register", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    con.query("SELECT * FROM users where email = ?", [email], (err, rows) => {
        if (!err)
            if(rows.length > 0) {
                // User exists
                res.send({
                    isRegistered: false,
                    msg: "User with the given email already exists"
                });
            } else {
                // User does not exists
                // Hash Password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(password, salt, (err, hashPass) => {
                        // If there is an error while hasing the password
                        if(err) throw err;

                        // Else insert the new user into the database
                        con.query("INSERT INTO users (email, password) VALUES(?, ?)", [email, hashPass], (error, user) => {
                            if (!error) {
                                res.send({
                                    isRegistered: true,
                                    msg: "You are now registered and can login"
                                });
                            }
                            else {
                                res.send({ error: error });
                            }
                        });
                    })
                );
            }
        else
            res.send({ error: err });
    });
});

module.exports = _router;