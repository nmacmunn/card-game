/* global Helpers, BaseCard */
(function() {

'use strict';

var d = BaseCard.helpers.distribution;

function Instrument() {
  this.type = 'Instrument';

  this._cashCost = Helpers.random(100, 1000, 10);
  this._timeCost = Helpers.random(0.25, 12, 0.25);
  this._healthCost = Helpers.random(0, 10, 1);

  this._cashValueDistribution = d(0, 0, 0);
  this._timeValueDistribution = d(0, 0, 0);
  this._healthValueDistribution = d(0, 0, 0);

  this._baseCashYield = 0;
  this._cashYieldDistribution = d(0, 0, 0);

  this._baseTimeYield = 0;
  this._timeYieldDistribution = d(0, 0, 0);

  this._baseHealthYield = 0;
  this._healthYieldDistribution = d(0, 0, 0);

  BaseCard.apply(this);
}
Instrument.prototype = Object.create(BaseCard.prototype);

window.Instrument = Instrument;

}());
