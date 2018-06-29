const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const createToken = (user) => {
    return jwt.sign({ username: user.username }, process.env.JWT_SECRET, {expiresIn: 60*60*24})
}

router.post('/create', (req, res) => {
    User.create({
        username: req.body.username,
        passwordhash: bcrypt.hashSync(req.body.passwordhash, 10)
    }).then(user => res.status(200).json({user, token: createToken(user)}))
        .catch(err => res.status(500).json(err))
})

router.post('/login', (req, res) => {
    User
        .findOne({ where: { username: req.body.username } })
        .then((user) => {
            if (user) {
                bcrypt.compare(req.body.passwordhash, user.passwordhash, (err, matches) => {
                    if (matches) { res.status(200).json({user, token: createToken(user)}) }
                    
                    else { res.status(401).json({ error: 'not Auth' }) }
                })
            } else {
                res.status(500).json({ error: 'not Auth' })
            }
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router;