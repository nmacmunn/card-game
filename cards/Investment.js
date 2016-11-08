/* global BaseCard, Helpers */
(function() {

'use strict';

var d = BaseCard.helpers.distribution;

var types = [
  'Growth',
  'Balanced',
  'Income'
];

function Investment() {
  this.type = "Investment";

  var type = types[Helpers.random(0, 2, 1)];
  var minReturn, maxReturn, returnOrder, dividendYield;

  this._cashCost = Helpers.random(100, 10000, 100);
  this._timeCost = 0;
  this._healthCost = 0;

  if (type === 'Growth') {
    minReturn = 0;
    maxReturn = 2;
    returnOrder = 2;
    dividendYield = 0;
  } else if (type === 'Balanced') {
    minReturn = 0.75;
    maxReturn = 1.1;
    returnOrder = 1;
    dividendYield = Helpers.random(0, 0.03, 0.01);
  } else if (type === 'Income') {
    minReturn = 1;
    maxReturn = 1;
    returnOrder = 0;
    dividendYield = Helpers.random(0.01, 0.1, 0.01);
  }

  this._cashValueDistribution = d(minReturn, maxReturn, returnOrder);
  this._timeValueDistribution = d(1, 1, 1);
  this._healthValueDistribution = d(1, 1, 1);

  this._baseCashYield = this._cashCost * dividendYield;
  this._cashYieldDistribution = d(1, 1, 0);

  this._baseTimeYield = 0;
  this._timeYieldDistribution = d(0, 0, 0);

  this._baseHealthYield = 0;
  this._healthYieldDistribution = d(0, 0, 0);

  this._description = `${type} investment with ${(dividendYield * 100).toFixed(0)}% dividend`;

  BaseCard.apply(this);
}

Investment.prototype = Object.create(BaseCard.prototype);

window.Investment = Investment;

}());
