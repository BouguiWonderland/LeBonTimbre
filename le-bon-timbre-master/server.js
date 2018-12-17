var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;


var app = express();
var port = 3000;
var db;

app.use(bodyParser({limit: '50mb'}));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies



MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
  if (err) throw err;
  db = client.db("data");
});
app.get('/', function(req, res) {
  console.log(req.method, req.url);
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/connect', function(req, res) {
   console.log(req.method, req.url);

   let usersData=[];

   db.collection("users").find({}).toArray(function (error, results) {
       if (error) throw error;
       usersData=results;

       let c=0;
       for(let i=0;i<usersData.length;i++){
         if(usersData[i].username==req.body.username)c++;
         if(usersData[i].password==req.body.password)c++;
         if(c==2)break;
         c=0;
       }

       let logged="false";
       if(c==2){logged="true";}

       res.send(logged);
        });

});

app.post('/submit/registration', function(req, res) {
   console.log(req.method, req.url);

   var usersData=[];

   db.collection("users").find({}).toArray(function (error, results) {
       if (error) throw error;
       usersData=results;
       console.log(results);


       //Vérification que le pseudo n'est pas utilisé
       let c=0;
       for(let i=0;i<usersData.length;i++){
         if(usersData[i].username==req.body.username){
           c++;
           break;
         }
         c=0;
       }

       let ok="true";
       if(c==1){ok="false";}
       else{
        let newUser={
          "username":req.body.username,
          "password":req.body.password,
          "firstname":req.body.firstname,
          "name":req.body.name,
          "email":req.body.email
        };
        db.collection("users").insertOne(newUser, null, function (error, results) {
        if (error) throw error;

        console.log("Le document a bien été inséré");
          });
        }
        res.send(ok);

     });

});

app.get('/user/:id', function(req, res) {
   console.log(req.method, req.url);

   db.collection("users").findOne({username:req.params.id}, function(err, result) {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });

});

app.post('/update/:id', function(req, res) {
    console.log(req.method, req.url);

    db.collection("users").findOne({username:req.params.id}, function(err, result) {
    if (err) throw err;
    if(req.body.firstname!="")result.firstname=req.body.firstname;
    if(req.body.name!="")result.name=req.body.name;
    if(req.body.password!="")result.password=req.body.password;
    if(req.body.email!="")result.email=req.body.email;

    var myquery = { username: req.params.id };
    var newvalues = { $set: { firstname: result.firstname, name:result.name, password:result.password, email:result.email } };

    db.collection("users").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");

    });
  });

});

app.get('/ads', function(req, res) {
   console.log(req.method, req.url);

   db.collection("ads").find({}).toArray(function (error, results) {
       if (error) throw error;
       res.send(results);
     });
});

app.get('/ad/:id', function(req, res) {
   console.log(req.method, req.url);

   db.collection("ads").findOne({_id:ObjectId(req.params.id)},function (error, result) {
       if (error) throw error;
       console.log(result);
       res.send(result);
     });

});



app.get('/ad/rm/:id', function(req, res) {
   console.log(req.method, req.url);

   db.collection("ads").deleteOne({_id:ObjectId(req.params.id)}, function(err, result) {
    if (err) throw err;
    console.log("Ad deleted");
  });

});


app.post('/ads', function (req, res) {

      var newAd={
        "title":req.body.title,
        "year":req.body.year,
        "country":req.body.country,
        "description":req.body.description,
        "price":req.body.price,
        "user":req.body.user,
        "latitude":req.body.latitude,
        "longitude":req.body.longitude,
        "img":req.body.img}


      db.collection("ads").insertOne(newAd, null, function (error, results) {
      if (error) throw error;

      console.log("Annonce ajoutée");
      });

});


app.use(express.static('public'));


app.use('/@polymer',express.static(__dirname+"/node_modules/@polymer"));
app.use('/@webcomponents',express.static(__dirname+"/node_modules/@webcomponents"));
app.use('/@granite-elements',express.static(__dirname+"/node_modules/@granite-elements"));

app.listen(port);
console.log("Listening to http://localhost:3000/ ...")
