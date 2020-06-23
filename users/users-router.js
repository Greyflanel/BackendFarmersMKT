const router = require("express").Router();
const restricted = require('../auth/restricted-middleware');
const Users = require("./users-model.js");



  
router.get("/admin", (req, res) => {
  
  Users.find()
    .then(users => {
      res.json(users)
    })
    .catch(error => {
      res.status(500)({ message: "Failed to get users", error: error });
    });
});

router.get("/admin/:id", (req, res) => {
  Users.find()
    .then(user => {
      return res.json(`User is: ${req.params.id}`)
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to get users!" })
    });
});

module.exports = router;