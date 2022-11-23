const Contact = require("../../models/Contact")
// const moment = require("moment");

function contactTable(cb) {
  Contact.find()
    .lean()
    .exec(function (err, contact) {
      if (err) {
        cb(err);
      } else {
        cb(null, contact);
      }
    });
}

function contactGet(_id, cb) {
  Contact.findById(_id).exec(function (err, contact) {
    if (err) {
      cb(err);
    } else {
      cb(null, contact);
    }
  });
}

function contactAdd(data, cb) {
  let newClient = new Contact(data);

  newClient.save(function (err, contact) {
    if (err) {
      cb(err);
    } else {
      cb(null, contact);
    }
  });
}

function contactUpdate(id, data, cb) {
  Contact.updateOne({ _id: id }, data, function (err, contact) {
    if (err) {
      cb(err);
    } else {
      cb(null, contact);
    }
  });
}

function contactDelete(id, cb) {
  Contact.deleteOne({ _id: id }, function (err, contact) {
    if (err) {
      cb(err);
    } else {
      cb(null, contact);
    }
  });
}

module.exports = {
  list: contactTable,
  get: contactGet,
  add: contactAdd,
  update: contactUpdate,
  delete: contactDelete,
};
