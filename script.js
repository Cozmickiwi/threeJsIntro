import * as THREE from 'three';
import WebGl from 'three/addons/capabilities/WebGl.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
/* Random bouncing and rotating cube
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 'BlueViolet'});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;
let ticker = 0;
let ticker2 = 0;
let reverse = false;
function animate(){
    
    requestAnimationFrame(animate);
    const ranNum = Math.random() * 20;
    if(ticker<ranNum && reverse == false){
        ticker+= .01;
    }
    else{
        reverse = true;
        ticker-= .01;
        if(ticker <= -ranNum){
            reverse = false
        }
    }
    cube.position.x = ticker+1;
    cube.position.y = ((ticker+1)/2);
    cube.scale.y = ticker;
    cube.scale.x = ticker+.5;
    cube.scale.z = ticker-.5;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

if(WebGl.isWebGLAvailable()){
    animate();
}
else{
    const warning = WebGl.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}
*/
let camera, scene, renderer;
scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));
const light = new THREE.SpotLight()
light.position.set(10, 10, 10)
scene.add(light)
renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true
const dirLight1 = new THREE.DirectionalLight( 'blue', 3 );
dirLight1.position.set( 1, 0.75, 0.5 );
scene.add( dirLight1 );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color('white')
camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.25, 2000);
camera.position.z = 2;
//renderer.useLegacyLights = false


//create a blue LineBasicMaterial

//scene.add(line);
function render(){
    renderer.render(scene, camera);
}

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

renderer.outputColorSpace = THREE.SRGBColorSpace;

const loader = new GLTFLoader();

    loader.load(
    'models/scene.gltf',
    function(gltf){
        scene.add( gltf.scene );
        const texture = new THREE.TextureLoader().load('textures/Planet_diffuse.jpeg' ); 
        // immediately use the texture for material creation 

    const material = new THREE.MeshBasicMaterial( { map:texture } );
    texture.colorSpace = THREE.SRGBColorSpace;
    mesh = new THREE.Mesh(material);

// UVs use the convention that (0, 0) corresponds to the upper left corner of a texture.
    texture.flipY = false;
		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
        
    render();
    
},
function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

}, function (error){
    console.error(error);
});

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = new Stats()
document.body.appendChild(stats.dom)


function animate() {
    requestAnimationFrame(animate)

    controls.update()

    render()

    stats.update()
}
animate();