const Router = require('express').Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import keys from '../../config/keys';

import validateRegistrationInput from '../../validation/registration';
import validateLoginInput from '../../validation/login';

import User from '../../models/User';

Router.post('/registration', function (req, res) {
    const {
        errors,
        isValid
    } = validateRegistrationInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: "",
        dateCreated: Date.now(),
        lastSeen: Date.now()
    });

    bcrypt.genSalt(12, function (bcryptErr, salt) {
        if (bcryptErr) console.log("Error in bcrypt: " + bcryptErr);
        bcrypt.hash(req.body.password1, salt, function (hashErr, hash) {
            if (hashErr) console.log("Error in bcrypt.hash(): " + hashErr);
            newUser.password = hash;
            newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
        });
    });
});

Router.post('/login', (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const {
        email,
        password
    } = req.body;

    User.findOne({
        email
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                error: "password or username incorrect"
            });
        }

        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: user.id,
                        username: user.username
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
                        error: "password or username incorrect"
                    });
                }
            });
    });
});

export default Router;