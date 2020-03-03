const {
  getGamesAmerica,
  getGamesEurope,
  getGamesJapan,
} = require('nintendo-switch-eshop');

const AMERICA = Symbol();
const EUROPE = Symbol();
const JAPAN = Symbol();

const getGames = async type => {
  let games;
  switch (type) {
    case AMERICA:
      games = await getGamesAmerica();
      break;
    case EUROPE:
      games = await getGamesEurope();
      break;
    case JAPAN:
      games = await getGamesJapan();
      break;
  }
  return games[0];
};
getGames(AMERICA).then(console.log);
getGames(EUROPE).then(console.log);
getGames(JAPAN).then(console.log);
