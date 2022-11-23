const Client = require("../../models/Client");
const moment = require("moment");

function clientTable(cb) {
  Client.find()
    .lean()
    .exec(function (err, clients) {
      if (err) {
        cb(err);
      } else {
        cb(null, clients);
      }
    });
}

function clientGet(_id, cb) {
  Client.findById(_id).exec(function (err, client) {
    if (err) {
      cb(err);
    } else {
      cb(null, client);
    }
  });
}

function clientAdd(data, cb) {
  let newClient = new Client(data);

  newClient.save(function (err, client) {
    if (err) {
      cb(err);
    } else {
      cb(null, client);
    }
  });
}

function clientUpdate(id, data, cb) {
  Client.updateOne({ _id: id }, data, function (err, client) {
    if (err) {
      cb(err);
    } else {
      cb(null, client);
    }
  });
}

function clientDelete(id, cb) {
  Client.deleteOne({ _id: id }, function (err, client) {
    if (err) {
      cb(err);
    } else {
      cb(null, client);
    }
  });
}

module.exports = {
  list: clientTable,
  get: clientGet,
  add: clientAdd,
  update: clientUpdate,
  delete: clientDelete,
};
