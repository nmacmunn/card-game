/* global Status, View */
(function() {

'use strict';

var status = new Status();
var view = new View(status);
var timer;
var auto;
var rate = 5;

function cardClick(el, e) {
  var card = el.data;
  if (e.target.classList.contains('dismiss')) {
    status.removeCard(card);
  } else {
    status.toggleCard(card);
  }
  view.update();
}

function dieClick() {
  var roll = Math.ceil(Math.random() * 6);
  status.update(roll);
  view.update();

  clearTimeout(timer);

  if (!status.gameOver && auto) {
    timer = setTimeout(dieClick, rate * 1000);
  }
}

function autoRollChange(el) {
  auto = el.checked;
}

function autoRateChange(el) {
  rate = el.value;
}

var clickHandlers = {
  '.card': cardClick,
  '#die': dieClick
};

var changeHandlers = {
  '#autoRoll': autoRollChange,
  '#autoRate': autoRateChange
};

function eventHandler(handlers, e) {
  for (var selector in handlers) {
    var el = e.target.closest(selector);
    if (el) {
      handlers[selector](el, e);
    }
  }
}

document.body.onclick = eventHandler.bind(null, clickHandlers);
document.body.onchange = eventHandler.bind(null, changeHandlers);

view.update();

}());
