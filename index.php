<?php
function getTimeURI($path) {
  # Append the file modified time to the script name to prevent using cached resources
  $timestamp = base_convert(filemtime($path), 10, 36);
  return "$path?$timestamp"; 
}
?><!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <script src="<?php echo getTimeURI('smooth-scroll.js'); ?>"></script>
  <style type="text/css">
.scrollRow {
  display: table;
  text-align: center;
  vertical-align: middle;
  width: 300vh;
}
.scrollRow > div {
  display: table-cell;
  height: 100vh;
  width: 100vh;
}
#cell2, #cell4, #cell6, #cell8 {
  background-color: #d3d3d3;
}
  </style>
</head>
<body>
  <div class="scrollRow">
    <div id="cell1">
      1<br />
      <a href="#cell4" data-smooth-scroll-hash="true">Down 1</a><br />
      <a href="#cell7" data-smooth-scroll-hash="true">Down 2</a>
    </div>
    <div id="cell2">
      2<br />
      <a href="#cell5" data-smooth-scroll-hash="true">Down 1</a><br />
      <a href="#cell7" data-smooth-scroll-hash="true">Left 1, Down 2</a><br />
    </div>
    <div id="cell3">
      3<br />
      <a href="#cell1" data-smooth-scroll-hash="true">Left 2</a><br />
      <a href="#cell5" data-smooth-scroll-hash="true">Left 1, Down 1</a><br />
    </div>
  </div>
  <div class="scrollRow">
    <div id="cell4">
      4<br />
      <button data-smooth-scroll-to="cell1" data-smooth-scroll-duration="3000">Up 1, 3 sec</button><br />
      <button data-smooth-scroll-to="cell7">Down 1</button>
    </div>
    <div id="cell5">
      5<br />
      <button data-smooth-scroll-to="cell2" data-smooth-scroll-duration="3000">Up 1, 3 sec</button><br />
      <button data-smooth-scroll-to="cell7">Left 1, Down 1</button>
    </div>
    <div id="cell6">
      6<br />
      <button data-smooth-scroll-to="cell3" data-smooth-scroll-duration="3000">Up 1, 3 sec</button><br />
      <button data-smooth-scroll-to="cell4">Left 2</button>
    </div>
  </div>
  <div class="scrollRow">
    <div name="cell7">
      7<br />
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