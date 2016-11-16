const http = require('request-promise-native');
const cheerio = require('cheerio')

function PeopleWall(config) {
  this.cookie = config.cookie;
}

PeopleWall.prototype.rank = 1;

PeopleWall.prototype.rule = function() {
  return http(createRequest(this.cookie))
    .then(findImages)
    .then(toPayload);
}

function createRequest(cookie) {
  return {
    url: 'https://www.pukkateam.com/home',
    headers: {
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.100 Safari/537.36',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'cookie': cookie
    }
  }
}

function findImages(html) {
  const $ = cheerio.load(html);
  const images = $('.camera');
  const people = [];
  for (var i in images) {
    const each = images[i];
    if (each.attribs) {
      if (each.attribs.src) {
        const person = {
          image: each.attribs.src,
          name: each.attribs.title
        }
        people.push(person);
      }
    }
  }
  return people;
}

function toPayload(data) {
  return {
    widgetKey: 'peopleWall',
    template: 'peopleWall',
    payload: data
  }
}

module.exports = PeopleWall;
