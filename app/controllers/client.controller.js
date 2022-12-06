const Client = require("../../models/Client");
const moment = require("moment");

function clientTable(cb) {
  Client.find()
    .populate("contacts")
    .lean()
    .exec(function (err, clients) {
      if (err) {
        cb(err);
      } else {
        cb(null, clients);
      }
    });
}

function clientGetNip(nip, cb) {
  Client.findOne({nip: nip})
    .populate("contacts")
    .lean()
    .exec(function (err, client) {
      if (err) {
        cb(err);
      } else {
        cb(null, client);
      }
    });
}

function clientGetMiasto(miasto, cb) {
  Client.find({miasto: miasto})
    .populate("contacts")
    .lean(miasto)
    .exec(function (err, client) {
      if (err) {
        cb(err);
      } else {
        cb(null, client);
      }
      // console.log(client)
    });
}

function clientGet(_id, cb) {
  Client.findById(_id)
    .populate("contacts")
    .lean()
    .exec(function (err, client) {
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
  getnip: clientGetNip,
  getmiasto: clientGetMiasto,
  add: clientAdd,
  update: clientUpdate,
  delete: clientDelete,
};
