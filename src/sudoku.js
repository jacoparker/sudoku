
/* jshint -W069, esversion:6 */

// global data for board
let width = 500.0; let height = 500.0;
let selected = null;
let boardVals = [
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
];

let boardMutable = [
    [true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true],
]

window.onload = function() {
    /** @type {HTMLCanvasElement} */
    let board = (/** @type {HTMLCanvasElement} */ document.getElementById("board"));
    let context = board.getContext('2d');
    board.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(board, evt);
        // determine row and column
        // clear the board
        context.save();
        context.fillStyle = "#fff";
        context.fillRect(0, 0, width, height);

        if (selected) highlight(context);

        let col = Math.floor(mousePos['x'] / width * 9) * width / 9;
        let row = Math.floor(mousePos['y'] / height * 9) * height / 9;

        context.fillStyle = "#34eba1a0";
        context.fillRect(col, row, width / 9.0, height / 9.0);

        context.restore();
        animate(context);
      }, false);

    board.addEventListener ("mouseout", function(evt) {
        context.save();
        context.fillStyle = "#fff";
        context.fillRect(0, 0, width, height);
        if (selected) highlight(context);
        animate(context);
        context.restore();
    }, false);

    board.addEventListener("mousedown", function(evt) {
        context.save();
        context.fillStyle = "#fff";
        context.fillRect(0, 0, width, height);

        let mousePos = getMousePos(board, evt);
        let col = Math.floor(mousePos['x'] / width * 9) * width / 9;
        let row = Math.floor(mousePos['y'] / height * 9) * height / 9;
        selected = [col, row];

        highlight(context);
        context.restore();
        drawBoard(context);
        // fill in the remaining 3x3 squares
    }, false);

    window.addEventListener("keydown", function(evt) {
        if (evt.key < '1' || evt.key > '9') return;
        pencilCurrentCell(evt.key);

        // clear board
        context.save();
        context.fillStyle = "#fff";
        context.fillRect(0, 0, width, height);

        highlight(context);
        context.restore();
        drawBoard(context);
    }, false);

    animate(context);
}

function highlight(/** @type {CanvasRenderingContext2D} */ context) {
    let col = selected[0];
    let row = selected[1];
    context.fillStyle = "#6413e880";
    // fill in all squares in same row
    for (let i=0; i<9; i++) {
        context.fillRect(col, height * i / 9, width / 9, height / 9);
        context.fillRect(width * i / 9, row, width / 9, height / 9);
    }

    let tCol = Math.floor(col / 500.0 * 3.0) * 3;  // temp col
    let tRow = Math.floor(row / 500.0 * 3.0) * 3;  // temp col
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            context.fillRect(tCol*width/9 + i*width/9,
                             tRow*height/9 + j*height/9,
                             width / 9,
                             height / 9);
        }
    }
}

function animate(/** @type {CanvasRenderingContext2D} */ context) {
    drawBoard(context);
    requestAnimationFrame(animate);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

function pencilCurrentCell(input) {
    // check if a cell is selected or if selected cell is empty
    let row = Math.floor(selected[0]/height*10);
    let col = Math.floor(selected[1]/width*10);
    console.log(row + " " + col);
    if (selected === null || !boardMutable[row][col])
        return;
    boardVals[row][col] = input;
}

function drawBoard(/** @type {CanvasRenderingContext2D} */ context) {
    context.save();
    context.fillStyle = "#000";

    // draw the board!!
    context.lineWidth = 10;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, height);
    context.lineTo(width, height);
    context.lineTo(width, 0);
    context.closePath();
    context.stroke();

    context.lineWidth = 5;
    for (let i=1; i<3; i++) {
        context.beginPath();
        context.moveTo(0, height * i / 3);
        context.lineTo(width, height * i / 3);
        context.stroke();

        context.beginPath();
        context.moveTo(width * i / 3, 0);
        context.lineTo(width * i / 3, height);
        context.stroke();
    }

    context.lineWidth = 2;
    for (let i=1; i<9; i++) {
        context.beginPath();
        context.moveTo(width * i / 9, 0);
        context.lineTo(width * i / 9, height);
        context.stroke();

        context.beginPath();
        context.moveTo(0, height * i / 9);
        context.lineTo(width, height * i / 9);
        context.stroke();
    }

    for (let i=0; i<9; i++) {
        for (let j=0; j<9; j++) {
            if (boardVals[i][j] !== '0') {
                let col = i * width / 9;
                let row = j * height / 9 + height/10;
                context.font = "30px Arial";
                context.fillText(boardVals[i][j], col+width/27, row - height/36);
            }
        }
    }

    context.restore();
}