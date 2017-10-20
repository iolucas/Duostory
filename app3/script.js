duostory.videoId = 'L_rUHt8DzQA';

duostory.video.on('0', function() {
    var ball = d3.select('#svgContainer').append('circle')
        .attr('r',30)
        .attr('cx',250)
        .attr('cy',-15)
        .attr('fill','#00f');

        
    var refreshPeriod = 10;

    var tempoFac = refreshPeriod/1000;

    var acc = 9.8*400;

    var speed = 0;
    var lastSpeed = 0;

    var space = -15;

    var stopCounter = 0;

    var finalSpace = 470;


    var loop = setInterval(function() {

        speed += acc * tempoFac;

        space += speed * tempoFac;


        if(space > finalSpace) {

            speed *= -0.5;

            if(lastSpeed == speed.toFixed(2))
                stopCounter++;
            else {
                lastSpeed = speed.toFixed(2);
                stopCounter = 0;        
            }

            if(stopCounter == 200)
                clearInterval(loop);    
            
            space = finalSpace;
        }        

        ball.attr('cy', space);

    }, refreshPeriod);

});



