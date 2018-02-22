var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// setpixel
var setPixel = function (x, y) {
    var p = ctx.createImageData(1, 1);
        p.data[0] = 0;
        p.data[1] = 0;
        p.data[2] = 0;
        p.data[3] = 255;
    ctx.putImageData(p, x, y);
}

//clear context
var Clear = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
}

var MidPointLine = function (x0, y0, x1, y1) {
    var dx, dy, incE, incNE, d, x, y, xe, ey, comp0, comp1;

    dx = x1 - x0;
    dy = y1 - y0;
    d = dy - (dx/2);
    incE = dy;
    incNE = dy - dx;
    x = Math.min(x0, x1);
    if (x = x0) { y = y0; }
    else { y = y1; }
    //y = Math.min(y0,y1);

    setPixel(x, y);

    if ((x0 - x1) == 0) {
        comp0 = Math.min(y0,y1);
        comp1 = Math.max(y0,y1);
    }
    else {
        comp0 = Math.min(x0, x1);
        comp1 = Math.max(x0, x1);
    }

    while (comp0 < comp1) {
        if (dy == 0) {
            x++;
        }
        else if (d == dy) {
            y++;
        }
        else if (d <= 0) {
            x++;
            y--;
        }
        
        else {
            d = d + incNE;
            x++;
            y++;
        }
        setPixel(x, y);
        comp0++;
    }

}

var MidPointCircle = function (cx, cy, r) {

    var x, y, p;

    x = r;
    y = 0;
    p = 1 - r;
    setPixel(+cx + +x, cy);

    if (r > 0) {
        setPixel(cx - x, cy);
        setPixel(cx, +cy + +x);
        setPixel(cx, cy - x);
    }

    while (x > y) {
        y++;

        if (p <= 0) {
            p = p + (2 * y) + 1;
        }
        else {
            x--;
            p = p + (2 * y) - (2 * x) + 1;
        }

        if (x < y) {
            break;
        }

        setPixel(+x + +cx, +y + +cy);
        setPixel(cx - x, +y + +cy);
        setPixel(+x + +cx, cy - y);
        setPixel(cx - x, cy - y);

        if (x != y) {
            setPixel(+y + +cx, +x + +cy);
            setPixel(cx - y, +x + +cy);
            setPixel(+y + +cx, cy - x);
            setPixel(cx - y, cy - x);
        }
    }
}
var MidPointEllipse = function (cx, cy, a, b) {
    var temp, temp1, x, y, p, dE, dS, dSE, d2E, d2S, d2SE;

    x = 0;
    y = b;
    temp = 1 - (4 * b);
    p = Math.pow(b, 2) + ((Math.pow(a, 2) * temp)) / 4;
    dE = 3 * Math.pow(b, 2);
    d2E = 2 * Math.pow(b, 2);
    dSE = dE - 2 * Math.pow(a, 2) * (b - 1);
    d2SE = +d2E + 2 * Math.pow(a, 2);

    //plot region 1
    PlotEllipse(cx, cy, x, y);
    temp = +(2 * Math.pow(a, 2)) + +(3 * Math.pow(b, 2));
    while (dSE < temp) {
        //choose E
        if (p < 0) {
            p = +p + +dE;
            dE = +dE + +d2E;
            dSE = +dSE + +d2E;
        }
        //choose SE
        else {
            p = +p + +dSE;
            dE = +dE + +d2E;
            dSE = +dSE + +d2SE;
            y--;
        }
        x++;
        PlotEllipse(cx, cy, x, y);
    }

    //plot region 2
    temp = Math.pow(a, 2) * ((4 * y) - 3);
    temp1 = Math.pow(b, 2) * ((4 * x) + 3);
    p = +p - (temp + +temp1) / 4;
    dS = Math.pow(a, 2) * (3 - (2 * y));
    dSE = +(2 * Math.pow(b, 2)) + +(3 * Math.pow(a, 2));
    d2S = 2 * Math.pow(a, 2);
    while (y > 0) {
        //choose S
        if (p < 0) {
            p = +p + +dE;
            dE = +dE + +d2S;
            dSE = +dSE + +d2S;
        }
        //choose SE
        else {
            p = +p + +dSE;
            dE = +dE + +d2S;
            dSE = +dSE + +d2SE;
            x++;
        }
        y--;
        PlotEllipse(cx, cy, x, y);
    }
}

var PlotEllipse = function (cx, cy, x, y) {
    setPixel(+cx + +x, +cy + +y);
    setPixel(+cx + +x, cy - y);
    setPixel(cx - x, +cy + +y);
    setPixel(cx - x, cy - y);
}

var DrawRect = function (x0, y0, w, h) {
    //top line
    MidPointLine(x0, y0, +x0 + +w, y0);
    // bottom line
    MidPointLine(x0, +y0 + +h, +x0 + +w, +y0 + +h);
    //left line
    MidPointLine(x0, y0, x0, +y0 + +h);
    // right line
    MidPointLine(+x0 + +w, y0, +x0 + +w, +y0 + +h);
}

var DrawPolygons = function (x0, y0, r, n) {
    var x, y, x1, y1, i;

    x = +x0 + +r * Math.cos(2 * Math.PI * 0 / n);
    y = +y0 + +r * Math.sin(2 * Math.PI * 0 / n);

    for (i = 1; i <= n; i++) {
        x1 = Math.round(+x0 + +r * Math.cos(2 * Math.PI * i/n));
        y1 = Math.round(+y0 + +r * Math.sin(2 * Math.PI * i/n));

        MidPointLine(x, y, x1, y1);

        
        x = x1;
        y = y1;
    }
}