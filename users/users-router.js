const router = require("express").Router();
const restricted = require('../auth/restricted-middleware');
const Users = require("./users-model.js");



  
router.get("/admin", (req, res) => {
  
  Users.find()
    .then(users => {
      res.json(users)
    })
    .catch(error => {
      res.status(500)({ message: "Failed to get users" });
    });
});

router.get("/admin/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then(user => {
      return res.json(user)
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to get user!"})
    });
});

module.exports = router;