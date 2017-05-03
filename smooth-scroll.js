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
/*    defaultScroll = { // For reference
        'start_x': window.pageXOffset,
        'end_x': x,
        'start_y': window.pageYOffset,
        'end_y': y,
        'count': 0,
        'resize': false,
        'timer': undefined,
        'options': {}
      },*/
      activeScroll = {};

  /* Public methods */
  self.scrollToElement = function(el, options) {
    var position = getElementPosition(el);
    options = options || {};
    options['element'] = el; // Remember the target element
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
    step = options['step'] || defaultOptions['step'];
    activeScroll = {
      'start_x': window.pageXOffset,
      'end_x': x,
      'start_y': window.pageYOffset,
      'end_y': y,
      'count': 0,
      'resize': false,
      'timer': undefined,
      'options': {
        'duration': Math.ceil(Math.max(
                        options['duration'] || defaultOptions['duration'],
                        10) / step) * step,
        'step': step,
        'element': options['element'] || defaultOptions['element']
      }
    };
    activeScroll['timer'] = window.setInterval(timerTick,
                                               activeScroll.options['step']);
    // Capture resize events to move along with elements
    if (activeScroll.options['element']) {
      window.addEventListener('resize', resizeEvent);
    }
    return self;
  };

  self.finish = function() {
    if (activeScroll['timer']) { // Scroll immediately to the end
      window.scrollTo(activeScroll['end_x'], activeScroll['end_y']);
    }
    return self.cancel();
  };

  self.cancel = function() {
    var timer = activeScroll['timer'];
    if (timer) { // Cancel timer if it exists
      window.clearInterval(timer);
      activeScroll['timer'] = undefined;
      if (activeScroll.options['element']) {
        window.removeEventListener('resize', resizeEvent);
      }
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
    return {x: Math.max(window.pageXOffset + position.left +
                            // Center element horizontally
                            position.width / 2 - window.innerWidth / 2, 0),
            y: window.pageYOffset + position.top
           };
  };

  var timerTick = function() {
    var halfDuration = activeScroll.options['duration'] / 2,
        // Distance to midpoint (signed)
        countDifference = halfDuration - activeScroll['count'],
        // Percentage of scroll on logarithmic scale (-100% to 100%)
        countPercentage = (Math.log(Math.abs(countDifference)) /
                           Math.log(halfDuration) * Math.sign(countDifference)),
        countCurrent, halfX, halfY, position;
    // Update scroll target on resize events
    if (activeScroll['resize']) {
      position = getElementPosition(activeScroll.options['element']);
      activeScroll['end_x'] = position.x;
      activeScroll['end_y'] = position.y;
      activeScroll['resize'] = false;
    }
    halfX = (activeScroll['end_x'] - activeScroll['start_x']) / 2,
    halfY = (activeScroll['end_y'] - activeScroll['start_y']) / 2;
    window.scrollTo(activeScroll['start_x'] + halfX - halfX * countPercentage,
                    activeScroll['start_y'] + halfY - halfY * countPercentage);
    countCurrent = (activeScroll['count'] += activeScroll.options['step']);
    if (countCurrent > activeScroll.options['duration']) {
      self.finish(); // End after the duration has been hit
    }
  };

  var resizeEvent = function() {
    activeScroll['resize'] = true;
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
  };
  document.addEventListener('DOMContentLoaded', documentLoaded, true);
  documentLoaded();
};