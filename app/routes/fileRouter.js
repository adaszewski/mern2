const express = require("express");
const router = express.Router();
const client = require("../controllers/client.controller");
const file = require("../controllers/file.controller");

// router.get("/", function (req, res) {
//   file.list(function (err, files) {
//     if (err) res.send(err);
//     res.render("files", { files });
//   });
// });

router.get('/', function (req, res)  {
    file.find( (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('files', { items: items });
        }
    });
});


module.exports = router;