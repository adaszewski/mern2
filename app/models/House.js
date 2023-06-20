const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/mern2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const schema = new mongoose.Schema({
  nazwa: { type: String, require: true },
  kod_pocztowy: { type: String, required: true },
  poczta: { type: String, required: true },
  lokalizacja: { type: String, required: true },
  nr_lokalu: { type: String, required: true },
  telefon_1: { type: String, required: false },
  telefon_2: { type: String, required: false },
  e_mail: { type: String, required: false },
  rodzaj_działalności: { type: String, required: false },
  liczba_miejsc: { type: String, required: false },
  nr_zgody:  { type: String, required: true },
  rodzaj_zezwolenia: { type: String, required: true },
  organ_rejestrowy: { type: String, required: true },
});

module.exports = mongoose.model("House", schema);
