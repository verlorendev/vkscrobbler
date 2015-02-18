var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var pageMod = require("sdk/page-mod");

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
   	// tabs.activeTab.attach({
    //   	contentScriptFile: self.data.url("scrobbler.js")
    // });
}

// tabs.on('ready', attachScript);
// tabs.on("activate", attachScript);
//tabs.on('open', attachScript);
tabs.open({
  url: self.data.url("https://vk.com")
});

// tabs.open({
//   url: self.data.url("https://vkontakte.ru")
// });

pageMod.PageMod({
  include: ["*.vk.com", "*.vkontakte.ru"],
  contentScriptFile: self.data.url("scrobbler.js"),
  onAttach:function(worker){
    //  console.log('worker', worker.tab)
  },
      attachTo: 'top',
  contentScriptWhen: 'ready'
});


// function attachScript(tab) {
//   tab.attach({
//     contentScriptFile: self.data.url("scrobbler.js")
//   });
// }

//attachScript(tabs.activeTab);

// var contentScriptString = 'document.body.innerHTML = "<h1>this page has been eaten</h1>";'

// tabs.activeTab.attach({
//   contentScript: contentScriptString
// });
