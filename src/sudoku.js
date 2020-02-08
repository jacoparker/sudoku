
/* jshint -W069, esversion:6 */

let width = 500.0; let height = 500.0;

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
        animate(context);
        context.restore();
    }, false);

    animate(context);
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
    context.restore();
}