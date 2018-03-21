var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var wc = c.width/2;
var hc = c.height / 2;
var fracX0 = 25;
var fracY0 = 50;
var fracX1 = 0;
var fracY1 = 0;
var D360 = 0;

//add stroke thickness
var add = function () {
    var thickness = document.getElementById('strokethickness').value;
    var intThickness = Number(thickness);
    intThickness = +intThickness + 1;
    document.getElementById('strokethickness').value = intThickness;
}

//sub stroke thickness
var sub = function () {
    var thickness = document.getElementById('strokethickness').value;
    var intThickness = Number(thickness);
    intThickness = intThickness - 1;
    if (intThickness < 1) {
        intThickness = +intThickness + 1
    }
    document.getElementById('strokethickness').value = intThickness;
}

var drawWheel = function () {

    //declare input variables
    var radius = document.getElementById('r').value;
    var score = document.getElementById('s').value;

    if (score < 3) {
        ctx.font = "10px Cambria";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("You are not allowed to drive!!", wc, hc);
    }
    else {
        //inner inner circle
        ctx.beginPath();
        ctx.arc(wc, hc, 10, 0, 2 * Math.PI);
        ctx.strokeStyle = document.getElementById('SelectColor').value;
        ctx.lineWidth = document.getElementById('strokethickness').value;
        ctx.fillStyle = document.getElementById('SelectFill').value;
        ctx.fill();
        ctx.stroke();

        //if score < 80 then draw polygon
        if (score < 80) {
            //inner polygon
            drawPolygon(wc, hc, radius, score);

            //outer polygon
            drawPolygon(wc, hc, +radius + 10, score);
        }
        //if score is between 80 and 99, draw ellipse
        else if (score < 100) {
            var diff = (100 - score) / 100;
            var hr = +radius + (radius * diff);
            //inner ellipse
            drawEllipse(wc, hc, hr, radius);

            //outer ellipse
            drawEllipse(wc, hc, +hr + 10, +radius + 10);
        }
        //if score is 100, then draw circle
        else {
            //inner circle
            drawCircle(wc, hc, radius);
        
            //outer circle
            drawCircle(wc, hc, +radius + 10);
        }
        
    }
}
    

//clear content
var Clear = function (form) {
    //clear canvas
    ctx.clearRect(0, 0, c.width, c.height);
    //clear form input
    document.getElementById(form).reset();
}

//draw line
var drawLine = function (xs, ys, xe, ye) {
    ctx.beginPath();
    ctx.moveTo(xs, ys);
    ctx.lineTo(xe, ye);
    ctx.strokeStyle = document.getElementById('SelectColor').value;
    ctx.lineWidth = document.getElementById('strokethickness').value;
    ctx.fillStyle = document.getElementById('SelectFill').value;
    ctx.fill();
    ctx.stroke();
}

// draw ellipse
var drawEllipse = function (xc, yc, hradius, vradius) {
    ctx.beginPath();
    ctx.ellipse(xc, yc, hradius, vradius, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = document.getElementById('SelectColor').value;
    ctx.lineWidth = document.getElementById('strokethickness').value;
    ctx.fillStyle = document.getElementById('SelectFill').value;
    ctx.fill();
    ctx.stroke();
}

//draw circle
var drawCircle = function (xc, yc, radius) {
    ctx.beginPath();
    ctx.arc(xc, yc, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = document.getElementById('SelectColor').value;
    ctx.lineWidth = document.getElementById('strokethickness').value;
    ctx.fillStyle = document.getElementById('SelectFill').value;
    ctx.fill();
    ctx.stroke();
}

//draw rectangle
var drawRect = function (xs, ys, w, h) {
    ctx.beginPath();
    ctx.rect(xs, ys, w, h);
    ctx.strokeStyle = document.getElementById('SelectColor').value;
    ctx.lineWidth = document.getElementById('strokethickness').value;
    ctx.fillStyle = document.getElementById('SelectFill').value;
    ctx.fill();
    ctx.stroke();
}

// draw polygon
var drawPolygon = function (xc, yc, radius, sides) {

    ctx.beginPath();
    //start point
    var x = +xc + +radius * Math.cos(2 * Math.PI * 0 / sides);
    var y = +yc + +radius * Math.sin(2 * Math.PI * 0 / sides);

    //loop to next points
    for (var i = 1; i <= sides; i++) {
        x = +xc + +radius * Math.cos(2 * Math.PI * i / sides);
        y = +yc + +radius * Math.sin(2 * Math.PI * i / sides);
        ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.strokeStyle = document.getElementById('SelectColor').value;
    ctx.lineWidth = document.getElementById('strokethickness').value;
    ctx.fillStyle = document.getElementById('SelectFill').value;
    ctx.fill();
    ctx.stroke();
}

//draw polyline
var drawPolyline = function () {

}

//draw fractal
var drawLineFractal = function (ratio, iter) {
    ctx.beginPath();
    ctx.moveTo(10, 50);
    fractal(50, ratio, iter);
    ctx.closePath();
    ctx.strokeStyle = document.getElementById('SelectColor').value;
    ctx.lineWidth = document.getElementById('strokethickness').value;
    ctx.stroke();
}

var from360 = function (angle360) {
    return Math.PI * angle360 / 180;
}

var move = function () {
    fracX1 = +fracX0 + 50 * Math.cos(from360(D360)); 
    fracY1 = +fracY0 + 50 * Math.sin(from360(D360)); 
    ctx.lineTo(fracX1, fracY1);
}

var moveRight = function (angle360) {
    D360 = D360 - angle360;
}

var moveLeft = function (angle360) {
    D360 = +D360 + +angle360;
}

var fractal = function (length, ratio, depth) {
    if (depth === 0) {
        move();
    }
    else {
        fractal(length/ratio, depth - 1);
        moveRight(60);
        fractal(length/ratio, depth - 1);
        moveLeft(120);
        fractal(length/ratio, depth - 1);
        moveRight(60);
        fractal(length/ratio, depth - 1);
    }
}