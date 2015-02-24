var Request = require("sdk/request").Request,
	self = require("sdk/self"),
	tabs = require("sdk/tabs"),
	{Cc,Ci} = require("chrome");
    ch = Cc["@mozilla.org/security/hash;1"]
           .createInstance(Ci.nsICryptoHash);

var convertToMD5 = function(str){
	var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].
	    createInstance(Ci.nsIScriptableUnicodeConverter);

	// we use UTF-8 here, you can choose other encodings.
	converter.charset = "UTF-8";
	// result is an out parameter,
	// result.value will contain the array length
	var result = {};
	// data is an array of bytes
	var data = converter.convertToByteArray(str, result);
	var ch = Cc["@mozilla.org/security/hash;1"]
   		.createInstance(Ci.nsICryptoHash);
	ch.init(ch.MD5);
	ch.update(data, data.length);
	var hash = ch.finish(false);

	// return the two-digit hexadecimal code for a byte
	function toHexString(charCode)
	{
	  return ("0" + charCode.toString(16)).slice(-2);
	}

	// convert the binary hash data to a hex string.
	var s = [toHexString(hash.charCodeAt(i)) for (i in hash)].join("");
	return s;
};


var auth = function(config){
	var config = config,
		token = "",
		session = {user:"", key:""},
		storedSongs=[],
		getToken = function(){
			var signature = createSignature({method:'getToken'});
			console.log('[API] get token');
			!token && Request({
			  	url: config.rootAPIUrl+"?method=auth.getToken&api_key="+config.APIKey
			  	+"&api_sig="+signature+"&format=json",
			  		onComplete: function (response) {
			    		console.log('response', response.json);

			    		token = response.json.token;
			    		openLastFmTab();
			  		}
			}).post();
		},
		createSignature = function(params){
			var map = "api_key"+config.APIKey+"methodauth."+params.method+
				(token?"token"+token:"")+config.secret;
			return convertToMD5(map);
		},
		createSignature2 = function(data){
			var res = "";
			var keys =[];
			for(var key in data)
				keys.push(key);

			keys.sort().forEach(function(id){
				res += id + data[id];
			});
			res += config.secret;
			console.log('createSignature2', res)
			return convertToMD5(res);
		},
		createBody= function(data){
			var res = "";
			var keys =[];
			for(var key in data)
				keys.push(key);

			keys.sort().forEach(function(id){
				res += id + "=" + data[id] + "&";
			});

			console.log('createBody', res)
			return res;
		},
		createAPIUrl=function(params){
			return;
		},
		openLastFmTab = function(){
			tabs.open({
		  		url: self.data.url("http://www.last.fm/api/auth/?api_key="+config.APIKey+"&token="+token)
			});	
		//	getSession();	
		},
		getSession = function(song){
			var signature = createSignature({method:'getSession'});
			
			// console.log('[API] get session', config.rootAPIUrl+"?method=auth.getSession&api_key="+config.APIKey+
			//   	"&token="+token+"&api_sig="+signature+"&format=json");

			// var scrobbleSign = createSignature({method:'track.scrobble'})


			// console.log('[API] get track', config.rootAPIUrl+"?method=track.scrobble&api_key="+config.APIKey+
			//   	"&token="+token+"&api_sig="+scrobbleSign+"&format=json&sk=");
			Request({
			  	url: config.rootAPIUrl+"?method=auth.getSession&api_key="+config.APIKey+
			  	"&token="+token+"&api_sig="+signature+"&format=json",
			  		onComplete: function (response) {
			    		session.key = response.json.session.key
						scrobbleTrack(song);
			  		}
			}).get();
		},
		scrobbleTrack = function(song){
					var body = {"artist":song['author'],
						"track":	song['name'],
						"timestamp": parseInt(song['timestamp']/1000),
						"api_key":config.APIKey,
						"method":"track.scrobble",
						"sk":session.key
					};
			var signature = createSignature2(body);
	

			body["format"] = "json";
			body["api_sig"] = signature;


			console.log("BOOOM",config.rootAPIUrl, createBody(body))
			Request({
			  	url: config.rootAPIUrl,
			  	content:createBody(body),
		  		onComplete: function (response) {
		    		console.log('resp', response.json);
		  		}
			}).post();
		};

	return {
		userAuth:function(){
			getToken();
		},
		// getToken:function(){
		// 	return token;
		// }, 
		getSession:function(){
			createSignature();
		},
		scrobbleTrack:function(song){
			if(session.key)
				scrobbleTrack(song);
			else
				getSession(song);
		}
	}
};


exports.auth = auth;