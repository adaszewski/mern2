
const File= require("../models/File")
const Client = require("../models/Client");

function filesTable(cb) {
  File.find( )
    .populate({path:'client'})
    .lean()
    .exec(function (err, items) {
      if (err) {
        cb(err);
        
      } else {
        cb(null, items);
        // console.log(items);
        
      }
    });
}




module.exports = {
    find: filesTable,
 
  };