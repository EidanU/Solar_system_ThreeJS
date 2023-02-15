import * as THREE from "three";
import {FontLoader} from "three/addons/loaders/FontLoader.js";
import {TextGeometry} from "three/addons/geometries/TextGeometry.js";

export const loadText = (scene, camera) => {

    let loader = new FontLoader();
    let textMesh = null;

    let meshArray = [];
    loader.load( 'fonts/helvetiker_regular.typeface.json', ( font ) => {
       console.log('test')
        const textGeometry = new TextGeometry( 'Solar system', {
            font: font,
            size: 7,
            height: 5,
            curveSegments: 10,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: .1,
            bevelOffset: 0,
            bevelSegments: 1
        });

        const textMaterial = new THREE.MeshBasicMaterial(
            { color: 'white', specular: 0xffffff }
        );

        textMesh = new THREE.Mesh( textGeometry, textMaterial );
        scene.add(textMesh);
        textMesh.position.set(10, 80, 20);
        textMesh.quaternion.copy(camera.quaternion);
        meshArray.push(textMesh);
    });
   if(meshArray.length){
       return meshArray[0];
   }
}
