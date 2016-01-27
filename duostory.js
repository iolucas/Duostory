var duostory = {}

var TimeEventHandler = function() {

	var timeEvents = [];

	var timeEventsArr;
	var timesArr;
	var timeIndex = 0;

	var lastTime;

	var intervalRef;
	//Implement last time to remove the interval callback

	this.start = function(evaluateTimeFunc, period) {

		//If any time event has been signed
		if(timesArr) {
			intervalRef = setInterval(function() {

				var currTime = evaluateTimeFunc.call();

				if(currTime >= timesArr[timeIndex])
					timeEventsArr[timeIndex++]();

				if(currTime >= lastTime)
					clearInterval(intervalRef);

			}, period);
		}
	}

	this.on = function(time, callback) {
		timeEvents[time] = callback;	

		//Reorganize time events queue
		var sortArr = [];
		//Get all the times
		for(t in timeEvents) {
			sortArr.push(t);
		}	

		//Get the times ordered array
		timesArr = sortArr.sort(function(a,b){
			if(parseFloat(a) > parseFloat(b))
				return 1;

			return -1;
		});

		//Reset the time callbacks queue
		timeEventsArr = [];

		for(var i = 0; i < timesArr.length; i++)
			timeEventsArr.push(timeEvents[timesArr[i]]);

		lastTime = timesArr[timesArr.length-1];
	}
}


duostory.player = new function() {



	var timeEventHandler = new TimeEventHandler();

	this.onTime = function() {
		return timeEventHandler.on.apply(this, arguments);
	}






	this.play;
	this.pause;	

	







	var eventHandler = new EventHandler();

	var duostoryContainer = d3.select("#duostory-conteiner");
	var ytPlayer;

	if(duostoryContainer.empty())
		throw "Duostory container not found.";

	duostoryContainer.append("div").attr("id", "yt-player");
	duostoryContainer.append("div").attr("id", "ds-interactive");

	this.youtubeReady = function() {
		ytPlayer = new YT.Player('yt-player', {
			height: '390',
			width: '640',
			videoId: 'nCqRkL4PTN0',
			events: {
				'onReady': function(event) { 

					timeEventHandler.start(function() {
						return ytPlayer.getCurrentTime();
					}, 100);

				},
				'onStateChange': function(event) { 
					switch(event.data) {
						case -1:
							eventHandler.fire('notStarted');
							break;	

						case YT.PlayerState.ENDED:
							eventHandler.fire('ended');
							break;

						case YT.PlayerState.PLAYING:
							eventHandler.fire('playing');
							break;

						case YT.PlayerState.PAUSED:
							eventHandler.fire('paused');
							break;

						case YT.PlayerState.BUFFERING:
							eventHandler.fire('buffering');
							break;

						case YT.PlayerState.CUED:
							eventHandler.fire('videoReady');
							break;								
					}

				},
				'onPlaybackRateChange': function(event) { eventHandler.fire('playbackRateChange', event); },
				'onPlaybackQualityChange': function(event) { eventHandler.fire('playbackQualityChange', event); },
				'onError': function(event) { eventHandler.fire('error', event); }
			}
		});
	}
}



function onYouTubeIframeAPIReady() {
	duostory.player.youtubeReady();
}
