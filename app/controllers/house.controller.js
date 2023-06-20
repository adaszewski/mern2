const House = require("../models/House");

function housesTable(cb) {
  House.find()
    .sort({ kod_pocztowy: 1 })
    .lean()
    .exec(function (err, houses) {
      if (err) {
        cb(err);
      } else {
        cb(null, houses);
      }
    });
}


module.exports = {
  list: housesTable,

};
