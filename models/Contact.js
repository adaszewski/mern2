const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mern2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const schema = new mongoose.Schema({
  id_klienta: { type: String, value: mongoose.connection.getClient},
  data_kontaktu: { type: Date, required: false },
  forma_kontaktu: { type: String, required: false },
  notatka: { type: String, required: false },
  data_nastepnego_kontaktu: { type: Date, required: false },
});

module.exports = mongoose.model("Contact", schema);
