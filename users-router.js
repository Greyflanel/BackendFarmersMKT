const express = require("express");
const db = require("./data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  db("users")
    .then((users) => {
      res.json(users)
        console.log("It works");
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get users", err });
    });
});

module.exports = router;