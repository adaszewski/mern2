const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mern2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const schema = new mongoose.Schema({
  nazwa_firmy: {type: String, require: true},
  nip: { type: String, required: false },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
  ],
  adres: {
      miasto: { type: String, required: true },
      kod_pocztowy: { type: String, required: true },
      ulica: {type: String, required: true},
      nr_domu:  {type: String, required: true},
      nr_lokalu:  {type: String, required: false},
      adres_email: {type: String, required: false},
      nr_telefonu:  {type: String, required: false},
  },
  opiekun: {type:String},
})

module.exports = mongoose.model("Client", schema);
