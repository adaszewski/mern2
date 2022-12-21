const Users = require("../models/Users")
const bcrypt = require("bcrypt");

function usersTable(cb) {
  Users.find()
    .lean()
    .exec(function (err, users) {
      if (err) {
        cb(err);
      } else {
        cb(null, users);
      }
    });
}

function userGet(_id, cb) {
  Users.findById(_id).exec(function (err, users) {
    if (err) {
      cb(err);
    } else {
      cb(null, users);
    }
  });
}

function userAdd(data, cb) {
  let newUser = new Users(data);

  newUser.save(function (err, users) {
    if (err) {
      cb(err);
    } else {
      cb(null, users);
    }
  });
}

function userUpdate(id, data, cb) {
  Users.updateOne({ _id: id }, data, function (err, users) {
    if (err) {
      cb(err);
    } else {
      cb(null, users);
    }
  });
}

function userDelete(id, cb) {
  Users.deleteOne({ _id: id }, function (err, users) {
    if (err) {
      cb(err);
    } else {
      cb(null, users);
    }
  });
}

function loginUser(data, cb) {
  Users.findOne({ username: data.username }).exec(function (err, user) {
    if (err) {
      cb(err);
      return;
    }

    if (!user) {
      cb(null, user);
      return;
    }

    bcrypt.compare(data.password, user.password, function (err, logged) {
      if (err) {
        cb(err);
      }
      if (logged) {
        const token = user.generateAuthToken();
        cb(null, {token, user: user.username});
      } else {
        cb(null, null);
      }
    });
  });
}

module.exports = {
  list: usersTable,
  get: userGet,
  add: userAdd,
  update: userUpdate,
  delete: userDelete,
  login: loginUser
};
