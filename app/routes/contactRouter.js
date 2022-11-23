const express=require("express");
const router = express.Router();

const contact = require("../controllers/contact.controller");


router.get("", function (req, res) {
    contact.list(function (err, contact) {
      if (err) res.send(err);
      res.render("contact", {contact} );
    });
  });
  
  router.get("/:id", function (req, res) {
    contact.get(req.params.id, function (err, contact) {
      if (err) res.send(err);
      contact.data_kontaktu="2022-11-12";
      console.log(contact);
      res.render("mod_contact", contact);
    });
  });
  
  router.post("/add", function (req, res) {
    contact.add(req.body, function (err) {
      if (err) res.send(err);
      res.redirect("/contact");
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

  module.exports=router;