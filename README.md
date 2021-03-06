# smooth-scroll
Smooth viewport scrolling (IE9+)

## HTML-driven
 #hash links can be made to scroll to the target by adding a single attribute, and other elements can be made click-to-scroll using the same attribute. When scrolling to an element, the end destination is automatically updated when the viewport is resized.  
  
This script supports being loaded `defer`.

#### HTML attributes and possible values
* `data-smooth-scroll-to`
   * (any element id) Designates an element that should scroll when clicked, to the specified element ID
   * `#` - Special value indicating the #hash value indicated by the `href` attribute should be followed

* `data-smooth-scroll-duration`
   * (any integer >= 10) Duration of scroll animation in milliseconds (default: 300)

* `data-smooth-scroll-hash`
   * (Value is ignored) Designates a container of link elements with hash targets. All anchor elements with a `href` value beginning with `#` will automatically be set to `data-smooth-scroll-to="#"`

## Extensible through JavaScript

#### JavaScript API
   Note: For ease of use, all functions that do not return a value return the smoothScroll object (for chaining).  

* `smoothScroll.scrollToElement(<element>, [options])`  
   ex: `smoothScroll.scrollToElement(document.getElementById('fnord'))` or `smoothScroll.scrollToElement(document.getElementById('fnord'), {duration: 2500})`
   * Scrolls the viewport to an element where the element's top is aligned with the top of the viewport and the element is centered horizontally  
   Options is an object that allows the follow attributes, which are case-sensitive:
      * `duration` - Duration of scroll animation in milliseconds (default: 300)
      * `step` - Duration between scroll animation updates in milliseconds (default: 10)
   * See `getHeaderHeightOverride` to prevent element from scrolling behind floating page headers

* `smoothScroll.scrollVertical(<y>, [options])`  
   ex: `smoothScroll.scrollVertical(150)` or `smoothScroll.scrollVertical(150, {duration: 1500})`
   * Scrolls the viewport until `window.pageYOffset` is equal to the y value  
   See `smoothScroll.scrollToElement` for options.

* `smoothScroll.scrollHorizontal(<x>, [options])`  
   ex: `smoothScroll.scrollHorizontal(50)` or `smoothScroll.scrollHorizontal(50, {step: 50})`
   * Scrolls the viewport until `window.pageXOffset` is equal to the x value  
   See `smoothScroll.scrollToElement` for options.

* `smoothScroll.scrollToCoord(<x>, <y>, [options])`  
   ex: `smoothScroll.scrollToCoord(50, 150)` or `smoothScroll.scrollToCoord(50, 150, {duration: 2000, step: 50})`
   * Scrolls the viewport until `window.pageXOffset` is equal to the x value and `window.pageYOffset` is equal to the y value  
   See `smoothScroll.scrollToElement` for options.

* `smoothScroll.finish()`
   * Ends any active scrolling animation by immediately scrolling the viewport (without animation)

* `smoothScroll.cancel()`
   * Ends any active scrolling animation, leaving the viewport where it is (mid-scroll)

* `smoothScroll.unload()`  
   *Made available for debugging*  
   * Removes all scroll events and cancels any active scrolling animation

* `smoothScroll.getHeaderHeightOverride()`  
   * Define this function to a custom function that returns the height, in pixels, of the floating page header so `scrollToElement` does not scroll elements behind the header