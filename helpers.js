(function() {

'use strict';

function random(from, to, increment) {
  var range = to - from;
  if (increment) {
    var val = (range + increment) * Math.random();
    return val - (val % increment) + from;
  }
  return range * Math.random() + from;
}

function bound(min, val, max) {
  return Math.max(min, Math.min(val, max));
}

function distribution(min, max, order) {
  var a = (max - min) / Math.pow(5, order);
  var out = [];
  for (var i = 0; i < 6; i++) {
    out[i] = a * Math.pow(i, order) + min;
  }
  return out;
}

window.Helpers = {
  bound: bound,
  random: random,
  distribution: distribution
};

}());
