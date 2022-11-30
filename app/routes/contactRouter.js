const express = require("express");
const router = express.Router();
const client = require("../controllers/client.controller");
const contact = require("../controllers/contact.controller");

router.get("", function (req, res) {
  contact.list(function (err, contact) {
    if (err) res.send(err);
    res.render("contact", { contact });
  });
});

router.get("/:id", function (req, res) {
  contact.get(req.params.id, function (err, contact) {
    if (err) res.send(err);
    console.log(contact);
    res.render("mod_contact", contact);
  });
});

router.get("/add/:clientId", function (req, res) {
  client.get(req.params.clientId, function (err, client) {
    if (err) res.send(err);
    // console.log(clientId);
    res.render("contact", client);
  });
});


router.post("/add/:clientId", function (req, res) {
  contact.add(req.params.clientId, req.body, function (err) {
    if (err) res.send(err);
    
    res.redirect("/client");
  });
});

router.get("/del/:id", function (req, res) {
  contact.delete(req.params.id, function (err) {
    if (err) res.send(err);
    res.redirect("/contact");
  });
});

router.post("/update/:id", function (req, res) {
  contact.update(req.params.id, req.body, function (err) {
    if (err) res.send(err);
    res.redirect("/contact");
  });
});

module.exports = router;
