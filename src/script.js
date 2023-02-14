import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import CelestialObject from "./CelestialObject.js";
import {Clock} from "three";

//Scene
const scene = new THREE.Scene();

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
const sun = new CelestialObject(30, 32,16, sunTexture, 0, 0, 0 );
scene.add(sun.planet);

//Mercure
const mercury = new CelestialObject(1, 32,16,mercuryTexture, 35, 0, 0 );
scene.add(mercury.planet);

//Venus
const venus = new CelestialObject(1, 32,16, venusTexture, -42, 0, 0 );
venus.planet.rotateX(3.08923);
scene.add(venus.planet);

//Earth
const earth = new CelestialObject(2, 32,16, earthTexture, 49, 0, 0 );
earth.planet.rotateX(0.401426)
scene.add(earth.planet);

//Mars
const mars = new CelestialObject(1, 32,16, marsTexture, -56, 0, 0 );
mars.planet.rotateX(0.436332)
scene.add(mars.planet);

//Jupiter
const jupiter = new CelestialObject(4, 32,16, jupiterTexture, 67, 0, 0 );
jupiter.planet.rotateX(0.0523599);
scene.add(jupiter.planet);

//Saturne
const saturne = new CelestialObject(3, 32,16, saturnTexture, -84, 0, 0 );
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
const uranus = new CelestialObject(1, 32,16, uranusTexture, 91, 0, 0 );
uranus.planet.rotateX(1.692969);
scene.add(uranus.planet);

//Neptune
const neptune = new CelestialObject(1, 32,16, neptuneTexture, -97, 0, 0 );
neptune.planet.rotateX(0.4886922);
scene.add(neptune.planet);

//Pluton





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
    { name: sun, speed: 0.00025, position:{x: 0, y: 0, z: 0}, velocity: 1.001},
    { name: mercury, speed: 0.00025, position: {x:35, y:0, z: 0}, velocity: 1.002},
    { name: venus, speed: 0.00025, position: {x:42, y:0, z: 0}, velocity: 1.006},
    { name: earth, speed: 0.00125, position: {x:49, y:0, z: 0}, velocity: 1.008},
    { name: mars, speed: 0.00025, position: {x:-56, y:0, z: 0 }, velocity: 1.004},
    { name: jupiter, speed: 0.003, position: {x:67, y:0, z: 0}, velocity: 1.006},
    { name: saturne, speed: 0.00025, position:  {x:-84, y: 0,z: 0}, velocity: 1.009},
    { name: uranus, speed: 0.00025, position: {x:91, y: 0, z: 0 }, velocity: 1.007},
    { name: neptune, speed: 0.00025, position: {x: -97, y:0, z: 0}, velocity: 1.001},
    { name: saturneRings, speed: 0.00025, position: {x: -84, y:0, z: 0}, velocity: 1.007},
];

//planet path
planets.forEach((planet, index) => {
    if(planet.position.x !== 0) {
        const geometryPlanetPath = new THREE.TorusGeometry( planet.position.x,0.02, 3, 100);
        const materialPlanetPath = new THREE.MeshPhongMaterial( { color: "white" } );
        const planetPath = new THREE.Mesh( geometryPlanetPath, materialPlanetPath );
        planetPath.rotateX(  Math.PI / 2)
        scene.add(planetPath);
    };
});

const tick = () => {
    controls.update();
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

    planets.forEach((planet) => {
        if(planet.name.planet){
            planet.name.planet.rotateY(planet.speed);
            planet.name.planet.position.x =
                (sun.planet.position.x + (Math.cos(clock.getElapsedTime() * planet.velocity) * planet.position.x));
            planet.name.planet.position.z =
                ( sun.planet.position.z + (Math.sin(clock.getElapsedTime() * planet.velocity) * planet.position.x));
        } else {
            //Saturne rings
            planet.name.rotateY(planet.speed);
            planet.name.position.x
                = sun.planet.position.x + (Math.cos(clock.getElapsedTime()) * planet.position.x);
            planet.name.position.z
                = sun.planet.position.z + (Math.sin(clock.getElapsedTime()) * planet.position.x);
        }

    });
}

tick();

//reacaster