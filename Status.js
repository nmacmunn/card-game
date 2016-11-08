/* global Card, Helpers, Education */
(function() {

'use strict';

function Status() {
  this.cash = 500;
  this._time = 15;
  this._health = 100;
  this.level = 0;
  this.age = 11;

  this.cards = Card.unlock(this);

  this.updateLast();
}

Status.prototype = {

  // get ageBonus() {
  //   return (50 - this.age) / 4;
  // },

  get agePenalty() {
    return this.age / 10;
  },

  get cashChange() {
    return this.cash - this._lastCash;
  },

  get costOfLiving() {
    if (this.age < 18) {
      return (this.age - 11) * 500;
    } else if (this.age < 24) {
      return 10000 + (this.age - 18) * 1000;
    } else if (this.age < 60) {
      return 30000 + (this.age - 24) * 1000;
    } else {
      return 40000;
    }
  },

  get costOfLivingChange() {
    return this.costOfLiving - this._lastCostOfLiving;
  },

  get gameOver() {
    return this.health === 0 || this.cash < 0;
  },

  get health() {
    return this._health;
  },

  set health(val) {
    this._health = Helpers.bound(0, val, 100);
  },

  get healthChange() {
    return this.health - this._lastHealth;
  },

  get netWorth() {
    return this.cards.reduce((net, card) => {
      return card.played ? net + card.cashValue(0) : net;
    }, this.cash);
  },

  get netWorthChange() {
    return this.netWorth - this._lastNetWorth;
  },

  get sleepPenalty() {
    var minSleep = 10;
    if (this.age > 18) {
      minSleep --;
    }
    if (this.age > 24) {
      minSleep--;
    }
    return Math.max(0, minSleep - this.time) * 10;
  },

  get time() {
    return this._time;
  },

  set time(val) {
    this._time = Helpers.bound(0, val, 24);
  },

  get timeChange() {
    return this._time - this._lastTime;
  }

};

Status.prototype.updateLast = function() {
  this._lastCash = this.cash;
  this._lastTime = this.time;
  this._lastHealth = this.health;
  this._lastNetWorth = this.netWorth;
  this._lastCostOfLiving = this.costOfLiving;
};


Status.prototype.update = function(roll) {

  this.roll = roll;
  this.updateLast();

  var len = this.cards.length;
  var health = this.health;

  while (len--) {

    var card = this.cards[len];

    card.tick(roll);

    if (card.expired) {
      this.removeCard(card);
      continue;
    }

    if (!card.played) {
      continue;
    }

    this.cash += card.cashYield(roll);
    this.time += card.timeYield(roll);
    health += card.healthYield(roll);

  }

  health -= this.agePenalty;
  health -= this.sleepPenalty;
  // health += this.ageBonus;

  this.health = health;

  this.cash -= this.costOfLiving;

  var draw = Helpers.bound(1, this.level, 3);

  Card.unlock(this).forEach(card => this.cards.push(card), this);

  for (var i = 0; i < draw; i++) {
    let card = Card.random(this);
    if (card) {
      this.cards.push(card);
    }
  }

  this.age++;

};

Status.prototype.removeCard = function(card) {
  var i = this.cards.indexOf(card);
  if (i === -1) {
    return;
  }
  this.unplayCard(card);
  this.cards.splice(i, 1);
};

Status.prototype.playCard = function(card) {
  if (!this.playable(card)) {
    return;
  }
  this.cash -= card.cashCost;
  this.time -= card.timeCost;
  this.health -= card.healthCost;
  card.played = true;
};

Status.prototype.playable = function(card) {
  return !card.played && card.life && card.cashCost <= this.cash &&
    card.timeCost <= this.time;
};

Status.prototype.unplayCard = function(card) {
  if (!this.unplayable(card)) {
    return;
  }
  if (card.type === 'Education' && !card.life) {
    this.level++;
  }
  this.cash += card.cashValue(0);
  this.time += card.timeValue(0);
  this.health += card.healthValue(0);
  card.played = false;
};

Status.prototype.unplayable = function(card) {
  return card.played && (card.unplayable || !card.life);
};

Status.prototype.toggleCard = function(card) {
  if (card.played) {
    this.unplayCard(card);
  } else {
    this.playCard(card);
  }
};

window.Status = Status;


}());
