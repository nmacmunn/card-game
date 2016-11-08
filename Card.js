/* global Helpers, Education, Job, Investment, Loan, Wellness */
(function() {

'use strict';

var lemonade = new Investment();
lemonade._description = 'Lemonade Stand';
lemonade._cashCost = 100;
lemonade._timeCost = 4;
lemonade._baseCashValue = 100;
lemonade._baseCashYield = 1000;
lemonade._baseTimeValue = 4;
lemonade._cashValueDistribution = [1, 0.5, 0.6, 0.7, 0.8, 1, 2];
lemonade._cashYieldDistribution = [1, -0.5, -0.1, 0.1, 0.5, 1.5, 3.0];
lemonade._expiry = 2;
lemonade._life = 2;
lemonade.requirements = [];

var middleSchool = new Education();
middleSchool._description = 'Middle School Education';
middleSchool._baseCashValue = 0;
middleSchool._baseTimeValue = 8;
middleSchool._cashCost = 0;
middleSchool._timeCost = 8;
middleSchool.played = true;
middleSchool._life = 3;
middleSchool._unplayable = false;
middleSchool.requirements = [];

var littleLeague = new Wellness();
littleLeague._description = 'Play little league';
littleLeague._timeCost = 1;
littleLeague._cashCost = 100;
littleLeague._baseCashYield = -100;
littleLeague.requirements = [];

var allowance = new Job();
allowance._timeCost = 1;
allowance._baseTimeValue = 1;
allowance.hourly = 3;
allowance._description = `Make your bed and do the dishes for $${allowance.hourly}/hour`;
allowance.played = true;
allowance._life = 7;
allowance._unplayable = false;
allowance.requirements = [];

var highSchool = new Education();
highSchool._description = 'High School Education';
highSchool._baseTimeValue = 10;
highSchool._baseCashValue = 0;
highSchool._cashCost = 0;
highSchool._timeCost = 10;
highSchool._life = 4;
highSchool._expiry = Infinity;
highSchool.requirements = [
  status => status.level >= 1
];

var fastFood = new Job();
fastFood.hourly = 7;
fastFood._description = `Flipping burgers at $${fastFood.hourly}/hour`;
fastFood.requirements = [
  status => status.level >= 1
];

var locked = [
  middleSchool,
  allowance,
  lemonade,
  littleLeague,
  highSchool,
  fastFood
];

function randomTypes(spec) {
  var types = [];

  if (spec.level > 0) {
    types = [Job];
  }

  if (spec.level > 1) {
    types = [Job, Education];
  }

  if (spec.age > 18) {
    types = [Job, Education, Loan, Investment, Wellness];
  }

  return types;
}

function random(spec) {
  var types = randomTypes(spec);
  if (!types.length) {
    return;
  }
  var i = Helpers.random(0, types.length - 1, 1);
  return new types[i](spec);
}

function unlock(status) {

  var len = locked.length;
  var unlocked = [];

  function satisfies(requirement) {
    return requirement(status);
  }

  while (len--) {
    if (locked[len].requirements.every(satisfies)) {
      unlocked.push(locked[len]);
      locked.splice(len, 1);
    }
  }

  return unlocked;
}

window.Card = {
  random: random,
  types: [Job, Education, Investment, Wellness, Loan].map(type => type.name),
  unlock: unlock
};

}());
