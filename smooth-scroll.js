/* Smooth Viewport Scrolling (IE 9+)
https://github.com/davidbowland/smooth-scroll */
'use strict';
var smoothScroll = new function() {
  var self = this,
      defaultOptions = {
        'duration': 300, // Duration, in milliseconds, for the page to scroll
        'step': 10, // Duration, in milliseconds, between scroll updates
        'element': undefined // Element scroll is intended to reach
      },
      start_x, start_y, // Starting viewport top left
      end_x, end_y, // Ending viewport top left
      count = 0, // Steps taken in scroll
      resize = false, // Whether a resize event has occurred
      timer = undefined, // Current timer
      currentOptions = {}; // Scroll options

  /* Public methods */
  self.scrollToElement = function(el, options) {
    var position = getElementPosition(el);
    options = options || {};
    options.element = el; // Remember the target element
    return self.scrollToCoord(position.x, position.y, options);
  };

  self.scrollVertical = function(y, options) {
    return self.scrollToCoord(window.pageXOffset, y, options);
  };

  self.scrollHorizontal = function(x, options) {
    return self.scrollToCoord(x, window.pageYOffset, options);
  };

  self.scrollToCoord = function(x, y, options) {
    var step;
    self.cancel(); // Stop existing scrolling
    options = options || defaultOptions;
    step = options.step || defaultOptions.step;
    // Set starting and ending positions
    start_x = window.pageXOffset;
    start_y = window.pageYOffset;
    end_x = x;
    end_y = y;
    count = 0; // Zero steps have been taken
    resize = false; // Screen has not resized
    currentOptions = {
        'duration': Math.ceil(Math.max(
                        options.duration || defaultOptions.duration,
                        10) / step) * step,
        'step': step,
        'element': options.element || defaultOptions.element
      };
    // Set timer for first scroll
    timer = window.setInterval(timerTick, currentOptions.step);
    // Capture resize events to move along with elements
    if (currentOptions.element) {
      window.addEventListener('resize', resizeEvent); }
    return self;
  };

  self.finish = function() {
    if (timer) { // Scroll immediately to the end
      window.scrollTo(end_x, end_y); }
    return self.cancel();
  };

  self.cancel = function() {
    // Cancel timer if it exists
    if (timer) {
      window.clearInterval(timer);
      timer = undefined;
      if (currentOptions.element) {
        window.removeEventListener('resize', resizeEvent); }
    }
    return self;
  };

  self.unload = function() {
    var fields = document.querySelectorAll('[data-smooth-scroll-to]');
    for (var el, x = 0; el = fields[x]; x++) {
      el.removeEventListener('click', scrollToClick);
    }
    return self.cancel();
  };

  /* Private functions */
  var getElementPosition = function(el) {
    var position = el.getBoundingClientRect();
    // Center element on screen horizontally but not beyond body edge
    return {x: Math.min(Math.max(window.pageXOffset + position.left +
                       position.width / 2 - window.innerWidth / 2, 0),
                   document.body.getBoundingClientRect().width),
            y: window.pageYOffset + position.top
           };
  };

  var timerTick = function() {
    var halfDuration = currentOptions.duration / 2,
        // Distance to midpoint (signed)
        countDifference = halfDuration - count,
        // Percentage of scroll on logarithmic scale (-100% to 100%)
        countPercentage = (Math.log(Math.abs(countDifference)) /
                           Math.log(halfDuration) * Math.sign(countDifference)),
        countCurrent, halfX, halfY, position;
    // Update scroll target on resize events
    if (resize) {
      position = getElementPosition(currentOptions.element);
      end_x = position.x;
      end_y = position.y;
      resize = false;
    }
    halfX = (end_x - start_x) / 2;
    halfY = (end_y - start_y) / 2;
    window.scrollTo(start_x + halfX - halfX * countPercentage,
                    start_y + halfY - halfY * countPercentage);
    countCurrent = (count += currentOptions.step);
    if (countCurrent > currentOptions.duration) {
      self.finish(); // End after the duration has been hit
    }
  };

  var resizeEvent = function() {
    resize = true;
  };

  var scrollToClick = function(ev) {
    var identifier = ev.currentTarget.getAttribute('data-smooth-scroll-to');
    if (identifier == '#') {
      identifier = ev.currentTarget.hash.slice(1); }
    self.scrollToElement(document.getElementById(identifier) ||
            document.getElementsByName(identifier)[0],
        {'duration': ev.currentTarget.getAttribute('data-smooth-scroll-duration') });
    ev.preventDefault();
  };

  /* Constructor / on load */
  var documentLoaded = function(ev) {
    // Register event listeners based on data-smooth-scroll-to property
    var fields = document.querySelectorAll('[data-smooth-scroll-to]');
    for (var el, x = 0; el = fields[x]; x++) {
      el.addEventListener('click', scrollToClick);
    }
    fields = document.querySelectorAll('[data-smooth-scroll-hash] a[href^="#"]');
    for (var el, x = 0; el = fields[x]; x++) {
      el.setAttribute('data-smooth-scroll-to', '#');
      el.addEventListener('click', scrollToClick);
    }
  };
  document.addEventListener('DOMContentLoaded', documentLoaded, true);
  // Invoke documentLoaded immediately if the document is already loaded
  if (document.readyState == 'complete') {
    documentLoaded(); }
};