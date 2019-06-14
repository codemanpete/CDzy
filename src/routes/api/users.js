const Router = require('express').Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import keys from '../../config/keys';

import validateRegistrationInput from '../../validation/registration';
import validateLoginInput from '../../validation/login';

import User from '../../models/User';

Router.post('/:userid/claim', function (req, res) {
    User.findById(req.params.userid, function (err, foundUser) {

        if (!foundUser) {
            res.status(404).json({
                error: err
            });
        }

        let {
            amount,
            lastClaim
        } = foundUser.balance;
        const hoursToClaim = 1;
        const claimAmount = 15.0;
        let msToClaim = hoursToClaim * 60 * 60 * 1000;
        if (Date.now() - lastClaim < msToClaim) {
            res.status(400).json({
                error: {
                    claim: "Too early to claim"
                }
            });
        }

        foundUser.balance.amount = parseFloat(amount) + claimAmount;
        foundUser.balance.lastClaim = Date.now();
        foundUser.save()
            .then(function (user) {
                res.status(200).json({
                    user
                });
            });
    });
});

Router.post('/registration', function (req, res) {
    const {
        error,
        isValid
    } = validateRegistrationInput(req.body);

    if (!isValid) {
        return res.status(400).json({
            error
        });
    }

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: "",
        dateCreated: Date.now(),
        lastSeen: Date.now()
    });

    User.findOne({
            email: newUser.email
        })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    error: {
                        email: "email already in use."
                    }
                });
            }
        });

    User.findOne({
            username: newUser.username
        })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    error: {
                        username: "username already in use."
                    }
                });
            }
        });

    bcrypt.genSalt(12, function (bcryptErr, salt) {
        if (bcryptErr) console.log("Error in bcrypt: " + bcryptErr);
        bcrypt.hash(req.body.password1, salt, function (hashErr, hash) {
            if (hashErr) console.log("Error in bcrypt.hash(): " + hashErr);
            newUser.password = hash;
            newUser.save()
                .then(user => res.json(user))
                .catch(err => {
                    res.send(400).json(error);
                });
        });
    });
});

Router.post('/login', (req, res) => {
    const {
        error,
        isValid
    } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json({
            error
        });
    }

    const {
        email,
        password
    } = req.body;

    User.findOne({
            $or: [{
                email
            }, {
                username: email
            }]
        })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    error: {
                        password: "password or username incorrect"
                    }
                });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            lastSeen: user.lastSeen,
                            balance: {
                                amount: user.balance.amount.toString(),
                                lastClaim: user.balance.lastClaim
                            }
                        };

                        jwt.sign(
                            payload,
                            keys.secretOrKey, {
                                expiresIn: 300000
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    } else {
                        return res.status(400).json({
                            error: {
                                password: "password or username incorrect"
                            }
                        });
                    }
                });
        });
});

export default Router;