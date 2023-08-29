import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Variáveis globais
const scene1 = new THREE.Scene();
const scene2 = new THREE.Scene();
const scene3 = new THREE.Scene();
const scene4 = new THREE.Scene();

const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera3 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera4 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Adicione suas luzes aqui
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
const pointLight = new THREE.PointLight(0xff0000, 1, 10);
const spotLight = new THREE.SpotLight(0x00ff00, 1, 10);
const ambientLight = new THREE.AmbientLight(0x404040);

directionalLight.position.set(1, 1, 1);
pointLight.position.set(2, 2, 2);
spotLight.position.set(-2, -2, -2);

scene1.add(directionalLight);
scene1.add(pointLight);
scene1.add(spotLight);
scene1.add(ambientLight);

// Configure suas câmeras aqui
camera1.position.set(0, 0, 5);
camera2.position.set(0, 0, 5);
camera3.position.set(0, 0, 5);
camera4.position.set(0, 0, 5);

// Adicione objetos 3D a cada cena aqui
const object1 = createObject();
const object2 = createObject();
const object3 = createObject();
const object4 = createObject();

scene1.add(object1);
scene2.add(object2);
scene3.add(object3);
scene4.add(object4);

// Configure OrbitControls para cada câmera
const controls1 = new OrbitControls(camera1, renderer.domElement);
const controls2 = new OrbitControls(camera2, renderer.domElement);
const controls3 = new OrbitControls(camera3, renderer.domElement);
const controls4 = new OrbitControls(camera4, renderer.domElement);

// Função para criar objetos 3D
function createObject() {
    const color = new THREE.Color(Math.random(), Math.random(), Math.random());
    const material = new THREE.MeshBasicMaterial({ color });
    const material2 = new THREE.MeshBasicMaterial({ color });

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const object = new THREE.Mesh(geometry, material);

    const geometry2 = new THREE.SphereGeometry(0.5, 32, 32);
    const esfera = new THREE.Mesh(geometry2, material2);
    
    esfera.position.set(1, 1, 1);
    object.add(esfera);

    return object;
}

// Função de animação
function animate() {
    requestAnimationFrame(animate);

    // Atualize o movimento dos objetos aqui
    object1.rotation.x += 0.01;
    object1.rotation.y += 0.01;

    object2.rotation.x += 0.01;
    object2.rotation.y += 0.01;

    object3.rotation.x += 0.01;
    object3.rotation.y += 0.01;

    object4.rotation.x += 0.01;
    object4.rotation.y += 0.01;

    // Renderize cada cena com sua respectiva câmera
    renderer.setScissorTest(true);
    renderer.clear();

    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;

    renderer.setViewport(0, height, width, height);
    renderer.setScissor(0, height, width, height);
    renderer.render(scene1, camera1);

    renderer.setViewport(width, height, width, height);
    renderer.setScissor(width, height, width, height);
    renderer.render(scene2, camera2);

    renderer.setViewport(0, 0, width, height);
    renderer.setScissor(0, 0, width, height);
    renderer.render(scene3, camera3);

    renderer.setViewport(width, 0, width, height);
    renderer.setScissor(width, 0, width, height);
    renderer.render(scene4, camera4);
}

// Chamada das funções de inicialização
animate();