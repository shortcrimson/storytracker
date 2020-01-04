const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb://127.0.0.1:27017/storytracker';
// const uri = 'mongodb://db:27018/storytracker';
const run = async() => {
	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: false
	});
	console.log('DB Connected...');
}

run().catch(e => console.error(e));