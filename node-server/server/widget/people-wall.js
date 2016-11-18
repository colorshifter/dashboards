const Horseman = require('node-horseman');

const cheerio = require('cheerio');
const valuesOf = require('object.values');

const WAIT_FOR_LOGIN_TIMEOUT_MS = 10 * 1000;

function PeopleWall(config) {
  this.email = config.email;
  this.password = config.password;
  this.exclude = config.exclude;
}

PeopleWall.prototype.rank = 1;

PeopleWall.prototype.rule = function () {
  return findPeople(this.email, this.password, excludeFilter(this.exclude))
    .then(toPayload);
}

function findPeople(email, password, excludeFilter) {
  const horseman = new Horseman();
  return horseman
    .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
    .open('https://www.pukkateam.com/login')
    .type('input[name="email"]', email)
    .type('input[name="password"]', password)
    .click('button[type="submit"]')
    .wait(WAIT_FOR_LOGIN_TIMEOUT_MS)
    .html('#snapshots')
    .then(findPeopleFromSnapshots(excludeFilter))
    .then(result => {
      horseman.close();
      return result;
    });
}

function findPeopleFromSnapshots(excludeFilter) {
  return function(snapshots) {
    const $ = cheerio.load(snapshots);
    const imageElements = $('.camera');
    return valuesOf(imageElements)
      .filter((image) => image.attribs && image.attribs.src)
      .map((image) => {
        return {
          image: image.attribs.src,
          name: image.attribs.title
        }
      }).filter(excludeFilter);
  }
}

function excludeFilter(exclude) {
  return (person) => !exclude.includes(person.name);
}

function toPayload(data) {
  return {
    widgetKey: 'peopleWall',
    template: 'peopleWall',
    payload: data
  };
}

module.exports = PeopleWall;
