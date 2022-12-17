const express = require("express");
const router = express.Router();

const users = require("../controllers/users.Controller");

router.get("/all", function (req, res) {
  users.list( function (err, users) {
    if (err) {
      res.status(404);
      res.json({
        error: "brak wydarzeń",
      });
    } else {
      res.json(users);
    }
  });
});

router.get("/:_id", function (req, res) {
  users.list(req.params._id, function (err, users) {
    if (err) res.send(err);
    res.json(users);
  });
});

router.post("/add", function (req, res) {
  users.add(req.body, function (err) {
    if (err) res.send(err);
    res.json(users);
  });
});

router.delete("/del/:id", function (req, res) {
  console.log(req.params.id);
  users.delete(req.params.id, function (err) {
    if (err) res.send(err);
  });
});

router.put("/update/:id", function (req, res) {
  users.update(req.params.id, req.body, function (err) {
    if (err) res.send(err);

    res.json({ updated: true });
  });
});

router.post("/login", function (req, res) {
  users.login(req.body, function (err, loggedUser) {
    console.log(req.body)
    if (err) {
      res.status(404);
      res.json({
        error: "użytkownik nie został zalogowany",
      });
    } else if (loggedUser.token) {
      res.json({ success: true,user: loggedUser.user , jwt: loggedUser.token, });
    } else {
      res.json({
        success: false,
        message: "nazwa użytkownika lub hasło niepoprawne",
      });
    }
  });
});



module.exports = router;
