const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);

    user.password = hash;

    Users.add(user)
        .then(user => {
            const token = signToken(user);
            res.status(201).json({ message: `Successfully registered!`, token });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = signToken(user)
                res.status(200).json({ token, message: `Welcome ${user.username}!`, });
            } else {
                res.status(401).json({ message: "Invalid Credentials 💀" });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

const signToken = (user) => {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role
    };
    const secret = process.env.JWT_SECRET || 'Greyflanel';
    const options = {
        expiresIn: '4h',
    };
    
    return jwt.sign(payload, secret, options);
}

module.exports = router;