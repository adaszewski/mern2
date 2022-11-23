const express=require("express");
const router = express.Router();

const client = require("../controllers/client.controller");


router.get("", function (req, res) {
    client.list(function (err, client) {
      if (err) res.send(err);
      res.render("client", { client });
    });
  });
  
  router.get("/:_id", function (req, res) {
    client.get(req.params._id, function (err, client) {
      if (err) res.send(err);
      res.render("mod_client", client);
    });
  });
  
  router.post("/add", function (req, res) {
    client.add(req.body, function (err) {
      if (err) res.send(err);
      res.redirect("/client");
    });
  });
  
  router.get("/del/:_id", function (req, res) {
    client.delete(req.params._id, function (err) {
      if (err) res.send(err);
      res.redirect("/client");
    });
  });

  router.post("/update/:_id", function (req, res) {
    client.update(req.params._id, req.body, function (err) {
      if (err) res.send(err);
      res.redirect("/client");
    });
  });

  module.exports=router;