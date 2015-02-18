var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var self = require("sdk/self");

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
   	tabs.activeTab.attach({
      	contentScriptFile: self.data.url("scrobbler.js")
    });
}

tabs.on('ready', attachScript);
tabs.on("activate", attachScript);
//tabs.on('open', attachScript);
// tabs.open({
//   url: self.data.url("http://google.com"),
//   onReady: attachScript
// });

function attachScript(tab) {
  tab.attach({
    contentScriptFile: self.data.url("scrobbler.js")
  });
}

//attachScript(tabs.activeTab);

// var contentScriptString = 'document.body.innerHTML = "<h1>this page has been eaten</h1>";'

// tabs.activeTab.attach({
//   contentScript: contentScriptString
// });
