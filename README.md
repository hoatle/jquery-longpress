jquery.longPress
================

jQuery long mouse press plugin to trigger long mouse press on selected DOM elements.


Usage
-----

```js
$(selector).longPress([opts], onStartFn, [onStopFn]);
```

Example
-------

```js
$('.next').longPress(function(ctx) {
    console.log('long press is started!');
}, function(ctx) {
    console.log('long press is stopped after: ' + ctx.getDuration() + ' ms');
})
```