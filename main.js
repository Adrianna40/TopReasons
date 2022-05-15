import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);


const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshPhongMaterial( { color: 0xFF334C, wideframe: true } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

const pointLight = new THREE.PointLight(0xEDFFFE)
pointLight.position.set(5, 5, 5)
scene.add(pointLight)

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const controls = new OrbitControls(camera, renderer.domElement);

// Background

const bubblesTexture = new THREE.TextureLoader().load('bubbles.jpg');
scene.background = bubblesTexture;

function addBubble() {
  const geometry = new THREE.SphereGeometry(0.5, 24, 24);
  const material = new THREE.MeshPhongMaterial({ color: 0xA7FFFF});
  const bubble = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  bubble.position.set(x, y, z);
  scene.add(bubble);
}

Array(50).fill().forEach(addBubble);


// const networkTexture = new THREE.TextureLoader().load('Network_conntectivity.jpg');
// const network = new THREE.Mesh(new THREE.SphereGeometry(10, 24, 24), new THREE.MeshBasicMaterial({ map: networkTexture }));
// network.position.z = 30;
// network.position.setX(-10);
// scene.add(network);


// Avatar

const aiTexture = new THREE.TextureLoader().load('ai.jpeg');

const ai = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: aiTexture }));

scene.add(ai);
ai.position.z = 15;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;



  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  ai.rotation.y += 0.01;
  ai.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();