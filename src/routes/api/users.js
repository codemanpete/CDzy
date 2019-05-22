import express, {
    Router
} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// something about keys?

import validateRegistrationInput from '../../validation/registration';
import validateLoginInput from '../../validation/login';

import User from '../../modesl/User';

Router.post('/registration', function (req, res) {
    const {
        errors,
        isValid
    } = validateRegistrationInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newUser = newUser({
        username: req.body.username,
        email: req.body.email,
        password: "",
        dateCreated: Date.now,
        lastSeen: Date.now
    });

    bcrypt.genSalt(12, function (bcryptErr, salt) {
        if (bcryptErr) console.log("Error in bcrypt: " + bcryptErr);
        bcrypt.hash(req.body.password, salt, function (hashErr, hash) {
            if (hashErr) console.log("Error in bcrypt.hash(): " + hashErr);
            newUser.password = hash;
            newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
        });
    });
});