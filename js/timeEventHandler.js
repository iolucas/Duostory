var TimeEventHandler = function() {

	var timeEvents = [];

	var timeEventsArr;
	var timesArr;
	var timeIndex = 0;

	var lastIndex;

	var intervalRef;
	
	var evaluateTime;
	var checkPeriod;

	this.config = function(configObj) {

		if(configObj.hasOwnProperty('evaluateTime'))
			evaluateTime = configObj.evaluateTime;

		if(configObj.hasOwnProperty('checkPeriod'))
			checkPeriod = configObj.checkPeriod;	

	}

	this.start = function() {

		//If any time event has been signed
		if(timesArr) {
			intervalRef = setInterval(function() {

				var currTime = evaluateTime.call();

				if(currTime >= timesArr[timeIndex])
					timeEventsArr[timeIndex++]();

				if(timeIndex >= lastIndex) {
					clearInterval(intervalRef);
					timesArr = null;
				}

			}, checkPeriod);
		}
	}

	this.stop = function(){
		clearInterval(intervalRef);
	}

	this.on = function(time, callback) {
		//Convert time to seconds format if need
		var timeFactors = time.split(':');
		if(timeFactors.length == 2) {
			time = parseFloat(timeFactors[0])*60 + parseFloat(timeFactors[1]);
		} else if(timeFactors.length == 2) {
			time = parseFloat(timeFactors[0])*3600 + parseFloat(timeFactors[1])*60 + parseFloat(timeFactors[2]);
		} else {
			time = parseFloat(timeFactors[0]);
		}


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

		lastIndex = timesArr.length;
	}
}
