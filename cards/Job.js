/* global BaseCard, Helpers */
(function() {

'use strict';

var d = BaseCard.helpers.distribution;

var types = [
  'Part-time',
  'Full-time',
  'Professional'
];

function Job(spec) {
  this.type = 'Job';

  var level = Math.min(spec && spec.level || 1, 3);
  var type = types[Helpers.random(1, level, 1) - 1];

  if (type === 'Part-time') {
    this._timeCost = Helpers.random(1, 4, 1);
    this.hourly = Helpers.random(5, 20, 0.5);
  } else if (type === 'Full-time') {
    this._timeCost = Helpers.random(6, 10, 1);
    this.hourly = Helpers.random(8, 40, 1);
  } else if (type === 'Professional') {
    this._timeCost = Helpers.random(8, 12, 1);
    this.hourly = Helpers.random(30, 100, 1);
  }

  this._cashCost = 0;
  this._healthCost = 0;

  this._cashValueDistribution = d(0, 0, 0);
  this._timeValueDistribution = d(1, 1, 1);
  this._healthValueDistribution = d(1, 1, 1);

  this._cashYieldDistribution = d(1, 1, 0);

  this._baseTimeYield = 0;
  this._timeYieldDistribution = d(0, 0, 0);

  this._baseHealthYield = -1;
  this._healthYieldDistribution = d(1, Helpers.random(1, 5, 1), 3);

  this._description = `${type} position at $${this.hourly}/hour`;

  BaseCard.apply(this);

  this._replayable = false;
}
Job.prototype = Object.create(BaseCard.prototype, {

  hourly: {

    get: function() {
      return this._baseCashYield / this._timeCost / 5 / 52;
    },

    set: function(val) {
      this._baseCashYield = val * this._timeCost * 5 * 52;
    }

  }

});

window.Job = Job;

}());
