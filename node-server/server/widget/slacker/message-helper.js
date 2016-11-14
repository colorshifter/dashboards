module.exports = {
  sortByTimestamp: sortMessagesByTimestamp,
  sortByCount: sortByMessagesLength,
  flattenToUser: flattenToUser,
  flattenToChannel: flattenToChannel,
  highestResolutionForUser: highestResolutionForUser
}

function sortMessagesByTimestamp(a, b) {
  return b.ts - a.ts;
}

function sortByMessagesLength(a, b) {
  return b.messages.length - a.messages.length;
}

function flattenToUser(messages) {
  return flattenMessages(messages, 'user');
}

function flattenToChannel(messages) {
  return flattenMessages(messages, 'channel');
}

function flattenMessages(messages, flattenKey) {
  var dict = {};
  messages.forEach(each => {
    if(dict[each[flattenKey]]) {
      dict[each[flattenKey]].push(each);
    } else {
      dict[each[flattenKey]] = [each];
    }
  });
  return Object.keys(dict).map(key => {
      return {
        key: key,
        messages: dict[key]
      }
    });
}

function highestResolutionForUser(user) {
  var profile = user.profile;
  var sizes = ['512', '192', '72', '48', '32', '24'];
  var i = 0;
  while (i < sizes.length && profile['image_' + sizes[i]] == null) {
    i++;
  }
  return i >= sizes.length ? null : profile['image_' + sizes[i]];
}
