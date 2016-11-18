var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;
var MemoryDataStore = require('@slack/client').MemoryDataStore;

var rules = [
  require('./biggest-slacker.js'),
  require('./most-active-channel.js'),
  require('./thanks.js'),
  require('./gallery.js')
]

var Slacker = function(config) {
  this.messages = [];
  this.ruleIndex = 0;
  this.rtm = new RtmClient(
    config.token,
    { dataStore: new MemoryDataStore() }
  );
  this.rtm.start();
  this.rtm.on(RTM_EVENTS.MESSAGE, messageHandler(this));
}

function messageHandler(self, callback) {
  return function(message) {
    if (ignored(message)) {
      console.log('message ignored');
      return;
    }
    if (self.messages.length > 0 && !isSameDayFor(message, self.messages[0])) {
      self.messages.length = 0;
    }
    self.messages.push(message);
  }
}

function isSameDayFor(message1, message2) {
  return formatDateFor(message1) === formatDateFor(message2);
}

function formatDateFor(message) {
  var date = new Date(Math.floor(message.ts) * 1000);
  return date.getDate()  + "-" + date.getMonth() + "-" + date.getFullYear();
}

function ignored(message) {
  return message.type !== 'message' || message.bot_id || !message.text;
}

Slacker.prototype.getRules = function() {
  var self = this;
  return rules.map(each => {
    return {
      rule: function() {
        return each.rule(self.rtm.dataStore, self.messages)
      },
      rank: 1
    };
  });
}

module.exports = Slacker;
