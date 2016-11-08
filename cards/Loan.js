/* global BaseCard, Helpers */
(function() {

  'use strict';

  var d = BaseCard.helpers.distribution;

  function Loan() {
    this.type = 'Loan';

    var amount = Helpers.random(100, 10000, 100);

    this._cashCost = -amount;
    this._timeCost = 0;
    this._healthCost = 0;

    this._cashValueDistribution = d(1, 1, 1);
    this._timeValueDistribution = d(1, 1, 1);
    this._healthValueDistribution = d(1, 1, 1);

    var interest = Helpers.random(0, 0.2, 0.01);
    var payment = amount * interest;

    this._baseCashYield = Helpers.random(-payment, -payment, 1);
    this._cashYieldDistribution = d(1, 1, 0);

    this._baseTimeYield = 0;
    this._timeYieldDistribution = d(0, 0, 0);

    this._baseHealthYield = 0;
    this._healthYieldDistribution = d(0, 0, 0);

    this._description = `Loan at ${(interest * 100).toFixed(0)}%`;

    BaseCard.apply(this);

    this._replayable = false;
  }
  Loan.prototype = Object.create(BaseCard.prototype);

  window.Loan = Loan;

}());
