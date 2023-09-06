# Processamento-grafico
Trabalho de processamento gráfico, ilustrando e definindo conceitos aprendidos em aula.
-----------------------------------------------------------------
- Ilustração dos conceitos de: visão de câmeras (ortográfica e perspectiva), iluminação e, rotação e translação de objetos 3D, baseados em uma exposição de pedras preciosas para a demonstração do conhecimento.
-----------------------------------------------------------------
Especificações atendidas:
- Criação de 5 objetos 3D, cada objeto feito por um integrante, com exceção do objeto que possui a classe RawShaderMaterial, em que foi empregado o trabalho de todos os participantes.
- Os objetos possuem rotação de maneira automática e translação quando é clicado nas setas direcionadas.
- O objeto 3D ilustrado como um anel, possui a implementação da classe RawShaderMaterial.
- Foram definidas duas câmeras, ortográfica e perspectiva, de modo que são alteradas quando é clicado nos botões localizados nos cantos laterais superiores.
- Movimentação dos objetos acontece por meio das setas direcionadas, quando clicado na seta apontada para esquerda os objetos se movimentam para a esquerda, da mesma forma que quando é clicado na seta com direção a direita, os objetos se movimentam para a direita. 
-----------------------------------------------------------------
Modo de interação:
- É possível movimentar os objetos por meio das duas setas.
- É possível alterar a câmera da cena por meio dos botões definidos com a descrição de câmera, lembrando que para esse botão modificar a câmera da cena é necessário estar com uma câmera diferente da desejada.
-----------------------------------------------------------------
Princípais características implementadas:
- Câmera ortográfica e perspectiva, por meio de new THREE.OrthographicCamera e new THREE.PerspectiveCamera respectivamente. Dessa forma é possível visualizar a cena de duas formas diferentes e entender o conceito das câmeras de forma prática.
- Definição dos objetos 3D (formas geométricas), Icosaedro (Esmeralda), paralelepípedo retangular (barra de ouro), Tetraedro (Diamante), Octaedro (Ruby), Tórus (Anel). 
- Iluminação da cena e sombra em cada objeto. Visualização prática da iluminação na cena.
- Uso da classe RawShaderMaterial para visualização mais avançada e personalizada dos dados.
-----------------------------------------------------------------
Modo de uso:
1. Instale o Node.js em: https://nodejs.org/en
2. Instale o three.js
# three.js
npm install --save three
3. Instale o vite
# vite
npm install --save-dev vite
# execute o vite
npx vite
