const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/mern2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const schema = new mongoose.Schema({
  wojewodztwo: {
    type: String,
    required: true,
    enum: [
      "dolnośląskie",
      "kujawsko-pomorskie",
      "lubelskie",
      "lubuskie",
      "łódzkie",
      "małopolskie",
      "mazowieckie",
      "opolskie",
      "podkarpackie",
      "podlaskie",
      "pomorskie",
      "śląskie",
      "świętokrzyskie",
      "warmińsko-mazurskie",
      "wielkopolskie",
      "zachodniopomorskie",
    ],
  }, 
  powiat:{ type: String, required: true },
  miasto: { type: String, required: true },
  kod_pocztowy: { type: String, required: true },
  ulica: { type: String, required: true },
  typ_ulica: { type: String, required: true },
 
});

module.exports = mongoose.model("Cities", schema);
