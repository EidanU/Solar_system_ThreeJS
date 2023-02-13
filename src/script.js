import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import CelestialObject from "./CelestialObject.js";

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
// const plutonTexture = new THREE.TextureLoader().load( 'textures/pluton.jpeg' );

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


function rotateAboutPoint(obj, point, axis, theta, pointIsWorld){
    pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;

    if(pointIsWorld){
        obj.parent.localToWorld(obj.position); // compensate for world coordinate
    }

    obj.position.sub(point); // remove the offset
    obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
    obj.position.add(point); // re-add the offset

    if(pointIsWorld){
        obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
    }

    obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}

const tick = () =>{

    const planetsRotationSpeed = [
        { name: sun, speed: 0.00025},
        { name: mercury, speed: 0.00025},
        { name: venus, speed: 0.00025},
        { name: earth, speed: 0.00125},
        { name: mars, speed: 0.00025},
        { name: jupiter, speed: 0.003},
        { name: saturne, speed: 0.00025},
        { name: uranus, speed: 0.00025},
        { name: neptune, speed: 0.00025},
    ]
    controls.update();
    //rotateAboutPoint(earth, new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 14, 14, 0 ).normalize(), 2 )
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

    planetsRotationSpeed.forEach((planet) => {
        planet.name.planet.rotateY(planet.speed);
    });
}

tick()


