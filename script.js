import * as THREE from 'three';

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
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();