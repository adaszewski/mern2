const Cities = require("../models/Cities");

function citiesTable(cb) {
  Cities.find()

    .lean()

    .exec(function (err, cities) {
      if (err) {
        cb(err);
      } else {
        cb(null, cities);
      }
    });
}

function distCities(cb) {
  Cities.distinct("miasto")

    .lean()
    .exec(function (err, cities) {
      if (err) {
        cb(err);
      } else {
        cb(null, cities);
      }
    });
}

function distRegionCities(cb) {
  Cities.distinct("wojewodztwo")

    .lean()
    .exec(function (err, regions) {
      if (err) {
        cb(err);
      } else {
        cb(null, regions);
      }
    });
}

function distLocalCities(cb) {
  Cities.distinct("powiat")

    .lean()
    .exec(function (err, locals) {
      if (err) {
        cb(err);
      } else {
        cb(null, locals);
      }
    });
}

function distZipCities(cb) {
  Cities.distinct("kod_pocztowy")

    .lean()
    .exec(function (err, codes) {
      if (err) {
        cb(err);
      } else {
        cb(null, codes);
      }
    });
}


function distStreetCities(cb) {
  Cities.distinct("ulica")

    .lean()
    .exec(function (err, streets) {
      if (err) {
        cb(err);
      } else {
        cb(null, streets);
      }
    });
}

module.exports = {
  list: citiesTable,
  distcity: distCities,
  distreg: distRegionCities,
  distlocal: distLocalCities,
  distcode: distZipCities,
  diststreet: distStreetCities,
};
