var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var pageMod = require("sdk/page-mod");

var scrobbledSong;

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


tabs.open({
  url: self.data.url("https://vk.com")
});

pageMod.PageMod({
  include: ["*.vk.com", "*.vkontakte.ru"],
  contentScriptFile: self.data.url("scrobbler.js"),
  onAttach:function(worker){

	worker.port.on("setSong", function(song) {
		scrobbledSong = song;
		console.log('gotedSong', scrobbledSong);
	});

  },
  attachTo: 'top',
  contentScriptWhen: 'ready'
});
