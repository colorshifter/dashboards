const Horseman = require('node-horseman');
const horseman = new Horseman();
const cheerio = require('cheerio');

function PeopleWall(config) {
  this.email = config.email;
  this.password = config.password;
}

PeopleWall.prototype.rank = 1;

PeopleWall.prototype.rule = function() {
  return findImages(this.email, this.password)
    .then(toPayload);
}

function findImages(email, password) {
  return new Promise(function(resolve, reject) {
    horseman
      .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
      .open('https://www.pukkateam.com/login')
      .type('input[name="email"]', email)
      .type('input[name="password"]', password)
      .click('button[type="submit"]')
      .wait(10000)
      .html('#snapshots')
      .close()
      .then(findPeopleFrom)
      .then(resolve)
      .catch(reject);
  });
}

function findPeopleFrom(snapshots) {
  console.log(snapshots)
  const $ = cheerio.load(snapshots);
  const imageElements = $('.camera');
  const people = [];
  for (var i in imageElements) {
    const each = imageElements[i];
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
