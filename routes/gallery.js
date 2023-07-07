var express = require('express');
var router = express.Router();
var fs = require('fs');

var db = null;
fs.readFile('./data/db.json', 'utf-8', (err, jsonFile)=>{
  db = JSON.parse(jsonFile);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('gallery', { title: 'Main' });
});

router.get('/:galleryName', function(req, res, next) {
    fs.readFile('./data/db.json', 'utf-8', (err, jsonFile)=>{
        db = JSON.parse(jsonFile);
    });
    res.render('gallery', { galleryName: req.params.galleryName, data: db });
  });

module.exports = router;
