import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.8
});

const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1;
ground.receiveShadow = true;
scene.add(ground);


camera.position.z = 5;


const animate = () => {
    requestAnimationFrame(animate);
  
    renderer.render(scene, camera);
  };
  
  animate();