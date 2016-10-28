chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    file: 'app.js'
  });

  chrome.tabs.insertCSS({
    file: 'styles.css'
  });
});
