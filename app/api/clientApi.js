const express = require("express");
const router = express.Router();

const client = require("../controllers/client.controller");

router.get("/all", function (req, res) {
  client.list(function (err, clients) {
    if (err) {
      res.status(404);
      res.json({
        error: "brak wydarzeń",
      });
    } else {
      res.json(clients);
    }
  });
});

router.get("/nip/:nip", function (req, res) {
  client.getnip(req.params.nip, function (err, client) {
    if (err) {
      res.status(404);
      res.json({
        error: "nie ma klienta o takim nip w bazie",
      });
    } else {
      res.json(client);
    }
  });
});

router.get("/miasto/:miasto", function (req, res) {
  client.getmiasto(req.params.miasto, function (err, client) {
    if (err) {
      res.status(404);
      res.json({
        error: "nie ma klienta w tym mieście",
      });
    } else {
      res.json(client);
    }
  });
});

router.post("/add", function (req, res) {
  client.add(req.body, function (err) {
    if (err) res.send(err);
    res.json(client);
  });
});

router.delete("/del/:id", function (req, res) {
  console.log(req.params.id);
  client.delete(req.params.id, function (err) {
    if (err) res.send(err);
  });
});

router.put("/update/:id", function (req, res) {
  client.update(req.params.id, req.body, function (err) {
    if (err) res.send(err);

    res.json({ updated: true });
  });
});

module.exports = router;
