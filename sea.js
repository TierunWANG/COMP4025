var scene, camera, renderer;
scene = new THREE.Scene();
var fov = 75,
    aspect = window.innerWidth / window.innerHeight;
camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
camera.position.z = 100;
camera.lookAt(scene.position);
renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xc4c4c4);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var clock = new THREE.Clock();

var tuniform = {
    iGlobalTime: {
        type: 'f',
        value: 0.1
    },
    iResolution: {
        type: 'v2',
        value: new THREE.Vector2()
    },
    iMouse: {
        type: 'v2',
        value: new THREE.Vector2()
    }
};
renderer.domElement.addEventListener('mousemove', function(e) {
    var canvas = renderer.domElement;
    var rect = canvas.getBoundingClientRect();
    tuniforms.mouse.value.x = (e.clientX - rect.left) / window.innerWidth * 2 - 1;
    tuniforms.mouse.value.y = (e.clientY - rect.top) / window.innerHeight * -2 + 1;
})
tuniform.iResolution.value.x = window.innerWidth;
tuniform.iResolution.value.y = window.innerHeight;
var material = new THREE.ShaderMaterial({
    uniforms: tuniform,
    vertexShader: document.getElementById('vertex-shader').textContent,
    fragmentShader: document.getElementById('fragment-shader').textContent
});
var mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40, 40), material
);
scene.add(mesh);

function render(time) {
    tuniform.iGlobalTime.value += clock.getDelta();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();