// Seu shader personalizado
const customShader = {
    uniforms: {
        time: { value: 0.0 }, // Variável de tempo para animação
    },
    
    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    
    fragmentShader: `
        uniform float time;
        void main() {
            // Crie uma cor com base no tempo
            vec3 color = vec3(0.5 + 0.5 * sin(time), 0.0, 0.0); // Vermelho

            gl_FragColor = vec4(color, 1.0);
        }
    `
};
