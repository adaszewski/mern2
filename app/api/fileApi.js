const express = require("express");
const router = express.Router();

const file = require("../controllers/file.controller")






// router.get("/:_id", function (req, res) {
//   contact.list(req.params._id, function (err, contact) {
//     if (err) res.send(err);
//     res.json(contact);
//   });
// });

router.post("/add/:id", function (req, res) {
  file.add(req.params.id, req.body,  function (err) {
    if (err) res.send(err);
    res.json(file);
  });
});

// router.delete("/del/:id", function (req, res) {
//   console.log(req.params.id);
//   file.delete(req.params.id, function (err) {
//     if (err) res.send(err);
//   });
// });

// router.put("/update/:id", function (req, res) {
//   file.update(req.params.id, req.body, function (err) {
//     if (err) res.send(err);

//     res.json({ updated: true });
//   });
// });

module.exports = router;