const express = require("express");
const router = express.Router();

const contact = require("../controllers/contact.controller");

router.get("/all", function (req, res) {
  contact.list( function (err, contacts) {
    if (err) {
      res.status(404);
      res.json({
        error: "brak wydarzeń",
      });
    } else {
      res.json(contacts);
    }
  });
});

router.get("/nip/:nip", function (req, res) {
  contact.listNip( function (err, contacts) {
    if (err) {
      res.status(404);
      res.json({
        error: "brak wydarzeń",
      });
    } else {
      res.json(contacts);
    }
  });
});


router.get("/:_id", function (req, res) {
  contact.list(req.params._id, function (err, contact) {
    if (err) res.send(err);
    res.json(contact);
  });
});

router.post("/add", function (req, res) {
  contact.add(req.body, function (err) {
    if (err) res.send(err);
    res.json(contact);
  });
});

router.delete("/del/:id", function (req, res) {
  console.log(req.params.id);
  contact.delete(req.params.id, function (err) {
    if (err) res.send(err);
  });
});

router.put("/update/:id", function (req, res) {
  contact.update(req.params.id, req.body, function (err) {
    if (err) res.send(err);

    res.json({ updated: true });
  });
});

module.exports = router;