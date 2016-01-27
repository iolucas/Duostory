<html>
  <body>

    <div id="duostory-conteiner"></div>

    <script src="eventhandler.js" charset="utf-8"></script>
    <script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
    <script src="duostory.js"></script>
    <script src="https://www.youtube.com/iframe_api"></script>
    <script>
      duostory.player.onTime('1', function() {
        console.log("teste1");

      });

            duostory.player.onTime('10', function() {
        console.log("teste10");

      });

                  duostory.player.onTime('4', function() {
        console.log("teste4");

      });


                        duostory.player.onTime('3', function() {
        console.log("teste3");

      });


    </script>
  </body>
</html>