const express = require("express");
const _router = express.Router();
const con = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

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

_router.post("/signin", (req, res) => {
    // console.log(req.body.role);
    if (req.body.role === "user") {
        con.query("SELECT * FROM users WHERE email = ?", [req.body.email], (error, rows) => {
            if (!error) {
                if (rows.length > 0) {
                    let user = rows[0];
                    // Match password
                    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                        if(err) throw err;
    
                        if(isMatch) {
                            let token = jwt.sign(
                                {
                                    user: user.email,
                                    role: "user"
                                },
                                "claims-app-secret", { expiresIn: "2h" }
                            );
                            res.send({ isLoggedIn: true, token: token });
                        } else
                            res.send({ isLoggedIn: false, msg: "Incorrect password" });
                    });
                } else
                    res.send({ isLoggedIn: false, msg: "User does not exists" });
            } else
                res.send({ error: err });
        });
    } else {
        con.query("SELECT * FROM admins WHERE email = ?", [req.body.email], (error, rows) => {
            if (!error) {
                if (rows.length > 0) {
                    // Match password
                    if (rows[0].password === req.body.password) {
                        let token = jwt.sign(
                            {
                                user: rows[0].email,
                                role: "admin"
                            },
                            "claims-app-secret", { expiresIn: "2h" }
                        );
                        res.send({ isLoggedIn: true, token: token });
                    } else
                        res.send({ isLoggedIn: false, msg: "Incorrect password" });
                } else
                    res.send({ isLoggedIn: false, msg: "User does not exists" });
            } else
                res.send({ error: err });
        });
    }
});

module.exports = _router;