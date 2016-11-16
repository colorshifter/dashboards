module.exports = {
  rule: mostActiveChannel
}

var helper = require('./message-helper.js');

function mostActiveChannel(dataStore, messages) {
  if (!messages || messages.length === 0) {
    return Promise.reject('most active channel skipped, no messages');
  } else {
    return Promise.resolve(createPayload(dataStore, messages));
  }
}

function createPayload(dataStore, messages) {
  var timeSortedMessages = messages.sort(helper.sortByTimestamp);
  var allMessages = helper.flattenToChannel(timeSortedMessages);
  allMessages.sort(helper.sortByCount);
  var mostActiveChannel = allMessages[0];
  if (mostActiveChannel === undefined) {
    return {};
  }
  var channelName = dataStore.getChannelById(mostActiveChannel.key).name;
  return {
    widgetKey: 'mostActiveChannel',
    template: 'classic', 
    payload: {
      title: '&#128172;',
      text: `<b>#${channelName}</b> is the most active channel!`
    }
  };
}
