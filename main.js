import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

const scene = new THREE.Scene();
const fov = 75;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, near,far );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
scene.add(ground);

const geometryCube = new THREE.BoxGeometry( 1, 1, 1 );
const materialCube = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometryCube, materialCube );
scene.add( cube );

const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const obstacle1 = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
obstacle1.position.set(2, 0.5, 0);
scene.add(obstacle1);

const obstacle2 = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
obstacle2.position.set(-3, 0.5, 2);
scene.add(obstacle2);

const obstacle3 = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
obstacle3.position.set(0, 0.5, -4);
scene.add(obstacle3);


const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const points = [];
points.push( new THREE.Vector3( - 2, 0, 0 ) );
points.push( new THREE.Vector3( 0, 2, 0 ) );
points.push( new THREE.Vector3( 2, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry, material );
scene.add(line);


const loader = new GLTFLoader();
loader.load(
    './potted_plant_04_1k.gltf',  
    function (gltf) {
        const model = gltf.scene;
        model.position.set(-3, 0, 0);  
        model.scale.set(7, 7, 7);     
        scene.add(model);
    },
    undefined,
    function (error) {
        console.error('An error happened while loading the model:', error);
    }
);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); 
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);



camera.position.z = 5;
camera.position.y = 5;



const controls = new OrbitControls( camera, renderer.domElement );


document.addEventListener('keydown', onKeyDown);

function onKeyDown(event) {
    switch (event.key) {
        case 'w':
            cube.position.z -= 0.1;
            break;
        case 's':
            cube.position.z += 0.1;
            break;
        case 'a':
            cube.position.x -= 0.1;
            break;
        case 'd':
            cube.position.x += 0.1;
            console.log("pressed d")
            break;
    }
}

let z_track = cube.position.z;
let x_track = cube.position.x;

function animate(t=0) {

    if(z_track!=cube.position.z || x_track!=cube.position.x){
        camera.position.z=cube.position.z+5;
        camera.position.x=cube.position.x;  
        z_track=cube.position.z;
        x_track =cube.position.x;

    }


	renderer.render( scene, camera );

}
renderer.setAnimationLoop( animate );