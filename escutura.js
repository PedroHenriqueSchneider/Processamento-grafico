import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// Variáveis globais
let scene, camera1, camera2, camera3, camera4, renderer;
let object1, object2;
let directionalLight, pointLight, spotLight, ambientLight;


// Função de inicialização
function init() {
  // Cena
  scene = new THREE.Scene();
  
    // Câmeras
    const aspect = window.innerWidth / window.innerHeight;
    camera1 = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera2 = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 1000);
    camera3 = new THREE.OrthographicCamera(75, aspect, 0.1, 1000);
    camera4 = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    
    // Configurar as posições das câmeras
    camera1.position.set(0, 0, 3);
    camera2.position.set(0, 0, 5);
    camera3.position.set(100, 0, 5);
    camera4.position.set(-5, 0, 5);
    
    // Luzes
    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    pointLight = new THREE.PointLight(0xff0000, 1, 10);
    spotLight = new THREE.SpotLight(0x00ff00, 1, 10);
    ambientLight = new THREE.AmbientLight(0x404040);
    
    // Configurar posições das luzes
    directionalLight.position.set(1, 1, 1);
    pointLight.position.set(2, 2, 2);
    spotLight.position.set(-2, -2, -2);
    
    // Adicionar as luzes à cena
    scene.add(directionalLight);
    scene.add(pointLight);
    scene.add(spotLight);
    scene.add(ambientLight);
    
    // Renderizador
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
  }

  
  // Função para criar objetos 3D
// Função para criar objetos 3D
function createObjects() {

    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];

    // Criar um material com cores diferentes para cada objeto
    const material1 = colors.map(color => new THREE.MeshBasicMaterial({
        color
    }));

    const material2 = new THREE.MeshBasicMaterial({
        color: 0x800080
    }); // Verde

    // Criar um cubo
    const geometry1 = new THREE.BoxGeometry(1, 1, 1);
    object1 = new THREE.Mesh(geometry1, material1);
    object1.position.set(0, 0, 0); // Posição do cubo

    // Criar uma esfera
    const geometry2 = new THREE.SphereGeometry(0.5, 32, 32);
    object2 = new THREE.Mesh(geometry2, material2);

    // Configurar a posição relativa da esfera em relação ao cubo
    object2.position.set(2, 0, 0); // Posição da esfera em relação ao cubo
    object1.add(object2); // Configurar a esfera como filha do cubo

    camera1.lookAt(object1.position); // Camera 1 aponta para object1 (cubo)
    camera2.lookAt(object2.position); // Camera 2 aponta para object2 (esfera)
    camera3.lookAt(object1.position); // Camera 3 aponta para object1 (cubo)
    camera4.lookAt(object2.position);

    scene.add(object1); // Adicionar o cubo à cena
}



// Função de animação
function animate() {
    requestAnimationFrame(animate);

    // Atualize o movimento dos objetos aqui
    object1.rotation.x += 0.01; // Rotação do cubo
    object1.rotation.y += 0.01;

    object2.position.x = Math.sin(Date.now() * 0.001) * 1.3; // Movimento horizontal sinusoidal da esfera
    object2.position.y = Math.cos(Date.now() * 0.001) * 1.2; // Movimento vertical sinusoidal da esfera

    renderer.render(scene, camera1); // Renderize a cena com a primeira câmera
    renderer.render(scene, camera2); // Renderize a cena com a primeira câmera
    renderer.render(scene, camera3); // Renderize a cena com a primeira câmera
    renderer.render(scene, camera4); // Renderize a cena com a primeira câmera

}


// Chamada das funções de inicialização
init();
createObjects();
const controls = new OrbitControls(camera1, renderer.domElement);
animate();
