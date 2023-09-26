const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnLeft = document.querySelector('#left');
const btnUp = document.querySelector('#up');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined,
};

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}

function startGame() {
    game.font = (elementsSize - 5) + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    game.clearRect(0,0, canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1 + 0.15);
            const posY = elementsSize * (rowI + 1 - 0.19);

            if (col === 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            }

            game.fillText(emoji, posX, posY);
        });
    })

    movePlayer();
}

function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    switch(event.key) {
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
    }
}

function moveUp() {
    if ((playerPosition.y - elementsSize) < 0 ) {
        console.log("OUT");
    } else {
        playerPosition.y -= elementsSize;
        startGame();
    }
}
function moveLeft() {
    if ((playerPosition.x - elementsSize) < elementsSize ) {
        console.log("OUT");
    } else {
        playerPosition.x -= elementsSize;
        startGame();
    }
}
function moveRight() {
    if ((playerPosition.x + elementsSize) < canvasSize + elementsSize) {
        playerPosition.x += elementsSize;
        startGame();
    } else {
        console.log("OUT")
    }
}
function moveDown() {
    if ((playerPosition.y + elementsSize) < canvasSize) {
        playerPosition.y += elementsSize;
        startGame();
    } else {
        console.log("OUT");
    }
}