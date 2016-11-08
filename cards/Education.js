/* global BaseCard, Helpers */
(function() {

'use strict';

var d = BaseCard.helpers.distribution;

function Education() {
  this.type = "Education";

  this._cashCost = Helpers.random(10000, 30000, 1000);
  this._timeCost = Helpers.random(6, 10, 0.5);
  this._healthCost = 0;

  this._cashValueDistribution = d(0, 0, 0);
  this._timeValueDistribution = d(1, 1, 1);
  this._healthValueDistribution = d(1, 1, 1);

  this._baseCashYield = 0;
  this._cashYieldDistribution = d(0, 0, 0);

  this._baseTimeYield = 0;
  this._timeYieldDistribution = d(0, 0, 0);

  this._baseHealthYield = 0;
  this._healthYieldDistribution = d(0, 0, 0);

  this._description = 'Post-secondary Education';

  BaseCard.apply(this);

  this._life = Helpers.random(2, 4, 1);
}
Education.prototype = Object.create(BaseCard.prototype);

window.Education = Education;

}());
