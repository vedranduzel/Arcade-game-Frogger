// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
};
// Changes starting x position of the enemy and adds speed after lvl up
Enemy.prototype.update = function(dt) {
    this.x += ((level * 30) + this.speed) * dt  ;
    if (this.x > 600) {
        this.x = Math.floor(Math.random() * 200) - 250;
    };
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

///PLayer class
var Player = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

//Check for collision, remove life, if there are no lives left show game over modal(and change images in the modal)
Player.prototype.update = function(dt) {
for (let enemy of allEnemies) {
    if ((this.y - 21) === enemy.y && (enemy.x + 70 > this.x && enemy.x < this.x + 70)) {
        collisionhappened = true;
        allLives.pop();
        this.x = 303;
        this.y = 498;
        if (allLives.length === 0) {
            gameOver = true;
            document.getElementById("princess").src = "images/char-horn-girl.png";
            document.getElementById("locked").src = "images/locked.png";
            modal.classList.toggle("hide");
            }
        }
    }
//Return the player after he reached the top to the starting point, update score and lvl
    setTimeout(function () {
        if (player.y < 50) {
            player.x = 303;
            player.y = 498;
            reachedthetop = true;
            score += 100;
            level ++;
            showlevel.innerHTML = `Level: ${level}`;
            showscore.innerHTML = `Score: ${score}`;
        }
    }, 750);
//Show orange gem,remove it off screen if it's collected
    if (level >= 2 && orangegemcollected === false) {
        orangegem.x = 122;
        if (orangegem.x === this.x + 21 && orangegem.y === this.y + 24){
            orangegemcollected = true;
            score += 150;
            showscore.innerHTML = `Score: ${score}`;
            orangegem.x = -400;
        }
    }
//Show blue gem,remove it off screen if it's collected
    if (level >= 3 && bluegemcollected === false) {
        bluegem.x = 122;
        if (bluegem.x === this.x + 21 && bluegem.y === this.y + 24){
            bluegemcollected = true;
            score += 250;
            showscore.innerHTML = `Score: ${score}`;
            bluegem.x = -400;
        }
      }
//Show green gem,remove it off screen if it's collected
    if (level >= 4 && greengemcollected === false){
        greengem.x = 21;
        if (greengem.x === this.x + 21 && greengem.y === this.y + 24){
            greengemcollected = true;
            score += 500;
            showscore.innerHTML = `Score: ${score}`;
            greengem.x = -400;
        }
      }
//Show orange gem,remove it off screen if it's collected
      if (level >= 5 && orangegemcollectedB === false) {
          orangegemB.x = 324;
          if (orangegemB.x === this.x + 21 && orangegemB.y === this.y + 24){
              orangegemcollectedB = true;
              score += 150;
              showscore.innerHTML = `Score: ${score}`;
              orangegemB.x = -300;
          }
      }
//Show blue gem,remove it off screen if it's collected
      if (level >= 6 && bluegemcollectedB === false) {
          bluegemB.x = 425;
          if (bluegemB.x === this.x + 21 && bluegemB.y === this.y + 24){
              bluegemcollectedB = true;
              score += 250;
              showscore.innerHTML = `Score: ${score}`;
              bluegemB.x = -300;
          }
      }
//Show green gem,remove it off screen if it's collected
      if (level >= 7 && greengemcollectedB === false){
          greengemB.x = 526;
          if (greengemB.x === this.x + 21 && greengemB.y === this.y + 24){
              greengemcollectedB = true;
              score += 500;
              showscore.innerHTML = `Score: ${score}`;
              greengemB.x = -300;
          }
      }
//Attach the key to the player if it's collected
      if (collisionhappened === true && level >= 9){
          collisionhappened = false;
          keycollected = false;
          key.x = 505;
          key.y = 362;
      }
      if (keycollected === true){
        key.x = this.x;
        key.y = this.y;
      }
};

//Draw the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player's moves and spacebar for restart
Player.prototype.handleInput = function(moving){
        if (moving === "right" && this.x < 500){
                this.x += 101;
                if ((this.y === 249 && this.x + 101 === 202) || (this.y === 249 && this.x + 101 === 404) || (this.y === 249 && this.x + 101 === 606)){
                this.x -= 101;
                }
        }
        else if (moving === "left" && this.x > 100){
            this.x -= 101;
                if ((this.y === 249 && this.x - 101 === 0) || (this.y === 249 && this.x - 101 === 202)){
                this.x += 101;
                }
        }
        else if (moving === "up" && this.y > 0){
            this.y -= 83;
                if ((this.x === 101 && this.y - 83 === 166) ||(this.x === 303 && this.y - 83 === 166) || (this.x === 505 && this.y - 83 === 166)){
                this.y += 83;
                }
        }
        else if (moving === "down" && this.y < 450){
            this.y += 83;
                if ((this.x === 101 && this.y + 83 === 332) ||(this.x === 303 && this.y + 83 === 332) || (this.x === 505 && this.y + 83 === 332)){
                this.y -= 83;
                }
        } else if (moving === "spacebar"){
            restarting();
        }

};

var Rock = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Rock.png';
}

Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

var Lives = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/heart.png';
    this.height = 50;
    this.width = 60;

};
//Draw the hearts
Lives.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.height, this.width);
    };

var Gems = function(x, y, sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.height = 60;
    this.width = 101;
}
//Draw the gems
Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.height, this.width);
    };

var Key = function(x, y, sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.height = 100;
    this.width = 101;
}

Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.height, this.width);
    };
Key.prototype.update = function(dt) {
    if (level >= 9 && keycollected === false){
        this.x = 505;

    if (keycollected === false && this.x === player.x && this.y === player.y + 30){
        keycollected = true;
      }
    }
};

var Boy = function(x, y, sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

Boy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

//Draws the boy at lvl 9, and if key is callected and you reach the boy you win
Boy.prototype.update = function(dt) {
    if (level === 9){
    this.x = 505;
    if (keycollected === true && this.x === player.x && this.y === player.y){
        thewin = true;
        modal.classList.toggle("hide");
        wintext.innerHTML = `Congratulations!!!`;
        wintextB.innerHTML = `You saved the boy. Your score is ${score}.`;
        }
    }
};

// This listens for key presses
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: "spacebar"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//Function to restart the game
function restarting(){
    window.location.reload();
};

const player = new Player(303, 498, 'images/char-princess-girl.png');

const enemyA = new Enemy(-100, 62, 50);
const enemyB = new Enemy(-450, 62, 50);
const enemyC = new Enemy(-100, 145, 150);
const enemyD = new Enemy(-100, 311, 70);
const enemyE = new Enemy(-450, 311, 70);
const enemyF = new Enemy(-300, 394, 150);

const allEnemies = [];
allEnemies.push(enemyA, enemyB, enemyC, enemyD, enemyE, enemyF);

const rockA = new Rock(101, 228);
const rockB = new Rock(303, 228);
const rockC = new Rock(505, 228);

const allRocks = [];
allRocks.push(rockA, rockB, rockC);

const lifeA = new Lives(225, 615);
const lifeB = new Lives(278, 615);
const lifeC = new Lives(331, 615);

const allLives = [];
allLives.push(lifeA, lifeB, lifeC);

const greengem = new Gems(-400, 107, 'images/green-gem.png')
const bluegem = new Gems(-400, 190, 'images/blue-gem.png')
const orangegem = new Gems(-400, 356, 'images/orange-gem.png')
const greengemB = new Gems(-400, 107, 'images/green-gem.png')
const bluegemB = new Gems(-400, 190, 'images/blue-gem.png')
const orangegemB = new Gems(-400, 356, 'images/orange-gem.png')

const allGems = [];
allGems.push(greengem, bluegem, orangegem, greengemB, bluegemB, orangegemB);

const key = new Key(-300, 362, 'images/Key.png');
let keycollected = false;
let collisionhappened = false;

const boy = new Boy (-300, 83, 'images/locked.png')

let score = 0;

var showscore = document.querySelector(".score");
var showlevel = document.querySelector(".level");

let reachedthetop = false;

let level = 1;

let bluegemcollected = false;
let greengemcollected = false;
let orangegemcollected = false;
let bluegemcollectedB = false;
let greengemcollectedB = false;
let orangegemcollectedB = false;

let gameOver = false;

const modal = document.querySelector(".modal_background");

let thewin = false;

const wintext = document.querySelector(".win");
const wintextB = document.querySelector(".winB");
