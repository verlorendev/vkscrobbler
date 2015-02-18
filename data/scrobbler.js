
var lastSong;
var watchLastSong = function(){
	lastSong = unsafeWindow.audioPlayer && unsafeWindow.audioPlayer.lastSong
	console.log('lastSong', interval, lastSong)
};

// var watchLastSong = function(){
// 	unsafeWindow.audioPlayer && 
// 		watch(unsafeWindow.audioPlayer, 'lastSong', function(prop, action, newvalue, oldvalue){
// 		console.log('Song changed', prop, action, newvalue)
// 	});
// };


// var watchAudioPlayer = function(){
// 	unsafeWindow.watch('audioPlayer', function(id, oldValue, newValue){
// 		console.log('audioPlayer is watched');
// 		if(newValue!==undefined){
// 			console.log('newValue', newValue)
// 			unsafeWindow.setTimeout(watchLastSong, 3000)
// 			unsafeWindow.unwatch('audioPlayer');
// 		};
// 	});
// };



var interval = window.setInterval(watchLastSong, 3000)

