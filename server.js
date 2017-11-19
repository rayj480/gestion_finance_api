const express = require("express");
var MongoClient = require('mongodb').MongoClient
, assert = require('assert');
var bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); 


app.set("port", process.env.PORT || 3001);

app.get("/api/operations", (req, res) => {

  var url = 'mongodb://localhost:27017/gestion_finance';
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
  
    var col = db.collection('operations');
    // Insert a single document
    col.find().toArray(function(err, r) {
      assert.equal(null, err);
      
      res.json(r);
    });
  });
});

app.post("/api/operation", (req, res) => {
  console.log(req.body);
  res.setHeader("Content-Type", "application/json");
  res.json({
    'libelle': req.body.libelle, 
    'montant': req.body.montant, 
    'userid': req.body.userid
  });
})

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
