const router = require("express").Router();
const Users = require("./users-model.js");

router.post("/login", (req, res) => {
  let user = req.body;
  
  Users.add(user)
    .then((user) => {
      res.status(201).json({ message: "Successfully logged in!" });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

  
router.get("/admin", (req, res) => {
  
  
  Users.find()
    .then(users => {
      return res.json(users)
    })
    .catch(error => {
      return res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/admin/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then(user => {
      return res.json(user)
    })
    .catch(error => {
      return res.status(500).json({ message: "Failed to get user!"})
    });
});

router.delete("/admin/:id", (req, res) => {
  const id = req.params.id;

  Users.remove(id)
    .then(user => {
      return res.status(410).json({ message: `User id: ${id} has been deleted!` })
        .catch(error => {
        return res.status(500).json({ message: "Failed to delete User!", error: error })
      })
    });
});

router.put("/admin/:id", (req, res) => {
  const id = req.params.id;

  Users.updateUser(id, req.body)
    .then(user => {
      return res.status(200).json({ message: `User id: ${id} has been updated!` })
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to update User!" })
    });
});

module.exports = router;