const api = 'http://localhost:4500';
const fetch = require('node-fetch');

const log = console.log;
const request = async (url, content = {}, debug = false) => {
  const data = await fetch(`${api}/${url}`)
    .then(res => res.json())
    .then(log);
  return data;
};

request('games', {}, false);
