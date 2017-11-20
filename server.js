const express = require("express");
var MongoClient = require('mongodb').MongoClient
, assert = require('assert');
var bodyParser = require('body-parser');
var uuidv4 = require('uuid/v4');


const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var url = 'mongodb://localhost:27017/gestion_finance';


app.set("port", process.env.PORT || 3001);

app.get("/api/operations", (req, res) => {

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
  res.setHeader("Content-Type", "application/json");

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
  
    var col = db.collection('operations');
    // Insert a single document
    col.insertOne({id: uuidv4(), libelle: req.body.libelle, montant: req.body.montant, userid: req.body.userid}).then((err, r) => {
      assert.equal(null, err);
      
      res.json({r});
    })
  })

  res.json({
    'libelle': req.body.libelle, 
    'montant': req.body.montant, 
    'userid': req.body.userid
  });
})

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
