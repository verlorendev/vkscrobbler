

var	emitSong={track:"", artist:""}; // track - 6, artist -  5 - object ids
var watchLastSong = function(){
		var lastSong = unsafeWindow.audioPlayer && unsafeWindow.audioPlayer.lastSong;

		if(lastSong){
			var comparedSong = setSong({}, lastSong);
			if(checkSongChange(emitSong, comparedSong)){
		 		emitSong = setSong(emitSong, lastSong);

				console.log('new lastSong', interval, emitSong);
				self.port.emit("setSong", emitSong);
			}
		}
	},
	setSong = function(song, lastSong){
		song['track'] =  lastSong[6];
	 	song['artist'] = lastSong[5];
	 	return song;
	},
	copySong = function(){

	},
	checkSongChange = function(oldSong, newSong){

	//	return oldSong.name!=newSong.name || oldSong.author!=newSong.author;
		return ["track"].every(function(el){
			return newSong[el] !== oldSong[el];
		})
	};



var interval;

var setWatchInterval = function(){
	interval = window.setInterval(watchLastSong, 3000)
}

// self.port.on("stopSong", function(song) {
// 	// if(checkSongChange(emitSong, song))
// 	// 	clearWatchInterval();
// 	// else
// 	console.log('gotSong',interval,  song);


// });

setWatchInterval();
