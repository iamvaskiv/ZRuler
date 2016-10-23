chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    file: 'ruler.js'
  });

  chrome.tabs.insertCSS({
    file: 'styles.css'
  });
});
