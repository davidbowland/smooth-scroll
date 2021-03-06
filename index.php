<?php # smooth-scroll.js demonstration page
function getTimeURI($path) {
  # Append the file modified time to the script name to prevent using cached resources
  $timestamp = base_convert(filemtime($path), 10, 36);
  return "$path?$timestamp"; 
}
?><!DOCTYPE html>
<html>
<head>
  <!-- Settings for demonstration only -->
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <!-- Fancy import of smooth-scroll.js, defer is encouraged -->
  <script src="<?php echo getTimeURI('smooth-scroll.js'); ?>" defer></script>
  <!-- Styles for demonstration only -->
  <style type="text/css">
.scrollRow {
  display: table;
  height: 100vh;
  width: 300vh;
  table-layout: fixed;
}
.scrollRow > div {
  display: table-cell;
  text-align: center;
  padding-top: 2.5em;
}
#cell2, #cell4, #cell6, #cell8 {
  background-color: #d3d3d3;
}
  </style>
</head>
<body>
  <!-- Test: data-smooth-scroll-to="#" and data-smooth-scroll-duration -->
  <div class="scrollRow">
    <div id="cell1">
      1<br />
      <!-- Adding data-smooth-scroll-to="#" makes this link scroll smoothly when JavaScript is enabled -->
      <a href="#cell4" data-smooth-scroll-to="#">Down 1</a><br />
      <a href="#cell7" data-smooth-scroll-to="#">Down 2</a>
    </div>
    <div id="cell2">
      2<br />
      <!-- data-smooth-scroll-duration can be used to specify scroll duration, in milliseconds -->
      <a href="#cell5" data-smooth-scroll-to="#" data-smooth-scroll-duration="3000">Down 1, 3 sec</a><br />
      <a href="#cell7" data-smooth-scroll-to="#">Left 1, Down 2</a><br />
    </div>
    <div id="cell3">
      3<br />
      <a href="#cell1" data-smooth-scroll-to="#">Left 2</a><br />
      <a href="#cell5" data-smooth-scroll-to="#">Left 1, Down 1</a><br />
    </div>
  </div>
  <!-- Test: data-smooth-scroll-hash and data-smooth-scroll-duration -->
  <!-- Adding data-smooth-scroll-hash="true" makes all # links in this container scroll smoothly -->
  <div class="scrollRow" data-smooth-scroll-hash="true">
    <div id="cell4">
      4<br />
      <a href="#cell6" data-smooth-scroll-duration="3000">Right 2, 3 sec</a><br />
      <a href="#cell7">Down 1</a>
    </div>
    <div id="cell5">
      5<br />
      <a href="#cell2" data-smooth-scroll-duration="3000">Up 1, 3 sec</a><br />
      <a href="#cell9">Right 1, Down 1</a>
    </div>
    <div id="cell6">
      6<br />
      <a href="#cell3" data-smooth-scroll-duration="3000">Up 1, 3 sec</a><br />
      <a href="#cell8">Left 1, Down 1</a>
    </div>
  </div>
  <!-- Test: data-smooth-scroll-to with ID value and data-smooth-scroll-duration -->
  <div class="scrollRow">
    <div name="cell7">
      7<br />
      <!-- Specify a scroll target by ID using data-smooth-scroll-to -->
      <button data-smooth-scroll-to="cell3" data-smooth-scroll-duration="5000">Up 2, Right 2, 5 sec</button><br />
      <button data-smooth-scroll-to="cell9">Right 2</button>
    </div>
    <div id="cell8">
      8<br />
      <button data-smooth-scroll-to="cell2" data-smooth-scroll-duration="5000">Up 2, 5 sec</button><br />
      <button data-smooth-scroll-to="cell7">Left 1</button>
    </div>
    <div id="cell9">
      9<br />
      <button data-smooth-scroll-to="cell4" data-smooth-scroll-duration="5000">Up 1, Left 2, 5 sec</button><br />
      <button data-smooth-scroll-to="cell3">Up 2</button>
    </div>
  </div>
</body>
</html>