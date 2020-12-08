let express  = require('express');
let app = express();
let bodyParser = require('body-parser');
var path = require('path');

const frameguard = require('frameguard')
app.use(frameguard({ action: 'DENY' }))

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.listen(3000, function(){
	console.log("Server started on port: 3000")
})