let express  = require('express');
let app = express();
let bodyParser = require('body-parser');
var path = require('path');
const formidable = require('formidable')

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))



app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/submit-form', (req, res) => {
    new formidable.IncomingForm().parse(req)
      .on('fileBegin', (name, file) => {
          file.path = path.join(__dirname + '/uploads/' + file.name)
      })
      .on('file', (name, file) => {
        console.log('Uploaded file', name, file)
        res.send((file.name))
    })
      //...
  })

app.listen(3000, function(){
	console.log("Server started on port: 3000")
})