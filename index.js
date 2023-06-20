require('dotenv').config()
const express = require("express");
const app = express();
const port = (process.env.PORT || 6000);
const hbs = require("express-handlebars");
const handlebars = require("handlebars");

const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');


const methodOverride = require('method-override');
const cors = require("cors");
const File = require('./app/models/File');
const Client = require('./app/models/Client');

const client = require("./app/controllers/client.controller");
const contact = require("./app/controllers/contact.controller");
const users = require("./app/controllers/users.controller");
const file=require("./app/controllers/file.controller")
const cities=require("./app/controllers/cities.controller")
const house=require("./app/controllers/house.controller")


const clientRouter = require("./app/routes/clientRouter");
const contactRouter = require("./app/routes/contactRouter");
const usersRouter = require("./app/routes/usersRouter");
const fileRouter = require("./app/routes/fileRouter");
const citiesRouter = require("./app/routes/citiesRouter");
const houseRouter = require("./app/routes/houseRouter");


const clientApiRouter = require("./app/api/clientApi");
const contactApiRouter = require("./app/api/contactApi");
const usersApiRouter = require("./app/api/usersApi");
const citiesApiRouter = require("./app/api/citiesApi");
const houseApiRouter = require("./app/api/houseApi");
const auth = require("./app/middlewares/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage });

app.use(express.json());
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.static("uploads"));



app.use("/client", clientRouter);
app.use("/contact", contactRouter);
app.use("/users", usersRouter);
app.use("/file", fileRouter);
app.use("/cities", citiesRouter);
app.use("/house", houseRouter);
app.use("/api/client", clientApiRouter);
app.use("/api/contact", contactApiRouter);
app.use("/api/users", usersApiRouter);
app.use("/api/cities", citiesApiRouter);
app.use("/api/house", houseApiRouter);

app.set("view engine", "hbs");

app.engine(
  "hbs",
  hbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
    list: handlebars.registerHelper("list", function (items, options) {
      const itemsAsHtml = items.map(item => "<li>" + options.fn(item) + "</li>");
      return "<ul>\n" + itemsAsHtml.join("\n") + "\n</ul>";
    }),
    helpers: {
      dateFormat: require("handlebars-dateformat"),
    },
  })
);

app.get("/file/add/:clientId", function (req, res) {
  client.get(req.params.clientId, function (err, client) {
    if (err) res.send(err);
    // console.log(clientId);
    res.render("files_add", client);
  });
});

app.post("/file/add/:clientId", upload.single('file'), (req, res, next) => {

  const obj = {
    client: req.params.clientId,
    filename: req.body.filename,
    desc: req.body.desc,
    filePath: req.file.originalname,
    file: {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.originalname)),
      contentType: 'file'
    }
  }
 
  File.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      Client.findById(req.params.clientId, function (err, client) {
        if (err) return;
        client.files.push(item._id);
        client.save();
        item.save();
        res.redirect('/');
      })
    }
    }
  );
});

// app.get('/file', (req, res) => {
//   File.find({}, (err, items) => {
//       if (err) {
//           console.log(err);
//           res.status(500).send('An error occurred', err);
//       }
//       else {
//           res.render('files', { items: items });
//       }
//   });
// });


app.get("/login", (req, res) => {
  res.render("login")
})

app.get("/", (req, res) => {
  res.render("home", {
    title: "Zarządzaj klientami i kontaktami",
    content1: "http://127.0.0.1:5000/client",
    content2: "http://127.0.0.1:5000/client/add",
    content3: "http://127.0.0.1:5000/contact",
    content4: "http://127.0.0.1:5000/users",
    content5: "http://127.0.0.1:5000/login",
    content6: "http://127.0.0.1:5000/users/add",
    content7: "http://127.0.0.1:5000/cities",
    content8: "http://127.0.0.1:5000/house"
  });
});

app.listen(port, () => {
  console.log(`Program działa na porcie ${port}`);
});
