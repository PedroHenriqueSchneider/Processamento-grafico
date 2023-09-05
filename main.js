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

const gemGeometry = [
    new THREE.IcosahedronGeometry(0.4, 1), // Esmeralda
    new THREE.BoxGeometry(1, 0.2, 0.2), // Barra de ouro
    new THREE.TetrahedronGeometry(0.5), // Diamante
    new THREE.OctahedronGeometry(0.6) // Ruby
];

const gemMaterials = [
  new THREE.MeshStandardMaterial({ color: 0x00ff00, receiveShadow: true }), // Esmeralda
  new THREE.MeshStandardMaterial({ color: 0xffd700, receiveShadow: true }), // Barra de ouro
  new THREE.MeshStandardMaterial({ color: 0x00ffff, receiveShadow: true }), // Diamante
  new THREE.MeshStandardMaterial({ color: 0xff0000, receiveShadow: true })  // Ruby
];

const gems = [];
for (let i = 0; i < 4; i++) {
  gems[i] = new THREE.Mesh(gemGeometry[i], gemMaterials[i]);
  gems[i].position.x = i * 2 - 3;

  scene.add(gems[i]);
}

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
light.castShadow = true; // A luz projeta sombras
scene.add(light);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
camera.position.z = 5;


const animate = () => {
    requestAnimationFrame(animate);

    // Rotação dos objetos
    gems.forEach(gem => {
        gem.rotation.x += 0.005;
        gem.rotation.y += 0.005;
    });

    renderer.render(scene, camera);
};

animate();
