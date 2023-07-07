var express = require('express');
var router = express.Router();
var fs = require('fs');

var db = null;
fs.readFile('./data/db.json', 'utf-8', (err, jsonFile)=>{
  db = JSON.parse(jsonFile);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add', { title: 'Express', data:db });
});

router.post('/', async (req, res)=>{
    let title = req.body.title;
    let content = req.body.content;
    let img = req.body.base64img;
    let ip = req.headers['cf-connecting-ip'] || req.ip;
    let group = req.body.group;
    if(img.trim()=="") return res.redirect('/add');
    db[group].push({title, content, ip, base64img:img});
    fs.writeFile('./data/db.json', JSON.stringify(db), 'utf-8',function(err){
        if(err) return console.log('errrrr:'+err);
    });
    return res.redirect(`/gallery/${group}`);
})
module.exports = router;
