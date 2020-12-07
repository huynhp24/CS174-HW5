let express  = require('express');
let app = express();
let bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');

app.use(bodyParser.json());


var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'doot',
  database: 'dudebase',
	multipleStatements: true
})

con.connect((err) => {
	if (err) {
		console.log('Not connected!');
  }
  else{
    console.log('Connected sucessfully');
  }
	
});

function insertDude(req, res){
  var name = req.body.name;
  var coolness = Math.floor(Math.random() * 10);
  con.query("insert into dudes (name, coolness) values(?,?) ", [name, coolness], function(err, results, fields) {
    if (err) throw err;
    console.log(results); 
    res.redirect('/helpMe');
    });
}

function showAll(req,res){
  con.query("select * from dudes", function(err, results, fields) {
    if (err) throw err;
    res.send(results);
    });
}

app.post('/addIt', function(req, res) {
  console.log("A single dude was added"); 
  insertDude(req, res); 
})
app.get('/', function(req, res) {
  console.log(req)
	res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('showAll', function(req, res) {
  showAll(req,res);
})

app.listen(3000, function(){
	console.log("Server started on port: 3000")
})