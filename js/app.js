// Enemies our player must avoid
let EnemyParam = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.height = 81;
    this.width  = 85;
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
    this.startingY = 476;
    this.startingX = 215;
    this.sprite = sprite;
    this.width  = 70;
    this.height = 64;
    this.life   = 5;
};

const player = new PlayerParam(215, 476, 'images/char-boy.png');

//check for collision
function isCollide() {
    for (let currentEnemy of allEnemies) {
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

    let popupTitle  = document.querySelector('.popup-title');
    let lifeLeft    = document.querySelector('.life-left');

    if(isCollide()){
        bugBite = true;
        if (bugBite) {
            player.y = 476;
            if (player.life - 1 === 0){
                gameOver = true;
                popupTitle.innerHTML = "Ouch!! Game Over";
                togglePopup();
                popUpControls();
            }else {
                player.life -= 1;
                bugBite = false;
                lifeLeft.innerHTML = "Life x " + player.life;
            }
        }
        console.log("player.life = " + player.life);
    }

    if(player.y <= 61 && !gameWon && !bugBite){
        setTimeout(function(){
            // console.log('woot!');
            popupTitle.innerHTML = "YOU WON!!!";
            togglePopup();
            popUpControls();
        }, 800);
        gameWon = true;
    }
};

PlayerParam.prototype.handleInput = function(dt) {
    let cellWidth   = 101;
    let cellHeight  = 83;

    switch (dt) {
        case "up":
            if(this.y - cellHeight >= 0 && !bugBite && 
                !gameWon && !gameOver){
                this.y -= cellHeight;
            }
            break;
        case "down":
            if(this.y + cellHeight < ctx.canvas.height-100 && 
                !bugBite && !gameWon && !gameOver){
                this.y += cellHeight;
            }
            break;
        case "left":
            if(this.x - cellWidth >= 0 && !bugBite && 
                !gameWon && !gameOver){
                this.x -= cellWidth;
            }
            break;
        case "right":
            if(this.x + cellWidth < ctx.canvas.width && 
                !bugBite && !gameWon && !gameOver){
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


let popup    = document.querySelector(".popup");
let gameWon  = false;
let bugBite  = false;
let gameOver = false;

//Display a pop-up with the result and an button to
//play again.
function togglePopup() {
    popup.classList.toggle("show-popup");
}

function resetParam(){
    let lifeLeft  = document.querySelector('.life-left');

    togglePopup();
    bugBite = false;
    gameWon = false;
    gameOver = false;
    player.y = 476;
    player.x = 215;
    player.life = 5;
    lifeLeft.innerHTML = "Life x " + player.life;

    console.log("toggle");
}
//remove popup and reset game once player clicks on "Play Again" button.
function playAgainBtnTrigger(){
    let playAgain = document.querySelector(".play-again-btn");

    playAgain.addEventListener("click",resetParam);
}

//function to implement pop-up controls i.e. close buttons and play again button
//aslo close pop-up when user clicks on the window outside the pop-up
function popUpControls(){
    let closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", togglePopup);

    playAgainBtnTrigger();

    function windowOnClick(event) {
        if (event.target === popup) {
            togglePopup();
        }
    }
    window.addEventListener("click", windowOnClick);
}
