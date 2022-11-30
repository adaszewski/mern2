const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mern2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const schema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  data_kontaktu: { type: Date, required: true },
  forma_kontaktu: { type: String, required: false, enum: ["spotkanie", "telefon", "e-mail", "poczta", "inne" ] },
  notatka: { type: String, required: true },
  data_nastepnego_kontaktu: { type: Date, required: false },
});

module.exports = mongoose.model("Contact", schema);
