module.exports = {
  rule: biggestSlacker
}

var helper = require('./message-helper.js');

function biggestSlacker(dataStore, messages) {
  if (!messages || messages.length === 0) {
    return Promise.reject('biggest slacker skipped, no messages');
  } else {
    return Promise.resolve(createPayload(dataStore, messages));
  }
}

function createPayload(dataStore, messages) {
  var timeSortedMessages = messages.sort(helper.sortByTimestamp);
  var allMessages = helper.flattenToUser(timeSortedMessages);
  allMessages.sort(helper.sortByCount);
  var biggestSlacker = allMessages[0];
    if (biggestSlacker === undefined) {
    return {};
  }
  var user = dataStore.getUserById(biggestSlacker.key);
  return {
    widgetKey: 'biggestSlacker',
    template: 'message',
    payload: {
      username: user.name,
      message: 'Is the biggest Slacker! 😎',
      image: helper.highestResolutionForUser(user) 
    }
  };
}
