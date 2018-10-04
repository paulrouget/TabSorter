'use strict';

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    tabs.sort((a, b) => a.url > b.url ? 1 : -1);
    chrome.tabs.move(tabs.map(tab => tab.id), {index: 0});
    var dupes = [];
    for (var tab of tabs) {
      var url = tab.url.split("#")[0];
      if (tabs.some(t => t != tab && t.url.startsWith(url))) {
        dupes.push(tab.index);
      }
    }
    dupes.filter((v, i, s) => s.indexOf(v) === i);
    chrome.tabs.highlight({tabs: dupes});
  });
});
