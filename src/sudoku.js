
/* jshint -W069, esversion:6 */

let width = 500; let height = 500;

window.onload = function() {
    /** @type {HTMLCanvasElement} */
    let board = (/** @type {HTMLCanvasElement} */ document.getElementById("board"));
    let context = board.getContext('2d');
    drawBoard(context);
}

function drawBoard(context) {
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
    context.beginPath();
    context.moveTo(width / 3, 0);
    context.lineTo(width / 3, height);
    context.stroke();

    context.beginPath();
    context.moveTo(width * 2 / 3, 0);
    context.lineTo(width * 2 / 3, height);
    context.stroke();

    context.beginPath();
    context.moveTo(0, height * 2 / 3);
    context.lineTo(width, height * 2 / 3);
    context.stroke();

    context.beginPath();
    context.moveTo(0, height * 1 / 3);
    context.lineTo(width, height * 1 / 3);
    context.stroke();

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
    context.restore();
}