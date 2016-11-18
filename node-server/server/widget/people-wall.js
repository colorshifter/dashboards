const Horseman = require('node-horseman');
const horseman = new Horseman();
const cheerio = require('cheerio');
const valuesOf = require('object.values');

const WAIT_FOR_LOGIN_TIMEOUT_MS = 10 * 1000;

const OPT_OUT_NAMES = [
  'Alex Styl'
];

function PeopleWall(config) {
  this.email = config.email;
  this.password = config.password;
}

PeopleWall.prototype.rank = 1;

PeopleWall.prototype.rule = function () {
  return findPeople(this.email, this.password)
    .then(toPayload);
}

function findPeople(email, password) {
  return new Promise(function (resolve, reject) {
    horseman
      .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
      .open('https://www.pukkateam.com/login')
      .type('input[name="email"]', email)
      .type('input[name="password"]', password)
      .click('button[type="submit"]')
      .wait(WAIT_FOR_LOGIN_TIMEOUT_MS)
      .html('#snapshots')
      .close()
      .then(findPeopleFromSnapshots)
      .then(resolve)
      .catch(reject);
  });
}

function findPeopleFromSnapshots(snapshots) {
  const $ = cheerio.load(snapshots);
  const imageElements = $('.camera');
  return valuesOf(imageElements)
    .filter((image) => image.attribs && image.attribs.src)
    .map((image) => {
      return {
        image: image.attribs.src,
        name: image.attribs.title
      }
    }).filter(filterOpttedOutPeople);
}

const filterOpttedOutPeople = (person) => !OPT_OUT_NAMES.includes(person.name);

function toPayload(data) {
  return {
    widgetKey: 'peopleWall',
    template: 'peopleWall',
    payload: data
  };
}

module.exports = PeopleWall;
