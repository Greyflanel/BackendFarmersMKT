const router = require("express").Router();
const restricted = require('../auth/restricted-middleware');
const Users = require("./users-model.js");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users)
    })
    .catch(error => {
      res.send(error)
      res.status(500).json({ message: "Failed to get users", error });
    });
});

module.exports = router;