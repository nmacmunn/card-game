/* global Phaser */

'use strict';

var strings;

function getText() {
  return game.rnd.pick([
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ]);
}

function getSpeed() {
  return game.rnd.integerInRange(-100, 100);
}

function destroy(string) {
  var tween = game.add.tween(string)
    .to({fontSize: 18}, 500)
    .to({fontSize: 0}, 100, null, false, 500);

  tween.onComplete.addOnce(function() {
    string.kill();
  });
  tween.start();
}

setInterval(function() {

  var string = strings.getFirstDead();
  if (string) {
    string.x = 0;
    string.y = 0;
    string.fontSize = 12;
    string.text = getText();
    string.revive();
  } else if (strings.length < 20) {
    string = game.add.bitmapText(0, 0, 'carrier', getText(), 12);
  } else {
    string = strings.getRandom();
    string.text += getText();
  }

  game.physics.arcade.enable(string);

  string.body.velocity.setTo(getSpeed(), getSpeed());

  strings.add(string);

}, 2000);

var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', {

  preload: function preload() {
    game.load.image('background', 'background.png');
    game.load.image('bullet', 'bullet.png');
    game.load.image('ship', 'ship.png');
    game.load.bitmapFont('carrier', 'carrier.png', 'carrier.xml');
  },

  create: function create() {

    game.add.tileSprite(0, 0, 800, 600, 'background');

    strings = new Phaser.Group(game);

    //  Creates 30 bullets, using the 'bullet' graphic
    this.weapon = game.add.weapon(30, 'bullet');

    //  The bullet will be automatically killed when it leaves the world bounds
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  The speed at which the bullet is fired
    this.weapon.bulletSpeed = 600;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon.fireRate = 100;

    this.sprite = this.add.sprite(400, 300, 'ship');

    this.sprite.anchor.set(0.5);

    game.physics.arcade.enable(this.sprite);

    this.sprite.body.drag.set(70);
    this.sprite.body.maxVelocity.set(200);

    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    this.weapon.trackSprite(this.sprite, 0, 0, true);

    this.cursors = this.input.keyboard.createCursorKeys();


    this.keyBuffer = [];

    this.input.keyboard.addCallbacks(this, null, function(e) {
      if (e.key >= 'a' && e.key <= 'z') {
        this.keyBuffer.push(e.key);
      } else if (e.key === ' ') {
        e.stopPropagation();
        var text = this.keyBuffer.join('');
        strings.forEach(function(string) {
          if (text === string.text) {
            destroy(string);
            // string.kill();
          }
        });
        this.keyBuffer.length = 0;
      }
    });


    // this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
  },

  update: function update() {

    if (this.cursors.up.isDown) {

      game.physics.arcade.accelerationFromRotation(
        this.sprite.rotation,
        300,
        this.sprite.body.acceleration
      );

    } else {

      this.sprite.body.acceleration.set(0);

    }

    if (this.cursors.left.isDown) {

      this.sprite.body.angularVelocity = -300;

    } else if (this.cursors.right.isDown) {

      this.sprite.body.angularVelocity = 300;

    } else {

      this.sprite.body.angularVelocity = 0;

    }

    // if (this.fireButton.isDown) {

    //   this.weapon.fire();

    // }

    var sprite = this.sprite;
    var weapon = this.weapon;

    strings.forEach(function(string) {

      weapon.bullets.forEach(function(bullet) {
        game.physics.arcade.collide(string, bullet, function() {
          string.kill();
          bullet.kill();
        });
      });

      game.physics.arcade.collide(sprite, string, function() {
        console.log('collision');
        // game.paused = true;
        // debugger;
      });

      game.world.wrap(string, 0);

    });

    this.game.world.wrap(this.sprite, 0);
  },

  render: function render() {
    this.weapon.debug();
    // strings.debug();
  }

});








