const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

module.exports = (req, res, next) => {
    const { username, password } = req.body;

    if (username && password) {
        Users.findBy({ username })
            .first()
            .then(user => {
                if (user.role === 'admin' && user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({ message: 'Access Denied! Invalid Credentials' });
                }
            })
            .catch(error => {
                res.status(500).json({ message: 'Ran into an unexpected error' });
            });
    } else {
        res.status(400).json({ message: 'No credentials provided' })
    }
};