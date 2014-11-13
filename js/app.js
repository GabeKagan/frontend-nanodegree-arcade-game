// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y; //It might be nice to refactor this eventually.
    this.speed = (Math.random()*2) + 1;
    //It would be best to compute the width and height from the sprite.
    //However, I'll be using hardcoded values for now since there's only one enemy type.
    this.width = 80;
    this.height = 171; 
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Something like this?
    this.x += dt*100*this.speed; //Replace 100 with "difficulty" later.
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x,y) {
    this.sprite = "images/char-boy.png"; //Eventually replace this with something less... terrifying.
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 171; 
}

Player.prototype.update = function(dt) {
    //Do something!
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(code) {
    //Adjust vertical movement offset so that the player stays in the same relative position on the grid.
    switch (code) {
        case "left":
            if(this.x == 0) { break; } 
            this.x -= 100;
            break;
        case "up":
            this.y -= 84;
            if(this.y <= 0) { this.y = 375}; //If we reach the top, we'll need some victory code.
            break;
        case "right":
            if(this.x == 400) { break; } 
            this.x += 100;
            break;
        case "down": 
            if(this.y == 375) { break; } 
            this.y += 84;
            break;
        //Add new keys as we implement functionality!
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(200,375); //Player spawns at the bottom-center of the playfield.

//Preparation for pushing enemies into the update function.
var allEnemies = [];

setInterval(function () {pushEnemies()}, 1000); //Generates a new enemy every second. 
//Encapsulate this function?
function pushEnemies () {
    /*
    Complicated math! This generates a new Y-coord with one of the following values: 55, 135, 215.
    These correspond to the stone lanes.
    */
    var enemy = new Enemy(-100,(55 + (Math.floor((Math.random() * 3)) * 80) )) 
    allEnemies.push(enemy);
    //Removes enemies from allEnemies when they're off the screen. 
    //It waits until a bug is ~100 pixels off the screen to prevent random disappearances.
    if(allEnemies[0].x >= 600) {allEnemies.shift()};
}

/*A simple bounding box algorithm for collision detection.
  This will have to be modified because the game's graphics
  contain large amounts of vertical whitespace.
  Based off code from:
  http://blog.sklambert.com/html5-canvas-game-2d-collision-detection/

  If I implement powerups, this code will either need to be modified,
  or I may need to implement a different system, perhaps with coordinates.
*/
function checkCollisions() {
    for(var i=0; i <allEnemies.length; i++) //I fear this will be highly inefficient.
    {
        //Comparing the location of the player and each enemy.
        //The Y coordinate check was removed because bugs can only impact from the left and right.
        if (
        player.x < allEnemies[i].x + allEnemies[i].width //I think this is the problem clause.
        && player.x + player.width  > allEnemies[i].x 
        && (player.y - allEnemies[i].y) < 10
        ) //Compensating for imprecisions in the grid?   
        {
            //Move the player back to his original coordinates. We'll do more later.
            player.x = 200;
            player.y = 375;
        }

    }

}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'

    };

    player.handleInput(allowedKeys[e.keyCode]);
});
