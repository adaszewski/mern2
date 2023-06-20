const express = require("express");
const router = express.Router();

const house = require("../controllers/house.controller");

router.get("/all", function (req, res) {
  house.list(function (err, houses) {
    if (err) {
      res.status(404);
      res.json({
        error: "brak wydarzeń",
      });
    } else {
      res.json(houses);
    }
  });
});



module.exports = router;
