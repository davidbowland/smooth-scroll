/* Smooth Viewport Scrolling (IE 9+)
https://github.com/davidbowland/smooth-scroll */
'use strict';
var smoothScroll = new function() {
  var self = this,
      defaultOptions = {
        'duration': 100, // Duration, in milliseconds, for the page to scroll
        'step': 10, // Duration, in milliseconds, between scroll updates
        'element': undefined // Element scroll is intended to reach
      },
/*    defaultScroll = { // For reference
        'start_x': undefined,
        'end_x': undefined,
        'start_y': undefined,
        'end_y': undefined,
        'count': 0,
        'timer': undefined,
        'options': {}
      },*/
      activeScroll = {};

  /* Public methods */
  self.scrollToElement = function(el, options) {
    var position = el.getBoundingClientRect();
    options = options || {};
    options['element'] = el; // Remember the target element
    return self.scrollToCoord(window.pageXOffset + position.left,
                              window.pageYOffset + position.top, options);
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
    }
    return self;
  };

  self.unload = function() {
    var fields, el, x;
    fields = document.querySelectorAll('[data-smooth-scroll-hash]');
    for (x = 0; el = fields[x]; x++) {
      el.removeEventListener('click', scrollToHash);
    }
    fields = document.querySelectorAll('[data-smooth-scroll-to]');
    for (x = 0; el = fields[x]; x++) {
      el.removeEventListener('click', scrollToClick);
    }
    return self.cancel();
  };

  /* Private functions */
  var attrPresentNotFalse = function(el, attr) {
    var value = el.getAttribute(attr);
    return value && value.toLowerCase() != 'false';
  };

  var timerTick = function() {
    var halfDuration = activeScroll.options['duration'] / 2,
        countDifference = halfDuration - activeScroll['count'] + 1,
        countPercentage = (Math.log(Math.abs(countDifference)) /
                           Math.log(halfDuration) * Math.sign(countDifference)),
        countCurrent,
        halfX = (activeScroll['end_x'] - activeScroll['start_x']) / 2,
        halfY = (activeScroll['end_y'] - activeScroll['start_y']) / 2;
    window.scrollTo(activeScroll['start_x'] + halfX - halfX * countPercentage,
                    activeScroll['start_y'] + halfY - halfY * countPercentage);
    countCurrent = (activeScroll['count'] += activeScroll.options['step']);
    if (countCurrent > activeScroll.options['duration']) {
      self.finish(); // End after the duration has been hit
    }
  };

  var scrollToByString = function(identifier, target) {
    self.scrollToElement(document.getElementById(identifier) ||
            document.getElementsByName(identifier)[0],
        {'duration': target.getAttribute('data-smooth-scroll-duration') });
  };

  var scrollToClick = function(ev) {
    scrollToByString(ev.target.getAttribute('data-smooth-scroll-to'),
                     ev.target);
    ev.preventDefault();
  };

  var scrollToHash = function(ev) {
    scrollToByString(ev.target.hash.slice(1), ev.target);
    ev.preventDefault();
  };

  /* Constructor / on load */
  var documentLoaded = function(ev) {
    var fields, el, x;
    // Register event listeners based on data-smooth-scroll-hash property
    fields = document.querySelectorAll('[data-smooth-scroll-hash]');
    for (x = 0; el = fields[x]; x++) {
      if (el.getAttribute('data-smooth-scroll-hash').toLowerCase() !==
          'false') { // "false" explicitly denies
        el.addEventListener('click', scrollToHash);
      }
    }
    // Register event listeners based on data-smooth-scroll-to property
    fields = document.querySelectorAll('[data-smooth-scroll-to]');
    for (x = 0; el = fields[x]; x++) {
      el.addEventListener('click', scrollToClick);
    }
  };
  document.addEventListener('DOMContentLoaded', documentLoaded, true);
  documentLoaded();
};