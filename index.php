<?php

	$appId = $_GET['app'];

?>

<html>
	<title>Duostory</title>
	<link rel="stylesheet" href="<?php echo 'apps/' . $appId . '/style.css' ?>">
  	<body>
  		<div style="text-align:center">
	    	<div id="ds-player"></div>
	    	<?php include 'apps/' . $appId . '/view.html' ?>
  		</div>
  		<pre>
  			check next steps
			verify whether is right to change the project again
			create modules for code classes, music teaching, language teaching
			user google caja
		</pre>

	    <script src="js/eventhandler.js" charset="utf-8"></script>
	    <script src="js/timeEventhandler.js" charset="utf-8"></script>
	    <script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
	    <script src="js/duostory.js"></script>
	    <script src="https://www.youtube.com/iframe_api"></script>
	    
	    <script src="<?php echo 'apps/' . $appId . '/script.js' ?>"></script>
  	</body>
</html>