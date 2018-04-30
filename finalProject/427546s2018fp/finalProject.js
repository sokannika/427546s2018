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
var camera, scene, renderer, geometry, texture, mesh;
var width = window.innerWidth, height = window.innerHeight / 2;
var size = 256;

var drawObj = function () {
    cX = ctx.width / 2;
    cY = ctx.height / 2;
    var object = "";
    var elevation = "";

    if (document.getElementById('translate').checked) {
        var getX = document.getElementById('x').value;
        var getY = document.getElementById('y').value;

        c.translate(getX, getY);
    }
    else if (document.getElementById('rotate').checked) {
        var angle = document.getElementById('r').value;

        c.rotate(angle * Math.PI / 180);
    }
    else if (document.getElementById('scale').checked) {
        var getPx = document.getElementById('px').value;
        var getPy = document.getElementById('py').value;

        c.scale(getPx, getPy);
    }
    else if (document.getElementById('shear').checked) {
        var getSx = document.getElementById('sx').value;
        var getSy = document.getElementById('sy').value;

        c.transform(1, getSx, getSy, 1, 0, 0);
    }

    //if (document.getElementById('house').checked = true) {
    if (document.getElementById('side').checked) {
        clearCtx();

        // house body
        c.beginPath();
        c.rect(cX - 100, cY - 50, 200, 200); //side
        c.fillStyle = green;
        c.fill();
        c.closePath();

        // window
        c.beginPath();
        //c.rect(cX - 70, cY - 20, 40, 40);
        c.rect(+cX + 30, cY - 20, 40, 40); //side
        c.rect(cX - 70, cY - 20, 40, 40); //side
        c.fillStyle = white;
        c.fill();
        c.closePath();

        // roof
        c.beginPath();
        c.moveTo(cX - 100, cY - 50);
        c.rect(cX - 110, cY - 150, 220, 100); //side

        c.fillStyle = brown;
        c.fill();
        c.closePath();

        // chimney
        c.beginPath();
        c.rect(cX - 60, cY - 170, 20, 50);
        c.rect(cX - 70, cY - 180, 40, 10);
        c.fillStyle = blue;
        c.fill();
        c.closePath();

        // window lines
        c.beginPath();
        c.moveTo(+cX + 30, cY); //side
        c.lineTo(+cX + 70, cY);
        c.moveTo(+cX + 50, cY - 20);
        c.lineTo(+cX + 50, cY + 20);
        c.moveTo(cX - 70, cY); //side
        c.lineTo(cX - 30, cY);
        c.moveTo(cX - 50, cY - 20);
        c.lineTo(cX - 50, cY + 20);
        c.strokeStyle = blue;
        c.lineWidth = 2;
        c.stroke();
    }
    else if (document.getElementById('front').checked) {
        clearCtx();

        // house body
        c.beginPath();
        c.rect(cX - 100, cY - 50, 200, 200);
        c.fillStyle = green;
        c.fill();
        c.closePath();

        // window
        c.beginPath();
        c.rect(cX - 70, cY - 20, 40, 40);
        c.fillStyle = white;
        c.fill();
        c.closePath();

        // roof
        c.beginPath();
        c.moveTo(cX - 100, cY - 50);
        c.lineTo(cX, cY - 150);
        c.lineTo(cX + 100, cY - 50);
        c.lineTo(cX - 100, cY - 50);

        c.fillStyle = brown;
        c.fill();
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
        c.fillStyle = blue;
        c.fill();
        c.closePath();

        // window lines
        c.beginPath();
        c.moveTo(cX - 70, cY);
        c.lineTo(cX - 30, cY);
        c.moveTo(cX - 50, cY - 20);
        c.lineTo(cX - 50, cY + 20);
        c.strokeStyle = blue;
        c.lineWidth = 2;
        c.stroke();
    }
    else if (document.getElementById('top').checked) {
        clearCtx();

        // roof
        c.beginPath();
        c.moveTo(cX - 100, cY - 50);
        c.rect(cX, cY - 150, 220, 100); //top

        c.fillStyle = brown;
        c.fill();
        c.closePath();

        c.beginPath();
        c.moveTo(+cX + 110, cY - 150);
        c.lineTo(+cX + 110, cY - 50);
        c.strokeStyle = black;
        c.lineWidth = 2;
        c.stroke();
        c.closePath();

        // chimney
        c.beginPath();
        c.rect(cX + 50, cY - 130, 10, 40);
        c.fillStyle = blue;
        c.fill();
    }

}

//clear content
var clearCtx = function () {
    //clear canvas
    c.clearRect(0, 0, ctx.width, ctx.height);
    //clear form input
    document.getElementById('input').reset();
}

function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera.position.z = 500;
    scene.add(camera);
    texture = new THREE.Texture(canvas);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    geometry = new THREE.BoxGeometry(200, 200, 200);
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    //canvas.width = canvas.height = size;
}
function animate() {
    requestAnimationFrame(animate);

    changeCanvas();
    texture.needsUpdate = true;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

