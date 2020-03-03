const cheerio = require('cheerio'),
  axios = require('axios');

const splitor = '₩';
const log = console.log;
const gamesDetailPageHtmlParser = html => {
  let gameDetails = [];
  const $ = cheerio.load(html.data);
  const $trList = $('table.prices-table tbody').children();
  $trList.slice(0, 5).each(function(i, elem) {
    const tr = $(this)
      .text()
      .replace(/(\s*)/g, '');
    const trSplit = tr.split(splitor);
    gameDetails.push({ nation: trSplit[0], price: trSplit[1] });
    console.log(gameDetails);
  });
};

const crawling = async url => {
  try {
    let gamesHtml = await axios.get(url);
    let games = await gamesDetailPageHtmlParser(gamesHtml);
    return games;
  } catch (error) {
    log(error);
  }
};

crawling();
