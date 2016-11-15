const SO_URL = 'http://stackoverflow.com/search?q=novoda+hasaccepted%3Ano+closed%3Ano+duplicate%3Ano+created%3A3m...'
const httpClient = require('request-promise-native');
const BASE_URL = 'http://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&q=novoda&accepted=False&site=stackoverflow&closed=False&duplicate=False';
const REQUEST = {
  url: buildUrl(),
  gzip: true
};

function buildUrl() {
  var date = new Date();
  date.setMonth(date.getMonth() - 3);
  return BASE_URL + `&min=${date.getTime() / 1000 | 0}`;
}

function StackOverflow() {}

StackOverflow.prototype.rank = 1;

StackOverflow.prototype.rule = function() {
  return getQuestions()
    .then(toRuleResult);
}

function stackoverflow() {
  return getQuestions().then(toRuleResult);
}

function getQuestions() {
  return httpClient(REQUEST).then(parseResponse);
}

function parseResponse(body) {
  var jsonBody = JSON.parse(body);
  if (jsonBody.items) {
    return Promise.resolve({ questions: jsonBody.items, url: SO_URL });
  } else {
    return Promise.reject('stackoverflow: no items');
  }
}

function toRuleResult(data) {
  var questions = data.questions;
  var question = questions[Math.floor(Math.random() * questions.length)];
  return Promise.resolve({
    widgetKey: 'stackoverflow',
    template: 'classic',
    payload: {
      title: `&#128561;<br/>${questions.length} questions unanswered`,
      text: `surl.novoda.com/stackoverflow<br/><br/>&quot;${question.title}&quot;`
    }
  });
}

module.exports = StackOverflow;
