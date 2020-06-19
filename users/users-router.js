const router = require("express").Router();
const db = require("../data/db-config.js");

router.get("/", (req, res) => {
  db("users")
    .then((users) => {
      res.json(users)
        console.log("It works");
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to get users", error });
    });
});

module.exports = router;