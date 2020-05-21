var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var drawColor = "#BB86FC",
    lineWidth = 2;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function color(obj) {
    switch (obj.id) {
        case "green":
            drawColor = "green";
            break;
        case "blue":
            drawColor = "blue";
            break;
        case "red":
            drawColor = "red";
            break;
        case "yellow":
            drawColor = "yellow";
            break;
        case "orange":
            drawColor = "orange";
            break;
        case "black":
            drawColor = "black";
            break;
        case "white":
            drawColor = "white";
            break;
    }
    if (drawColor == "white") lineWidth = 14;
    else lineWidth = 2;

}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
}

function erase() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}

function save() {
    // document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    // document.getElementById("canvasimg").src = dataURL;

    var a = document.createElement("a");
    a.href = dataURL;
    a.download = "portrait_" + Math.floor(Date.now() / 1000);
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(dataURL);
    }, 0);
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = drawColor;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

window.onload = init;