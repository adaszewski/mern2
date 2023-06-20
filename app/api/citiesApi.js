const express = require("express");
const router = express.Router();

const cities = require("../controllers/cities.controller")

router.get("/all", function (req, res) {
    cities.list(function (err, cities) {
      if (err) {
        res.status(404);
        res.json({
          error: "brak wydarzeń",
        });
      } else {
        res.json(cities);
      }
    });
  });

  router.get("/miasta", function (req, res) {
    cities.distcity(function (err, cities) {
      if (err) {
        res.status(404);
        res.json({
          error: "brak wydarzeń",
        });
      } else {
        res.json(cities);
      }
    });
  });

  router.get("/wojewodztwa", function (req, res) {
    cities.distreg(function (err, regions) {
      if (err) {
        res.status(404);
        res.json({
          error: "brak wydarzeń",
        });
      } else {
        res.json(regions);
      }
    });
  });

  router.get("/powiaty", function (req, res) {
    cities.distlocal(function (err, locals) {
      if (err) {
        res.status(404);
        res.json({
          error: "brak wydarzeń",
        });
      } else {
        res.json(locals);
      }
    });
  });

  router.get("/kody", function (req, res) {
    cities.distcode(function (err, zipcodes) {
      if (err) {
        res.status(404);
        res.json({
          error: "brak wydarzeń",
        });
      } else {
        res.json(zipcodes);
      }
    });
  });

  router.get("/ulice", function (req, res) {
    cities.diststreet(function (err, streets) {
      if (err) {
        res.status(404);
        res.json({
          error: "brak wydarzeń",
        });
      } else {
        res.json(streets);
      }
    });
  });

  module.exports = router;

