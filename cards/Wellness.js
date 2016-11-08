/* global Helpers, BaseCard */
(function() {

'use strict';

var d = BaseCard.helpers.distribution;

function Wellness() {
  this.type = 'Wellness';

  this._cashCost = 0;
  this._timeCost = Helpers.random(1, 4, 1);
  this._healthCost = 0;

  this._cashValueDistribution = d(0, 0, 0);
  this._timeValueDistribution = d(0, 0, 0);
  this._healthValueDistribution = d(0, 0, 0);

  this._baseCashYield = Helpers.random(-10000, -1000, 1000);
  this._cashYieldDistribution = d(1, 1, 1);

  this._baseTimeYield = 0;
  this._timeYieldDistribution = d(0, 0, 0);

  this._baseHealthYield = Helpers.random(1, 10, 1);
  this._healthYieldDistribution = d(1, 1, 1);

  BaseCard.apply(this);
}

Wellness.prototype = Object.create(BaseCard.prototype);

window.Wellness = Wellness;

}());

