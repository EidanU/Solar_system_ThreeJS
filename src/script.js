import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

//Scene
const scene = new THREE.Scene();


//Sphere
const geometrySun = new THREE.SphereGeometry( 5, 32, 16 );
const materialSun = new THREE.MeshPhongMaterial({color: "#ff9800"})
const sun = new THREE.Mesh(geometrySun, materialSun);
sun.position.set(0,0,  )
scene.add(sun);

const geometryMercury = new THREE.SphereGeometry( 1, 32, 16 );
const materialMercury = new THREE.MeshPhongMaterial({color: "#724d00"})
const Mercury = new THREE.Mesh(geometryMercury, materialMercury);
Mercury.position.set(7,0)
scene.add(Mercury);

const geometryEarth = new THREE.SphereGeometry( 2, 32, 16 );
const materialEarth  = new THREE.MeshPhongMaterial({color: "#0a50ff"})
const earth = new THREE.Mesh(geometryEarth, materialEarth);
earth.position.set(14,0)
scene.add(earth);

const geometryMars = new THREE.SphereGeometry( 1, 32, 16 );
const materialMars  = new THREE.MeshPhongMaterial({color: "#833400"})
const mars = new THREE.Mesh(geometryMars, materialMars);
mars.position.set(21,0)
scene.add(mars);

const light = new THREE.DirectionalLight( "#ffffff", 1 );
light.position.set(70, 70, 0)
const ambientLight = new THREE.AmbientLight( "#ffffff",  .1);
scene.add(light);
scene.add(ambientLight);

let w;
let h;

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
camera.position.set(0, 0, 60);
scene.add(camera);

//Canvas
const canvas = document.querySelector('.webgl');

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

//Controles
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
const tick = ()=>{
    controls.update();
    rotateAboutPoint(earth, new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 14, 14, 0 ).normalize(), 2 )
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()


