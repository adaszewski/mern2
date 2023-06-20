const Client = require("../models/Client");
const File = require("../models/File");
const moment = require("moment");

function clientTable(cb) {
  Client.find()
    .populate("contacts")
    .populate("files")
    .sort({ nip: 1 })
    .lean()
    .exec(function (err, clients) {
      if (err) {
        cb(err);
      } else {
        cb(null, clients);
      }
    });
}

function clientTableNip(cb) {
  Client.find()
    .select("nip")
    .lean()
    .exec(function (err, clients) {
      if (err) {
        cb(err);
      } else {
        cb(null, clients);
      }
    });
}

function clientTableCity(cb) {
  Client.find()
    
    
    .select("adres.miasto")
    // .distinct("adres.miasto")
    .lean()
    .exec(function (err, cities) {
      if (err) {
        cb(err);
      } else {
        cb(null, cities);
      }
    });
}

function clientTableUser(cb) {
  Client.find()
    .select("opiekun")
    .lean()
    .exec(function (err, user) {
      if (err) {
        cb(err);
      } else {
        cb(null, user);
      }
    });
}

function clientGetNip(nip, cb) {
  Client.findOne({ nip: nip })

    .populate({ path: "contacts", options: { sort: { data_kontaktu: 1 } } })
    .populate("files")
    .lean()
    .exec(function (err, client) {
      console.log(err);
      console.log(client);
      if (err) {
        cb(err);
      } else {
        cb(null, client);
      }
    });
}

function clientGetMiasto(miasto, cb) {
  Client.find({ "adres.miasto": miasto })
    .populate("contacts")
    .populate("files")
    .lean()
    .exec(function (err, clients) {
      if (err) {
        cb(err);
      } else {
        cb(null, clients);
      }
      // console.log(client)
    });
}

function clientGetOpiekun(opiekun, cb) {
  Client.find({ "opiekun": opiekun })
    .populate("contacts")
    .populate("files")
    .lean()
    .exec(function (err, clients) {
      if (err) {
        cb(err);
      } else {
        cb(null, clients);
      }
      // console.log(client)
    });
}


function clientGet(_id, cb) {
  Client.findOne({ _id })
    .populate("contacts", "file")

    .lean()
    .exec(function (err, client) {
      cb(null, client);
      // console.log(client);
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
  getopiekun: clientGetOpiekun,
  add: clientAdd,
  update: clientUpdate,
  delete: clientDelete,
  nipTable: clientTableNip,
  cityTable: clientTableCity,
  userTable: clientTableUser,
};
