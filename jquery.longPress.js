/**
 * jQuery long press plugin
 *
 * to trigger long mouse press on selected DOM elements.
 *
 * //TODO(hoatle): check on touch screen
 *
 * Usage:
 *
 * $(selector).longPress([opts], onStartFn, [onStopFn]);
 *
 * For example:
 *
 * $('.next').longPress(function(ctx) {
 *     console.log('long press is started!');
 * }, function(ctx) {
 *     console.log('long press is stopped after: ' + ctx.getDuration() + ' ms');
 * });
 *
 * @author hoatle
 * @date   2014-03-19
 */

(function ($, window) {

  var
      defaults = {
        triggerAfter: 500 //trigger start long press after 500 mili-seconds
      };

  /**
   * APIs:
   *
   * $(selector).longPress(fn);
   * $(selector).longPress(fn, fn);
   * $(selector).longPress(obj, fn);
   * $(selector).longPress(obj, fn, fn);
   *
   * @param options
   * @param onStartFn
   * @param onStopFn
   */
  $.fn.longPress = function(options, onStartFn, onStopFn) {

    (function() {

      if ($.isFunction(options)) {
        onStopFn = onStartFn;
        onStartFn = options;
        options = {};
      }

      var settings = $.extend(defaults, options),
          ctx = {
            getDuration: function() {
              return new Date().getTime() - startAt;
            }
          },
          startAt = 0, pressTimer, running = false;

      function mouseDown() {
        pressTimer = window.setTimeout(function() {
          running = true;
          startAt = new Date().getTime();
          onStartFn.call(this, ctx);
        }, settings.triggerAfter);
      }

      function mouseUp() {
        window.clearTimeout(pressTimer);
        if (running) {
          running = false;
          onStopFn && onStopFn.call(this, ctx);
        }
      }

      $(this).mousedown(mouseDown).mouseup(mouseUp);

      // the case when user mouseDown on an element, but move mouse ouf of it, then mouse up
      // this fallback could take longer time after mouse up out of the element
      $(this).mouseout(mouseUp);

    }).call(this);

  }

})(jQuery, window);
