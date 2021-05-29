/* create */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1500);
/* Setters */
// canvas
var sceneWidth = 800;
var sceneHeight = 500;
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(sceneWidth, sceneHeight);
document.body.appendChild(renderer.domElement);

var canvas = document.querySelector('canvas')

// game objects
var x = canvas.width/2;
var y = canvas.height-30;
var ballRadius = 10;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

// RESIZE WINDOW
window.addEventListener('resize', function () {
    var width = sceneWidth;
    var height = sceneHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

/* ORBIT CONTROLS */
// var controls = new THREE.OrbitControls(camera, renderer.domElement);


/*  Bricks  */


/* CAMERA POSITION AND ROTATION*/

camera.position.set(1, 1, 350);
camera.lookAt(scene.position);
// camera.rotation.set(-.4, .5, .2);


/* LIGHT */
var ambientLight = new THREE.AmbientLight(0xFFFFFF, .3);
scene.add(ambientLight);

// Spotlight
var pointLight = new THREE.PointLight(0xffffff, 2.5, 400);
// pointLight.position.set(10, 150, -100);
pointLight.rotation.set(-180, 0, 0);
scene.add(pointLight);


var sphereSize = 5;
var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
// scene.add( pointLightHelper );

var dx = 1,
    dy = .5;

document.addEventListener('mousemove', function (e) {
    var width = window.innerWidth / 2;
    var height = window.innerHeight / 2;
    var mx = e.clientX - width;
    var my = e.clientY - height;

    pointLight.position.set(mx, -my, 250);

    // console.log(mx, my);
});

// game logic
var update = function () {


    if (pointLight.position.y == 200 || pointLight.position.y == -50) {
        dy = -dy;
    }
    if (pointLight.position.x == 100 || pointLight.position.x == -100) {
        dx = -dx;
    }
}
// Draw Scene
var render = function () {
    renderer.render(scene, camera);
}

// Game Loop (update, render, reapeat)
var GameLoop = function () {
    requestAnimationFrame(GameLoop);
    
    update();
    render();
}

document.addEventListener('DOMContentLoaded', GameLoop)