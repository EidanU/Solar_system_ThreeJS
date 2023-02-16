import * as THREE from 'three';

import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import CelestialObject from "./CelestialObject.js";
import {Clock} from "three";
import {onPointerMove} from "./utils/pointerMove.js";
import {handleClickObject, handleFollow} from "./utils/handleClick.js";
import {updatePositions} from "./utils/updatePositions.js";
import {createPlanetPath} from "./utils/createPlanetPath.js";
import {TextGeometry} from "three/addons/geometries/TextGeometry.js";
import {FontLoader} from "three/addons/loaders/FontLoader.js";


//Scene
const scene = new THREE.Scene();
const clock = new Clock();

// Raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let intersects;
let planetToFollow;
let planetText;
let planetList = [];
let isZooming = false

//Load textures
const sunTexture = 'textures/solar-gif.gif';
const mercuryTexture = 'textures/mercury.jpeg';
const venusTexture = 'textures/venus.jpeg';
const earthTexture = 'textures/earth.jpeg';
const marsTexture = 'textures/mars.jpeg';
const jupiterTexture = 'textures/jupiter.jpeg';
const saturnTexture = 'textures/saturn.jpeg';
const uranusTexture = 'textures/uranus.jpeg';
const neptuneTexture = 'textures/neptune.jpeg';

//Sun
const sun = new CelestialObject(30, 32,16, sunTexture, 0, 0, 0, "sun" );
planetList.push(sun);
scene.add(sun.planet);


//Mercure
const mercury = new CelestialObject(1, 32,16,mercuryTexture, 35, 0, 0, "mercury" );
planetList.push(mercury);
scene.add(mercury.planet);

//Venus
const venus = new CelestialObject(1, 32,16, venusTexture, -42, 0, 0 , "venus");
venus.planet.rotateX(3.08923);
planetList.push(venus);
scene.add(venus.planet);


//Earth
const earth = new CelestialObject(2, 32,16, earthTexture, 49, 0, 0, "earth" );
earth.planet.rotateX(0.401426);
planetList.push(earth);
scene.add(earth.planet);

//Mars
const mars = new CelestialObject(1, 32,16, marsTexture, -56, 0, 0, "mars" );
mars.planet.rotateX(0.436332);
planetList.push(mars);
scene.add(mars.planet);

//Jupiter
const jupiter = new CelestialObject(4, 32,16, jupiterTexture, 67, 0, 0, "jupiter" );
jupiter.planet.rotateX(0.0523599);
planetList.push(jupiter);
scene.add(jupiter.planet);

//Saturne
const saturne = new CelestialObject(3, 32,16, saturnTexture, -84, 0, 0, "saturne" );
saturne.planet.rotateX(0.4537856);
planetList.push(saturne);
scene.add(saturne.planet);

//Saturne's rings
const geometrySaturneRings = new THREE.RingBufferGeometry( 5, 7, 64 );
const ringsTexture = new THREE.TextureLoader().load('https://i.postimg.cc/zz7Gr430/saturn-rings-top.png');
const pos = geometrySaturneRings.attributes.position;
const v3 = new THREE.Vector3();
for (let i = 0; i < pos.count; i++){
    v3.fromBufferAttribute(pos, i);
    geometrySaturneRings.attributes.uv.setXY(i, v3.length() < 6 ? 0 : 1, 1);
}
const materialSaturneRings = new THREE.MeshPhongMaterial( { map: ringsTexture, side: THREE.DoubleSide, transparent: true, color: 0xffffff} );

const saturneRings = new THREE.Mesh( geometrySaturneRings, materialSaturneRings );
saturneRings.rotateX(1)
saturneRings.position.set(-84, 0);
scene.add(saturneRings);

//Uranus
const uranus = new CelestialObject(1, 32,16, uranusTexture, 91, 0, 0, "uranus" );
uranus.planet.rotateX(1.692969);
planetList.push(uranus);
scene.add(uranus.planet);

//Neptune
const neptune = new CelestialObject(1, 32,16, neptuneTexture, -97, 0, 0, "neptune" );
neptune.planet.rotateX(0.4886922);
planetList.push(neptune);
scene.add(neptune.planet);

const ambientLight = new THREE.AmbientLight( "#ffffff",  1);
scene.add(ambientLight);

let w = 600;
let h = 400;
if (typeof window !== "undefined") {
     w = window.innerWidth;
     h = window.innerHeight;
}
//Sizes
const sizes = {
    width: w,
    height: h
}

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height );
camera.position.set(0, 0, 300);
scene.add(camera);


const canvas = document.querySelector('.webgl');

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;

const planets = [
    { name: sun, speed: 0.00025, position:{x: 0, y: 0, z: 0}, velocity: 0.1},
    { name: mercury, speed: 0.00025, position: {x: 35, y:0, z: 0}, velocity: 0.5},
    { name: venus, speed: 0.00025, position: {x:42, y:0, z: 0}, velocity: 0.2},
    { name: earth, speed: 0.00125, position: {x:49, y:0, z: 0}, velocity: 0.1},
    { name: mars, speed: 0.00025, position: {x:-56, y:0, z: 0 }, velocity: 0.6},
    { name: jupiter, speed: 0.003, position: {x:67, y:0, z: 0}, velocity: 0.2},
    { name: saturne, speed: 0.00025, position:  {x:-84, y: 0,z: 0}, velocity: 0.5},
    { name: uranus, speed: 0.00025, position: {x:91, y: 0, z: 0 }, velocity: 0.7},
    { name: neptune, speed: 0.00025, position: {x: -97, y:0, z: 0}, velocity: 0.2},
    { name: saturneRings, speed: 0.00025, position: {x: -84, y:0, z: 0}, velocity: 0.1},
];

//Create planet path
createPlanetPath(planets, scene);

const tick = async  () => {
    raycaster.setFromCamera( pointer, camera );
    intersects = raycaster.intersectObjects(scene.children);
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
    if (!isZooming) {
        updatePositions(planets, sun, saturne, clock);
        planetToFollow && handleFollow(planetToFollow.planet, planetToFollow.sizes, camera, controls);
        planetText && textFollow(planetText, planetToFollow, camera);
    }
}

tick();

window.addEventListener( 'pointermove',(e)=> onPointerMove(e,pointer) );
window.addEventListener( 'click', async () => {
    planetToFollow = handleClickObject(intersects, camera, planetList, planetToFollow)
    if(planetToFollow && intersects.length !== 0){
        isZooming = true
        //Text follow planet
        planetText && scene.remove(planetText.currentMesh);
        planetText = new TextMesh(planetToFollow.planet.name, scene, camera);
        isZooming = await cameraZooming(clock, controls, camera, planetToFollow);
    }
});

window.addEventListener('dblclick', () => {
    planetToFollow = null;
    dezoom(controls, camera, sun)
});

