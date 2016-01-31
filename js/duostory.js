var duostory = {}

duostory.video = new function() {

	var timeEventHandler = new TimeEventHandler();	//object to handle time related events
	var eventHandler = new EventHandler();	//object to handle all general events
	this.on = function(eventTrigger, callback) {
		if(isNaN(parseInt(eventTrigger)) && eventTrigger.indexOf(':') == -1)
			return eventHandler.on.apply(this, arguments);
		
		return timeEventHandler.on.apply(this, arguments);
	}


	this.youtubeReady = function() {
		ytPlayer = new YT.Player('ds-player', {
			height: '390',
			width: '640',
			videoId: duostory.videoId,
			events: {
				'onReady': function(event) { 
					timeEventHandler.config({
						
						evaluateTime: function() {
						 return ytPlayer.getCurrentTime();
						},

						checkPeriod: 100

					});

				},
				'onStateChange': function(event) { 
					switch(event.data) {
						case -1:
							eventHandler.fire('notStarted');
							break;	

						case YT.PlayerState.ENDED:
							eventHandler.fire('end');
							break;

						case YT.PlayerState.PLAYING:
							timeEventHandler.start();

							eventHandler.fire('play');
							break;

						case YT.PlayerState.PAUSED:
							timeEventHandler.stop();

							eventHandler.fire('pause');
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

	this.play = function() {
		ytPlayer.playVideo.apply(this, arguments);		
	}

	this.pause = function() {
		ytPlayer.stopVideo.apply(this, arguments);
	}
}



function onYouTubeIframeAPIReady() {
	duostory.video.youtubeReady();
}
