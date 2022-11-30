const Contact = require("../../models/Contact");
const Client = require("../../models/Client");
// const moment = require("moment");

function contactTable(cb) {
  Contact.find()
    .populate("client")
    .lean()
    .exec(function (err, contact) {
      if (err) {
        cb(err);
      } else {
        cb(null, contact);
      }
    });
}

function contactAdd(clientId, data, cb) {
  let newContact = new Contact({ ...data, client: clientId });
  newContact.save(function (err, contact) {
    if (err) {
      cb(err);
    } else {
      Client.findById(clientId, function (err, client) {
        if (err) return;
        client.contacts.push(contact._id);
        client.save();
      });
      cb(null, contact);
    }
  });
}

function contactGet(_id, cb) {
  Contact.findById(_id)
    .populate("client")
    .exec(function (err, contact) {
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
