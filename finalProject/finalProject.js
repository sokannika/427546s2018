var ctx = document.getElementById("canvas");
var c = ctx.getContext("2d");

c.canvas.width = window.innerWidth;
c.canvas.height = window.innerHeight;
var cX = 0;
var cY = 0;
var blue = "#447FFF";
var white = "#FFF";
var green = "#76D7C4";
var brown = "#A52A2A";
var black = "#000000";

//var drawObj = function () {
    cX = ctx.width / 2;
    cY = ctx.height / 2;
    var object = "";
    var elevation = "";

    //if (document.getElementById('house').checked = true) {
      //  if (document.getElementById('front').checked = true) {

            //clearCtx();

            // house body
            c.beginPath();
            c.rect(cX - 100, cY - 50, 200, 200);
            c.rect(cX - 500, cY - 50, 200, 200); //side
            c.fillStyle = green;
            c.fill();
            c.closePath();

            // window
            c.beginPath();
            c.rect(cX - 70, cY - 20, 40, 40);
            c.rect(cX - 470, cY - 20, 40, 40); //side
            c.rect(cX - 370, cY - 20, 40, 40); //side
            c.fillStyle = white;
            c.fill();
            c.closePath();

            // roof
            c.beginPath();
            c.moveTo(cX - 100, cY - 50);
            c.lineTo(cX, cY - 150);
            c.lineTo(cX + 100, cY - 50);
            c.lineTo(cX - 100, cY - 50);
            c.rect(cX - 510, cY - 150, 220, 100); //side
            c.rect(+cX + 350, cY - 150, 220, 100); //top
            
            c.fillStyle = brown;
            c.fill();
            c.closePath();

            c.beginPath();
            c.moveTo(+cX + 460, cY - 150);
            c.lineTo(+cX + 460, cY - 50);
            c.strokeStyle = black;
            c.lineWidth = 2;
            c.stroke();
            c.closePath();

            // door
            c.beginPath();
            c.rect(cX + 20, cY + 71, 50, 80);
            c.fillStyle = white;
            c.fill();
            c.closePath();

            // chimney
            c.beginPath();
            c.rect(cX + 60, cY - 120, 20, 50);
            c.rect(cX + 50, cY - 130, 40, 10);
            c.fillStyle = brown;
            c.fill();
            c.closePath();

            // window lines
            c.beginPath();
            c.moveTo(cX - 70, cY);
            c.lineTo(cX - 30, cY);
            c.moveTo(cX - 50, cY - 20);
            c.lineTo(cX - 50, cY + 20);
            c.moveTo(cX - 470, cY); //side
            c.lineTo(cX - 430, cY);
            c.moveTo(cX - 450, cY - 20);
            c.lineTo(cX - 450, cY + 20);
            c.moveTo(cX - 370, cY); //side
            c.lineTo(cX - 330, cY);
            c.moveTo(cX - 350, cY - 20);
            c.lineTo(cX - 350, cY + 20);
            c.strokeStyle = blue;
            c.lineWidth = 2;
            c.stroke();
            c.closePath();

        //}
        


    //}

//}

/*//clear content
var clearCtx = function () {
    //clear canvas
    c.clearRect(0, 0, ctx.width, ctx.height);
    //clear form input
    document.getElementById('input').reset();
}*/

/*// house body
c.beginPath();
c.rect(cX - 100, cY - 50, 200, 200);
c.fillStyle = green;
c.fill();
c.closePath();*/