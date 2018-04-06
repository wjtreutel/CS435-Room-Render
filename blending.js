// CS435, Project #6, William Treutel
// Just a room, a table, and a cup. Nothin' special 'bout that


// This code is written for the THREE JS library, which has been included
// Note: Because THREE JS is a library that is built entirely on WebGL, I do not believe its use 
// 	     will be an issue. Please let me know if this is not the case!

"use strict"

var canvas;
var gl;

var projection; // projection matrix uniform shader variable location
var transformation; // projection matrix uniform shader variable location
var vPosition;
var vColor;

var scene, camera, renderer;
var geometry, material;

var loader = new THREE.FontLoader();
var pivot1,  pivot2,  pivot3;

var backwall, floor, blueball;
var cameraSource = [[0,6,15],[-5,6,8],[-6,6,10],[6,6,10],[5,6,8]];
var currCam = 0;

function init() {
	scene = new THREE.Scene();
	var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight;

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(WIDTH,HEIGHT);
	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 0.1, 20000);
	camera.position.set(0,0,0);
	scene.add(camera);

	window.addEventListener('resize',function() {
		var WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight;

		
		renderer.setSize(WIDTH,HEIGHT);
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
	});


	var clockbutton = document.getElementById('clockwise');
	var counterclockbutton = document.getElementById('counterclockwise');

	
	clockbutton.addEventListener('click',function() {
		currCam = (currCam + 1) % 5;
		camera.position.x = cameraSource[currCam][0];
		camera.position.y = cameraSource[currCam][1];
		camera.position.z = cameraSource[currCam][2];
		camera.lookAt = blueball.position;	
		});


	counterclockbutton.addEventListener('click',function() {
		currCam = (currCam + 4) % 5;
		camera.position.x = cameraSource[currCam][0];
		camera.position.y = cameraSource[currCam][1];
		camera.position.z = cameraSource[currCam][2];
		camera.lookAt = blueball.position;	
		});
	

	var light = new THREE.PointLight(0xffffff);
	light.position.set(-100,200,100);
	scene.add(light);

	}


function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
	}



window.onload = function initialize() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.5, 0.5, 0.5, 1.0 );

	init();

	geometry = new THREE.BoxGeometry(5, 5, 0.0000000000001);
	material = new THREE.MeshPhongMaterial({transparent:false, map: THREE.ImageUtils.loadTexture('floortex.jpg')});
	floor = new THREE.Mesh(geometry,material);

	floor.rotation.x = 4.7;
	floor.position.y = 2;
	floor.position.z = .6;
	

	geometry = new THREE.BoxGeometry(5, 5, 0.000000000000000000001);
	material = new THREE.MeshPhongMaterial({transparent:false, map: THREE.ImageUtils.loadTexture('walltex.jpg')});
	backwall = new THREE.Mesh(geometry,material);

	backwall.position.x = .05;
	backwall.position.y = 4.4;
	backwall.position.z = -2;
	

	geometry = new THREE.CylinderGeometry(1.25, 1.25, .1, 32);
	material = new THREE.MeshPhongMaterial({transparent:false, map: THREE.ImageUtils.loadTexture('woodtex.jpg')});
	var tabletop = new THREE.Mesh(geometry,material);

	tabletop.position.x = 0;
	tabletop.position.y = 4;
	tabletop.position.z = .6;
	

	//geometry = new THREE.CylinderGeometry(.25, .25, 2, 32);
	geometry = new THREE.BoxGeometry(.25, 2, .25);
	material = new THREE.MeshPhongMaterial({transparent:false, map: THREE.ImageUtils.loadTexture('woodtex.jpg')});
	var leg1 = new THREE.Mesh(geometry,material);
	var leg2 = new THREE.Mesh(geometry,material);
	var leg3 = new THREE.Mesh(geometry,material);
	var leg4 = new THREE.Mesh(geometry,material);


	leg1.position.x = -.625; leg1.position.y = 3; leg1.position.z = 0;

	leg2.position.x = -.625; leg2.position.y = 3; leg2.position.z = 1.25;

	leg3.position.x = .625; leg3.position.y = 3; leg3.position.z = 0;

	leg4.position.x = .625; leg4.position.y = 3; leg4.position.z = 1.25;



	geometry = new THREE.CylinderGeometry(.2, .1, .5, 32, 32,  true);
	//material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, transparent:true, opacity:.04 } );
	material = new THREE.MeshPhongMaterial({opacity: .4, transparent:true, map: THREE.ImageUtils.loadTexture('cuptex.jpg')});
	var glass = new THREE.Mesh(geometry,material);

	glass.position.y = 4.25;
	glass.position.z = .6;


	geometry = new THREE.SphereGeometry(.1,32,32);
	material = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
	blueball = new THREE.Mesh( geometry, material );

	blueball.position.y = 4.25;
	blueball.position.z = .6;


	scene.add(floor);
	scene.add(backwall);
	scene.add(tabletop);
	scene.add(leg1); scene.add(leg2); scene.add(leg3); scene.add(leg4);
	scene.add(glass);
	scene.add(blueball);

	camera.position.y = 6;
	camera.position.z = 10;
	camera.lookAt = blueball.position;

	animate();
}
