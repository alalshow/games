// ENV
const dotenv = require('dotenv');
dotenv.config();
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const route_games = require('./routes/games');

const app = express();
const port = process.env.PORT || 4500;

// Static File Service
app.use(express.static('public'));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Node의 native Promise 사용
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true, //To use the new Server Discover and Monitoring engine
    useNewUrlParser: true, //To use the new Server Discover and Monitoring engine
    useCreateIndex: true, //DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
  })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

// ROUTERS
app.use('/games', route_games);

app.listen(port, () => console.log(`Server listening on port ${port}`));
