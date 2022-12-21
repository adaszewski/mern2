const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/mern2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, err => {
  console.log('connected')
});



const schema = new mongoose.Schema({
  filename: String,
  desc: String,
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  file:
  {
    data: Buffer,
    contentType: String
  },

});

module.exports = new mongoose.model('File', schema);