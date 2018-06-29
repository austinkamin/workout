require('dotenv').config();
require('./db');
const express = require('express'); 
const app = express();
const http = require('http').Server(app); 
const bodyParser = require('body-parser')
const cors = require('cors')
var user = require('./controllers/usercontroller')
var log = require('./controllers/logcontroller')

app.use(cors())
app.use(bodyParser.json());
app.use('/api/user', require('./controllers/usercontroller'))

app.use(require('./middleware/validate-session'));
app.use('/api/log', require('./controllers/logcontroller'));

http.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
})