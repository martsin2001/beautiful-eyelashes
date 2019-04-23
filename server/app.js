const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const Customers = require('./routers/customers');

mongoose.connect(keys.mongoUrl)
.then(() => console.log('MongoDB concted'))
.catch(e => console.log(e));

app.use(require('cors')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', Customers);

app.listen(5000, () => console.log('Server is working'));