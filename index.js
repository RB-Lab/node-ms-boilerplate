const koa = require('koa');
const mount = require('koa-mount');
const restV1 = require('./rest/v1/index');
const mongoose = require('mongoose');
const cors = require('koa-cors');

mongoose.connect('mongodb://localhost/farm');

const app = koa();

app.use(cors());
app.use(mount('/rest/v1', restV1));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	app.listen(3000);
});
