/* global doT, Card */
(function() {

'use strict';

var templates = Array.prototype.slice.call(document.getElementsByTagName('template'))
  .reduce((templates, fragment) => {
    var compiler = doT.template(fragment.innerHTML);
    var t = document.createElement('template');
    var name = fragment.getAttribute('name');
    templates[name] = function(data) {
      var str = compiler(data);
      t.innerHTML = str;
      var elem = t.content.children[0];
      elem.data = data;
      return elem;
    };
    return templates;
  }, {});


function View(status) {
  var self = this;
  this.model = status;
  this.state = {};

  document.querySelectorAll('[id]').forEach(function(el) {
    this[el.id] = el;
  }, this);

  this.typeFilter.onchange = function(e) {
    self.state.typeFilter = e.target.value;
    self.update();
  };
}

function empty(node) {
  while(node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

View.prototype.update = function() {

  if (this.model.gameOver) {
    document.body.classList.add('gameover');
  }

  empty(this.status);
  this.status.appendChild(templates.status(this.model));

  empty(this.played);
  empty(this.opportunities);
  this.model.cards.forEach(model => {
    var card = templates.card(model);
    if (model.played && model.type === this.state.typeFilter) {
      if (!this.model.unplayable(model)) {
        card.classList.add('disabled');
      }
      this.played.appendChild(card);
    } else if (!model.played && model.type === this.state.typeFilter) {
      if (!this.model.playable(model)) {
        card.classList.add('disabled');
      }
      this.opportunities.appendChild(card);
    }
  }, this);

  empty(this.typeFilter);
  Card.types.forEach(type => {
    var cards = this.model.cards.filter(card => card.type === type);
    var filter = templates.filter({
      checked: this.state.typeFilter === type,
      played: cards.filter(card => card.played).length,
      total: cards.length,
      name: 'typeFilter',
      value: type
    });
    this.typeFilter.appendChild(filter);
  });
};

window.View = View;

}());
