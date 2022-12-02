const express = require("express");
const router = express.Router();

const users = require("../controllers/users.controller");

router.get("", function (req, res) {
  users.list(function (err, users) {
    if (err) res.send(err);
    res.render("users", { users });
  });
});

router.get("/add", (req, res) => {
  res.render("useradd");
});

router.get("/:_id", function (req, res) {
  users.get(req.params._id, function (err, users) {
    if (err) res.send(err);
    res.render("mod_users", users);
  });
});

router.post("/add", function (req, res) {
  users.add(req.body, function (err) {
    if (err) {
      res.render("useradd", { error: "użytkownik  już istnieje" });
    } else {
      res.redirect("/");
    }
  });
});

router.get("/del/:_id", function (req, res) {
  users.delete(req.params._id, function (err) {
    if (err) res.send(err);
    res.redirect("/users");
  });
});

router.post("/update/:_id", function (req, res) {
  users.update(req.params._id, req.body, function (err) {
    if (err) res.send(err);
    res.redirect("/users");
  });
});

router.post("/login", function (req, res) {
  users.login(req.body, function (err, token) {
    if (err) {
      res.status(404);
      res.json({
        error: "użytkownik nie został zalogowany",
      });
    } else if (token) {
      res.json({ success: true, jwt: token });
    } else {
      res.json({
        success: false,
        message: "nazwa użytkownika lub hasło niepoprawne",
      });
    }
  });
});

module.exports = router;
