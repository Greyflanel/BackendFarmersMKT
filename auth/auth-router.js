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
    let { email, password } = req.body;

    Users.findBy({ email })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = signToken(user)
                res.status(200).json({ email: user.email, role: user.role, token, message: `Welcome ${user.email}!`, });
            } else {
                res.status(401).json({ message: "Invalid Credentials", error: {error} });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

const signToken = (user) => {
    const payload = {
        subject: user.id,
        email: user.email,
        role: user.role
    };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '4h',
        
    };
    
    return jwt.sign(payload, secret, options);
}

// router.get("/", (req, res) => {
//     res.status(500).send("IS NOT WORKING!")
// })



// router.get("/", (req, res) => {
//   const token = signToken(req.body);
//   res.cookie("token", token, { httpOnly: true, secure: true, sameSite: true });
//   console.log("REQ:", req.cookies)
//   res.json({ token });
// });

module.exports = router;