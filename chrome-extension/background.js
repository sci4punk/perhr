chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
  let msg = {txt: "perhr user"};
  chrome.tabs.sendMessage(tab.id, msg);
}