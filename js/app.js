// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Something like this?
    //this.x += dt;
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
}

Player.prototype.update = function(dt) {
    //Do something!
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(code) {
    //Adjust vertical movement so that the player stays in the same relative position on the grid.
    switch (code) {
        case "left":
            if(this.x == 0) { break; } 
            this.x -= 100;
            console.log(this.x);
            break;
        case "up":
            this.y -= 84;
            if(this.y <= 0) { this.y = 375}; //If we reach the top, we'll need some victory code.
            console.log(this.y);
            break;
        case "right":
            if(this.x == 400) { break; } 
            this.x += 100;
            console.log(this.x);
            break;
        case "down": 
            if(this.y == 375) { break; } 
            this.y += 84;
            console.log(this.y);
            break;
        //Add new keys as we implement functionality!
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var player = new Player(200,375); //Now exists.

//Bloc this out.
var allEnemies = []; 
//var enemy = new Enemy();
//allEnemies.push(enemy);


//Now we need code to spawn arbitrary enemies.
Enemy.prototype.makeEnemy = function() {
    //allEnemies.push(new Enemy); //I don't think this is legal Javascript code.
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
