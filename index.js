const express = require("express");
const app = express();
const port = 5000;
const hbs = require("express-handlebars");
const cors = require("cors");
const client = require("./app/controllers/client.controller");
const contact= require("./app/controllers/contact.controller")
const clientRouter = require("./app/routes/clientRouter");
const contactRouter= require("./app/routes/contactRouter")
const clientApiRouter = require("./app/api/clientApi");
const contactApiRouter = require("./app/api/contactApi");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/client", clientRouter);
app.use("/contact", contactRouter);
app.use("/api/client", clientApiRouter);
// app.use("/api/contact", contactApiRouter);

app.engine("hbs", hbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("home", {
    title: "Zarządzaj klientami i kontaktami",
    content1: "http://localhost:5000/client", 
    content2: "http://localhost:5000/contact"
   });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
