require('dotenv').config()
const express = require("express");
const app = express();
const port = (process.env.PORT || 6000);
const hbs = require("express-handlebars");
const handlebars=require("handlebars")

const cors = require("cors");
const client = require("./app/controllers/client.controller");
const contact= require("./app/controllers/contact.controller")
const users=require("./app/controllers/users.controller")
const clientRouter = require("./app/routes/clientRouter");
const contactRouter= require("./app/routes/contactRouter")
const usersRouter=require("./app/routes/usersRouter")
const clientApiRouter = require("./app/api/clientApi");
const contactApiRouter = require("./app/api/contactApi");
const usersApiRouter=require("./app/api/usersApi");
const auth=require("./app/middlewares/auth");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use("/client",  clientRouter);
app.use("/contact",  contactRouter);
app.use("/users", usersRouter);
app.use("/api/client", clientApiRouter);
app.use("/api/contact", contactApiRouter);
app.use("/api/users", usersApiRouter);


app.set("view engine", "hbs");

app.engine(
  "hbs",
  hbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
    list: handlebars.registerHelper("list", function(items, options) {
  const itemsAsHtml = items.map(item => "<li>" + options.fn(item) + "</li>");
  return "<ul>\n" + itemsAsHtml.join("\n") + "\n</ul>";
}),
    helpers: {
      dateFormat: require("handlebars-dateformat"),

    },
    
  })
);

app.get("/login", (req, res) => {
  res.render("login")
})


app.get("/", (req, res) => {
  res.render("home", {
    title: "Zarządzaj klientami i kontaktami",
    content1: "http://localhost:5000/client", 
    content2: "http://localhost:5000/client/add", 
    content3: "http://localhost:5000/contact",
    content4: "http://localhost:5000/users",
    content5: "http://localhost:5000/login",
    content6: "http://localhost:5000/users/add"
   });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
