//Mongoose - /Users/toby/mongodb/bin/mongod --dbpath=/Users/toby/mongodb-data
const express = require ('express');
require('./mongoose');

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(require('./routers/story'));

app.get('/', function (req, res) {
	res.send('Hello, world!');
});

app.listen(port, () => {
	console.log('Server is up on port ' + port);
})