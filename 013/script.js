import * as THREE from "three";

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x7a7777);

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 3, 5);
camera.lookAt(0, 0, 0);
camera.position.z = 5;

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//lights
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const upColor = 0xffffff;
const downColor = 0x4040ff;
const hemisphere = new THREE.HemisphereLight(upColor, downColor, 1.0);
scene.add(hemisphere);

let directLight = new THREE.DirectionalLight(0xffffff, 1.0);
directLight.position.set(2, 7, 1);
directLight.target.position.set(0, 0, 0);
scene.add(directLight);
directLight.castShadow = true;
directLight.shadow.mapSize.width = 2048;
directLight.shadow.mapSize.height = 2048;
directLight.shadow.camera.left = -1;
directLight.shadow.camera.right = 1;
directLight.shadow.camera.top = 2;
directLight.shadow.camera.bottom = -2;
directLight.shadow.camera.near = 0.1;
directLight.shadow.camera.far = 15;

scene.add(directLight.target);

var pointLight = new THREE.PointLight(0x0040ff, 1, 50);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);

//fog
//scene.fog = new THREE.Fog( 0xffffff, 5, 7 );

//cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 6307741 });
const cube = new THREE.Mesh(geometry, material);
material.castShadow = true;
scene.add(cube);
cube.translateY(1.5);
cube.castShadow = true;

//plane
const geometry2 = new THREE.PlaneGeometry(5, 5);
const material2 = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry2, material2);
material2.receiveShadow = true;
scene.add(plane);
plane.rotateX((Math.PI / 180) * 90);
plane.receiveShadow = true;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
