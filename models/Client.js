const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mern2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const schema = new mongoose.Schema({
  nazwa_firmy: {type: String, require: true},
  nip: { type: String, required: false },
  liczba_kontaktów: { type: Number, required: false },
  miasto: { type: String, required: true },
  kod_pocztowy: { type: String, required: true },
  ulica: {type: String, required: true},
  nr_domu:  {type: String, required: true},
  nr_lokalu:  {type: String, required: false},
  adres_email: {type: String, required: false},
  nr_telefonu:  {type: String, required: false},
});


module.exports = mongoose.model("Client", schema);
