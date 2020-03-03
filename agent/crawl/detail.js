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
    if (trSplit && trSplit.length == 2) {
      gameDetails.push({ nation: trSplit[0], price: trSplit[1] });
    }
  });
  return gameDetails;
};

const getDetail = async url => {
  try {
    let html = await axios.get(url);
    let gameDetails = gamesDetailPageHtmlParser(html);
    return gameDetails;
  } catch (error) {
    log(error);
  }
};

export default getDetail;
