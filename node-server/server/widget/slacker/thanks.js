module.exports = {
  rule: thanks
}

var helper = require('./message-helper.js');

function thanks(dataStore, messages) {
  var thankYouMessages = findThanksMessages(dataStore, messages);
  if (!thankYouMessages || thankYouMessages.length === 0) {
    return Promise.reject('no thanks message found');
  } else {
    var latestThanksMessage = thankYouMessages[0];
    return Promise.resolve(createPayload(dataStore, latestThanksMessage));
  }
}

function findThanksMessages(dataStore, messages) {
  var channel = dataStore.getChannelByName('thanks');
  return messages.filter(each => {
    return (each.channel == channel.id) && (each.text.indexOf('thank') != -1);
  });
}

function createPayload(dataStore, thankYou) {
  var user = dataStore.getUserById(thankYou.user);
  return {
    widgetKey: 'thanks',
    template: 'message',
    payload: {
      username: user.name,
      message: thankYou.text,
      image: helper.highestResolutionForUser(user)
    }
  };
}
