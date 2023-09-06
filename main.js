import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const orthographicCamera = new THREE.OrthographicCamera(
  window.innerWidth / -2,
  window.innerWidth / 2,
  window.innerHeight / 2,
  window.innerHeight / -2,
  1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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
  new THREE.OctahedronGeometry(0.6), // Ruby
  new THREE.TorusGeometry(0.3, 0.025, 16, 100),
];

// Defina os shaders de uma classe RawShaderMaterial personalizados em GLSL para refletir a luz
const customVertexShader = document.getElementById('vertexShader').textContent;
const customFragmentShader = document.getElementById('fragmentShader').textContent;
const gemMaterials = [
  new THREE.MeshStandardMaterial({ color: 0x00ff00 }), // Esmeralda
  new THREE.MeshStandardMaterial({ color: 0xffd700 }), // Barra de ouro
  new THREE.MeshStandardMaterial({ color: 0x00ffff }), // Diamante
  new THREE.MeshStandardMaterial({ color: 0xff0000 }),  // Ruby
  new THREE.RawShaderMaterial({
    vertexShader: customVertexShader,
    fragmentShader: customFragmentShader,
    uniforms: {
      time: { value: 4.0 },

      //cor azul
      colorB: { value: new THREE.Color(0x00ffff) },
    },
  })  // Diamante
];


const gems = [];
for (let i = 0; i < 5; i++) {
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


gems.forEach(gem => {
  gem.castShadow = true; // Ativar sombras para os objetos
  gem.receiveShadow = true; // Objetos recebem sombra
});


camera.position.z = 5;

orthographicCamera.position.set(0, 0, 5);
orthographicCamera.lookAt(0, 0, 0);


const aspect = window.innerWidth / window.innerHeight;
orthographicCamera.left = -2 * aspect;
orthographicCamera.right = 3 * aspect;
orthographicCamera.top = 2;
orthographicCamera.bottom = -2;
orthographicCamera.near = 1;
orthographicCamera.far = 1000;
orthographicCamera.updateProjectionMatrix();


document.getElementById('move-left').addEventListener('click', () => {
  const firstGem = gems.shift();
  gems.push(firstGem);
  arrangeGems();
  document.getElementById('buttons-container').classList.add('button-transition');
});

// Botão para transladar para a direita
document.getElementById('move-right').addEventListener('click', () => {
  const lastGem = gems.pop();
  gems.unshift(lastGem);
  arrangeGems();
  document.getElementById('buttons-container').classList.add('button-transition');
});

let currentCamera = camera; // camera de perspectiva é a primeira

// Botão para mudar para a câmera ortográfica
document.getElementById('ortonografic-camera').addEventListener('click', () => {
  currentCamera = orthographicCamera; 
  document.getElementById('buttons-container-camera').classList.add('button-transition');
});

// Botão para mudar para a câmera de perspectiva
document.getElementById('perspective-camera').addEventListener('click', () => {
  currentCamera = camera; 
  document.getElementById('buttons-container-camera').classList.add('button-transition');
});

function arrangeGems() {
  gems.forEach((gem, index) => {
    gem.position.x = index * 2 - 3;
  });
}


const animate = () => {
  requestAnimationFrame(animate);

  // Rotação dos objetos
  gems.forEach(gem => {
    gem.rotation.x += 0.005;
    gem.rotation.y += 0.005;
  });
  gemMaterials[4].uniforms.time.value += 0.02;
  renderer.render(scene, currentCamera);
};

animate();