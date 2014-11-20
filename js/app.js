//Enemy and player should probably be made into members of a superclass at one point.   

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
    this.height = 80; //Originally 171, currently being reduced for debug purposes.
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
    this.height = 80; //Also originally 171
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
            if(this.y <= 0) {
             this.y = 375;
             currentScore += 100;
             }; 
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

//Preparation for various useful tasks.
var player = new Player(200,375); //Player spawns at the bottom-center of the playfield.
var allEnemies = []; //An array of enemies for pushEnemies
var pauseState = false; //Stores whether the game is paused or not.
var currentScore = 0; //Earned by playing well, lost by resetting the game.

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
    //This should probably called somewhere else, though.
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
    //Checking for collisions with enemies first.
    for(var i=0; i <allEnemies.length; i++)
    {
        //Comparing the location of the player and each enemy.
        //The Y coordinate check was modified because bugs can only impact from the left and right.
        //It still needs tweaking in that regard.
        if (
        player.x < allEnemies[i].x + allEnemies[i].width 
        && player.x + player.width  > allEnemies[i].x 
        && (player.y - allEnemies[i].y) < 10 && (player.y - allEnemies[i].y) >= 0
        ) //The second y-clause is required to prevent bugs below the player from registering as hits.
        {
            /*
            window.alert("You got hit by something. Probably. Debug info: Your coords are ("
             + player.x + " , " + (player.x + player.width) + ") (" + player.y + " , "
              + (player.y + player.height) + ")." + 
              "The enemy's coords are (" 
              + allEnemies[i].x + " , " + (allEnemies[i].x + allEnemies[i].width) 
              + ") (" + allEnemies[i].y + " , "
              + (allEnemies[i].y + allEnemies[i].height) + ").");
            */
            Engine.resetGame(); //Returns not defined despite being in engine.js!!! This is a scope issue.
        }

    }
    //You can just have a different collision loop for different types of collidables!
    //Nothing yet, though.

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

//Linked to a button on the page.
//Modal pausing is... a bit simpler than expected.
function changePauseState(){
    window.alert("The game is now paused. Close this dialog to unpause.");
}