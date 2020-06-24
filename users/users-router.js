const router = require("express").Router();
const Users = require("./users-model.js");



  
router.get("/admin", (req, res) => {
  console.log(req.headers)
  Users.find()
    .then(users => {
      res.json(users)
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to get users" });
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