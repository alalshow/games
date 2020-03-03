// ENV
import dotenv from 'dotenv';
dotenv.config();
// DEPENDENCIES
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import getGameList from './crawl/list';
import gameModel from './models/game';
import googleTranslate from './translate/google-translate';

const log = console.log;
const app = express();
const gameUniqueKey = 'id';
const page = {
  start: 1,
  last: 2,
};
let totalGamesCount = 0;

const logTatalCount = gameCount => {
  totalGamesCount += gameCount;
  log('inserted game count: ', totalGamesCount);
};

const getPriceStr = str => {
  const arr = str.split(' ');
  return arr[arr.length - 1];
};

/* 병렬 처리가 필요하다면 나중에 사용
const getTitles = async games => {
  try {
    if (Array.isArray(games)) {
      const promises = games.map(game => googleTranslate(game.title));
      const titles = await Promise.all(promises);
      log(titles);
    }
  } catch (e) {
    log(e);
  }
  return games;
};
*/
const setGamesData = async (pageNum, games) => {
  console.log(pageNum);
  try {
    if (Array.isArray(games)) {
      for (let idx = 0; idx <= games.length - 1; idx++) {
        let game = games[idx];
        game.title = await googleTranslate(game.title);
        game.summary = await googleTranslate(game.summary);
        game[gameUniqueKey] = `${pageNum}_${idx}`;
        game.price = getPriceStr(game.price);
      }
    }
  } catch (e) {
    log(e);
  }
  return games;
};

const insertGames = games => {
  gameModel.createMany(games);
  logTatalCount(games.length);
};

const crawl = async (start, last) => {
  let games = [];
  try {
    for (let i = start; i <= last; i++) {
      games = await getGameList(i);
      games = await setGamesData(i, games);
      insertGames(games);
    }
    log(games[0]);
  } catch (e) {
    log(e);
  }
  return games;
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

const st = async () => {
  const test = await googleTranslate('hello');
  log(test);
};
start();
