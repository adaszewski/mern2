const express = require("express");
const router = express.Router();

const client = require("../controllers/client.controller");

router.get("/all", function (req, res) {
  client.list( function (err, clients) {
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

router.get("/:_id", function (req, res) {
  client.list(req.params._id, function (err, client) {
    if (err) res.send(err);
    res.json(client);
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
