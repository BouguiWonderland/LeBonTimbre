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

app.post('/connect', function(req, res) {
   console.log(req.method, req.url);

   var dataUsers =[];
   dataUsers= fs.readFileSync('data/users.json');
   dataUsers=JSON.parse(dataUsers);


   let c=0;
   for(let i=0;i<dataUsers.length;i++){
     if(dataUsers[i].username==req.body.username)c++;
     if(dataUsers[i].password==req.body.password)c++;
     if(c==2)break;
     c=0;
   }

   let logged="false";
   if(c==2){logged="true";}

   res.send(logged);

});

app.post('/submit/registration', function(req, res) {
   console.log(req.method, req.url);

   var dataUsers =[];
   dataUsers= fs.readFileSync('data/users.json');
   dataUsers=JSON.parse(dataUsers);

   //Vérification que le pseudo n'est pas utilisé
   let c=0;
   for(let i=0;i<dataUsers.length;i++){
     if(dataUsers[i].username==req.body.username){
       c++;
       break;
     }
     c=0;
   }

   let ok="true";
   if(c==1){ok="false";}
   else{
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
   }

   res.send(ok);

});

app.get('/user/:id', function(req, res) {
   console.log(req.method, req.url);

   var dataUsers = fs.readFileSync('data/users.json');
   var users = JSON.parse(dataUsers);

   let a;
   let i;
   for(i=0;i<users.length;i++){
     if(users[i].username==req.params.id)a=i;
   }

   res.send(users[a]);

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
    "id":req.body.id
  });

  fs.writeFileSync("data/ads.json", JSON.stringify(adsData),'utf8');

  var adData={
    "title":req.body.title,
    "year":req.body.year,
    "country":req.body.country,
    "description":req.body.description,
    "price":req.body.price,
    "user":req.body.user,
    "id":req.body.id
  };

  fs.writeFileSync("data/ads/ad-"+req.body.id+".json", JSON.stringify(adData),'utf8');

});


app.use(express.static('public'));


app.use('/@polymer',express.static(__dirname+"/node_modules/@polymer"));
app.use('/@webcomponents',express.static(__dirname+"/node_modules/@webcomponents"));
app.use('/@granite-elements',express.static(__dirname+"/node_modules/@granite-elements"));

app.listen(port);
console.log("Listening to http://localhost:3000/ ...")
