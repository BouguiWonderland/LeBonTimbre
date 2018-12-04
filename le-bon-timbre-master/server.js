var express = require('express');
var fs = require('fs');
var app = express();
var port = 3000;

let usersData=[];

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


app.get('/', function(req, res) {
  console.log(req.method, req.url);
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/register', function(req, res) {
   console.log(req.method, req.url);
   res.sendFile(__dirname + '/public/index.html');
});

app.get('/home', function(req, res) {
   console.log(req.method, req.url);
   res.sendFile(__dirname + '/public/homepage.html');
});

app.get('/users', function(req, res) {
   console.log(req.method, req.url);
   res.sendFile(__dirname + '/data/users.json');
});

app.get('/ads', function(req, res) {
   console.log(req.method, req.url);
   res.sendFile(__dirname + '/data/ads.json');
});

app.get('/ad/:id', function(req, res) {
   console.log(req.method, req.url);
   res.sendFile(__dirname + '/data/ads/ad-'+req.params.id+'.json');
});

app.get('/ad/rm/:id', function(req, res) {
   console.log(req.method, req.url);
   var data = fs.readFileSync('data/ads.json');
   console.log(data);
   var adsData = JSON.parse(data);
   var newData=[];
   for(let i=0;i<adsData.length;i++){
     if(adsData[i].id!=req.params.id){
       newData.push(adsData[i]);
     }
   }
   fs.writeFileSync("data/ads.json", JSON.stringify(newData),'utf8');
});


app.post('/users', function (req, res) {

  var data = fs.readFileSync('data/users.json');
  console.log(data);
  var usersData = JSON.parse(data);
  usersData.push({
    "username":req.body.username,
    "password":req.body.password,
    "firstname":req.body.firstname,
    "name":req.body.name,
    "email":req.body.email
  });

  fs.writeFileSync("data/users.json", JSON.stringify(usersData),'utf8');

});

app.post('/ads', function (req, res) {

//OUVERTURE ET AJOUT DE DONNÉES DANS LE FICHIER JSON users.json

  var data = fs.readFileSync('data/ads.json');
  console.log(data);
  var adsData = JSON.parse(data);
  adsData.push({
    "title":req.body.title,
    "year":req.body.year,
    "country":req.body.country,
    "description":req.body.description,
    "price":req.body.price,
    "user":req.body.user,
    "id":req.body.id,
    "latitude":req.body.latitude,
    "longitude":req.body.longitude
  });

  fs.writeFileSync("data/ads.json", JSON.stringify(adsData),'utf8');

  var adData={
    "title":req.body.title,
    "year":req.body.year,
    "country":req.body.country,
    "description":req.body.description,
    "price":req.body.price,
    "user":req.body.user,
    "id":req.body.id,
    "latitude":req.body.latitude,
    "longitude":req.body.longitude
  };

  fs.writeFileSync("data/ads/ad-"+req.body.id+".json", JSON.stringify(adData),'utf8');

});


app.use(express.static('public'));


app.use('/@polymer',express.static(__dirname+"/node_modules/@polymer"));
app.use('/@webcomponents',express.static(__dirname+"/node_modules/@webcomponents"));
app.use('/@granite-elements',express.static(__dirname+"/node_modules/@granite-elements"));

app.listen(port);
console.log("Listening to http://localhost:3000/ ...")
