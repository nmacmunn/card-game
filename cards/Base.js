/* global Helpers */
(function() {

'use strict';

function BaseCard() {

  this._played = false;
  this._expiry = Helpers.random(1, 10, 1);

  this._unplayable = true;
  this._replayable = true;
  this._life = Infinity;

  this._baseCashValue = this.cashCost;
  this._baseTimeValue = this.timeCost;
  this._baseHealthValue = this.healthCost;

  this._level = 1;
}

BaseCard.prototype = {

  constructor: BaseCard,

  get description() {
    return this._description || '';
  },

  get cashCost() {
    return this._cashCost || 0;
  },

  get timeCost() {
    return this._timeCost || 0;
  },

  get healthCost() {
    return this._healthCost || 0;
  },

  get expired() {
    return !this.expiry || !this.life;
  },

  get expiry() {
    return this._expiry;
  },

  get level() {
    return this._level;
  },

  get life() {
    return this._life;
  },

  get played() {
    return this._played;
  },

  set played(val) {
    if (typeof val !== 'boolean') {
      throw new Error('played must be boolean');
    }
    if (val === this._played) {
      return;
    }

    this._played = val;

    if (val) {
      this._baseCashValue = this.cashCost;
      this._baseTimeVlue = this.timeCost;
      this._baseHealthValue = this.healthCost;
    }
  },

  get playable() {
    return !this.played && this.life;
  },

  get unplayable() {
    return this.played && (this._unplayable || !this.life);
  }

};

BaseCard.prototype.tick = function tick(roll) {
  if (this.played) {
    this._baseCashValue = this.cashValue(roll);
    this._baseTimeValue = this.timeValue(roll);
    this._baseHealthValue = this.healthValue(roll);
    this._life--;
    if (!this.replayable) {
      this._expiry = 1;
    }
  } else {
    this._expiry--;
  }
};

function distribution(min, max, order) {
  return [1].concat(Helpers.distribution(min, max, order));
}

function generator(baseName, distributionName) {
  return function(i) {
    var val = 0;
    if (baseName in this) {
      if (distributionName in this) {
        val = this[baseName] * this[distributionName][i];
      } else {
        val = this[baseName];
      }
    }
    return val;
  };
}

BaseCard.prototype.cashValue = generator('_baseCashValue', '_cashValueDistribution');

BaseCard.prototype.timeValue = generator('_baseTimeValue', '_timeValueDistribution');

BaseCard.prototype.healthValue = generator('_baseHealthValue', '_healthValueDistribution');

BaseCard.prototype.cashYield = generator('_baseCashYield', '_cashYieldDistribution');

BaseCard.prototype.timeYield = generator('_baseTimeYield', '_timeYieldDistribution');

BaseCard.prototype.healthYield = generator('_baseHealthYield', '_healthYieldDistribution');

BaseCard.helpers = {
  distribution: distribution,
  generator: generator
};

window.BaseCard = BaseCard;

}());
