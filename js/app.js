// Enemies our player must avoid
let EnemyParam = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.height = 81;
    this.width = 85;
};

const allEnemyYPosition= [130, 210, 300];
const allEnemies = allEnemyYPosition.map((y,index) => {
        return new EnemyParam((-200 *(index + 1)),y);
});

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
EnemyParam.prototype.update = function(dt) {
    this.x += 1;
    if (this.x > ctx.canvas.width) {
      this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
EnemyParam.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let PlayerParam = function(x,y,sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.width= 70;
    this.height= 64;
};

const player = new PlayerParam(215, 476, 'images/char-boy.png');

function isCollide() {
    // console.log(allEnemies);
    for (let currentEnemy of allEnemies) {
        // console.log(currentEnemy);
        if (currentEnemy.x < player.x + player.width &&
            currentEnemy.x + currentEnemy.width > player.x &&
            currentEnemy.y < player.y + player.height &&
            currentEnemy.height + currentEnemy.y > player.y)
        {
            return true;
        }
    }
}


PlayerParam.prototype.update = function(dt) {
    if(isCollide()){
        console.log("Bitten");
    }

    // if(this.y <= 61){
    //     setTimeout(function(){
    //         console.log('woot!');
    //         player.y = 476;
    //     }, 800);
    // }
};

PlayerParam.prototype.handleInput = function(dt) {

    let cellWidth = 101;
    let cellHeight = 83;
    switch (dt) {
        case "up":
            if(this.y - cellHeight >= 0){
                this.y -= cellHeight;
                console.log(this.y)
            }
            break;
        case "down":
            if(this.y + cellHeight < ctx.canvas.height-100){
                this.y += cellHeight;
            }
            break;
        case "left":
            if(this.x - cellWidth >= 0){
                this.x -= cellWidth;
            }
            break;
        case "right":
            if(this.x + cellWidth < ctx.canvas.width){
                this.x += cellWidth;
            }
            break;
    }
};

PlayerParam.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});