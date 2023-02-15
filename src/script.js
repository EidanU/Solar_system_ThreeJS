import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import CelestialObject from "./CelestialObject.js";
import {Clock} from "three";
import {onPointerMove} from "./utils/pointerMove.js";
import {handleClickObject, handleFollow} from "./utils/handleClick.js";
import {updatePositions} from "./utils/updatePositions.js";
import {createPlanetPath} from "./utils/createPlanetPath.js";

//Scene
const scene = new THREE.Scene();

// Raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let intersects;
let planetToFollow;

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

scene.add(sun.planet);


//Mercure
const mercury = new CelestialObject(1, 32,16,mercuryTexture, 35, 0, 0, "mercury" );
scene.add(mercury.planet);

//Venus
const venus = new CelestialObject(1, 32,16, venusTexture, -42, 0, 0 , "venus");
venus.planet.rotateX(3.08923);
scene.add(venus.planet);


//Earth
const earth = new CelestialObject(2, 32,16, earthTexture, 49, 0, 0, "earth" );
earth.planet.rotateX(0.401426)
scene.add(earth.planet);

//Mars
const mars = new CelestialObject(1, 32,16, marsTexture, -56, 0, 0, "mars" );
mars.planet.rotateX(0.436332)
scene.add(mars.planet);

//Jupiter
const jupiter = new CelestialObject(4, 32,16, jupiterTexture, 67, 0, 0, "jupiter" );
jupiter.planet.rotateX(0.0523599);
scene.add(jupiter.planet);

//Saturne
const saturne = new CelestialObject(3, 32,16, saturnTexture, -84, 0, 0, "saturne" );
saturne.planet.rotateX(0.4537856);
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
scene.add(uranus.planet);

//Neptune
const neptune = new CelestialObject(1, 32,16, neptuneTexture, -97, 0, 0, "neptune" );
neptune.planet.rotateX(0.4886922);
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
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.set(0, 0, 300);
scene.add(camera);

//Canvas
const canvas = document.querySelector('.webgl');

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const clock = new Clock();

const planets = [
    { name: sun, speed: 0.00025, position:{x: 0, y: 0, z: 0}, velocity: 1.0001},
    { name: mercury, speed: 0.00025, position: {x: 35, y:0, z: 0}, velocity: 1.0002},
    { name: venus, speed: 0.00025, position: {x:42, y:0, z: 0}, velocity: 1.0006},
    { name: earth, speed: 0.00125, position: {x:49, y:0, z: 0}, velocity: 1.0008},
    { name: mars, speed: 0.00025, position: {x:-56, y:0, z: 0 }, velocity: 1.0004},
    { name: jupiter, speed: 0.003, position: {x:67, y:0, z: 0}, velocity: 1.0006},
    { name: saturne, speed: 0.00025, position:  {x:-84, y: 0,z: 0}, velocity: 1.0009},
    { name: uranus, speed: 0.00025, position: {x:91, y: 0, z: 0 }, velocity: 1.0007},
    { name: neptune, speed: 0.00025, position: {x: -97, y:0, z: 0}, velocity: 1.0001},
    { name: saturneRings, speed: 0.00025, position: {x: -84, y:0, z: 0}, velocity: 1.0007},
];

//Create planet path
createPlanetPath(planets, scene);


const tick = () => {
    raycaster.setFromCamera( pointer, camera );
    intersects = raycaster.intersectObjects( scene.children );
    planetToFollow && handleFollow(planetToFollow.planet, planetToFollow.sizes, camera);
    controls.update();
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
    updatePositions(planets, sun, saturne, clock);
}

tick();

window.addEventListener( 'pointermove',(e)=> onPointerMove(e,pointer) );
window.addEventListener( 'click', () => planetToFollow = handleClickObject(intersects, camera, jupiter));

