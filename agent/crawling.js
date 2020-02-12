import cheerio from 'cheerio';
import axios from 'axios';

const log = console.log;
const baseUrl = 'https://eshop-prices.com';
const gamesUrl = `${baseUrl}/games?currency=KRW&page=`;

const main_selector = {
  body: '.games-list',
  items: 'a.games-list-item',
  content: '.games-list-item-content',
};

const sub_selector = {
  title: `${main_selector.content} .games-list-item-title`,
  url_attr: 'href',
  image_url_attr: 'src',
  image_url: `.games-list-item-image picture img`,
  summary: `${main_selector.content} .games-list-item-description`,
  meata: `${main_selector.content} .games-list-item-meta`,
  price: `${main_selector.content} .price`,
};

const htmlParser = html => {
  let ulList = [];
  const $ = cheerio.load(html.data);
  const $bodyList = $(main_selector.body).children(main_selector.items);

  $bodyList.each(function(i, elem) {
    ulList[i] = {
      title: $(this)
        .find(sub_selector.title)
        .text()
        .trim(),
      url: `${baseUrl}${$(this).attr(sub_selector.url_attr)}`,
      image_url: $(this)
        .find(sub_selector.image_url)
        .attr(sub_selector.image_url_attr),
      summary: $(this)
        .find(sub_selector.summary)
        .text()
        .trim(),
      meta: $(this)
        .find(sub_selector.meata)
        .text()
        .trim(),
      price: $(this)
        .find(sub_selector.price)
        .text()
        .trim(),
    };
  });
  return ulList.filter(n => n.title);
};

const crawling = async pageNum => {
  try {
    let gamesHtml = await axios.get(`${gamesUrl}${pageNum}`);
    let games = htmlParser(gamesHtml);
    return games;
  } catch (error) {
    log(error);
  }
};

export default crawling;
