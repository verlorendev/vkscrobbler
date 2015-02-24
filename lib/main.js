var buttons = require('sdk/ui/button/action'),
	tabs = require("sdk/tabs"),
	self = require("sdk/self"),
	pageMod = require("sdk/page-mod");

var authService = require("authService.js");

var scrobbledSong;
var Config ={
	// enter apiKey and secret

		rootAPIUrl: "http://ws.audioscrobbler.com/2.0/"
	};

var auth = new authService.auth(Config);
// var loginLastFM = require("sdk/panel").Panel({
//   contentURL: self.data.url("http://www.last.fm/api/auth/?api_key="+Config.APIKey)
// });


var button = buttons.ActionButton({
  id:'login-form',
  label: "Log to last.fm",
  icon: {
	"16": "./icon-16.png",
	"32": "./icon-32.png",
	"64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
//	loginLastFM.show();
	auth.userAuth();
	// tabs.open({
 //  		url: self.data.url("http://www.last.fm/api/auth/?api_key="+Config.APIKey+"&cb=http://set")
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
	
		scrobbledSong['timestamp'] = new Date().getTime();
			console.log('gotedSong', scrobbledSong);
		auth.scrobbleTrack(scrobbledSong);
	});

  },
  attachTo: 'top',
  contentScriptWhen: 'ready'
});


