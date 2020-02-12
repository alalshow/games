// ENV
import dotenv from 'dotenv';
dotenv.config();
// DEPENDENCIES
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import crawling from './crawling';
import gameModel from './models/game';

const log = console.log;
const app = express();
const gameUniqueKey = 'id';
const page = {
  start: 1,
  last: 10,
};
let totalGamesCount = 0;

const logTatalCount = gameCount => {
  totalGamesCount += gameCount;
  log('inserted game count: ', totalGamesCount);
};

//insertMany 예제
// db.inventory.insertMany([
//   { item: 'journal', qty: 25, tags: ['blank', 'red'], dim_cm: [14, 21] },
//   { item: 'notebook', qty: 50, tags: ['red', 'blank'], dim_cm: [14, 21] },
//   {
//     item: 'paper',
//     qty: 100,
//     tags: ['red', 'blank', 'plain'],
//     dim_cm: [14, 21],
//   },
//   { item: 'planner', qty: 75, tags: ['blank', 'red'], dim_cm: [22.85, 30] },
//   { item: 'postcard', qty: 45, tags: ['blue'], dim_cm: [10, 15.25] },
// ]);

const getPriceStr = str => {
  const arr = str.split(' ');
  return arr[arr.length - 1];
};

const insertGames = (pageNum, games) => {
  if (Array.isArray(games)) {
    games.forEach((game, idx) => {
      game[gameUniqueKey] = `${pageNum}_${idx}`;
      game.price = getPriceStr(game.price);
      gameModel.create(game);
    });
    logTatalCount(games.length);
  }
};

const crawl = async (start, last) => {
  for (let i = start; i <= last; i++) {
    await crawling(i).then(games => insertGames(i, games));
  }
};

const start = async () => {
  try {
    app.use(express.static('public')); // Static File Service
    app.use(bodyParser.urlencoded({ extended: true })); // Body-parser
    app.use(bodyParser.json());
    mongoose.Promise = global.Promise; // Node의 native Promise 사용
    await mongoose.connect(process.env.MONGO_URI, {
      // CONNECT TO MONGODB SERVER
      useUnifiedTopology: true, //To use the new Server Discover and Monitoring engine
      useNewUrlParser: true, //To use the new Server Discover and Monitoring engine
      useCreateIndex: true, //DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
    });
    await gameModel.deleteAll();
    await crawl(page.start, page.last);
  } catch (error) {
    log(error);
    process.exit();
  } finally {
    log('crawling data is finished');
    process.exit();
  }
};

start();
