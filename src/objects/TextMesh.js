import {FontLoader} from "three/addons/loaders/FontLoader.js";
import {TextGeometry} from "three/addons/geometries/TextGeometry.js";
import * as THREE from "three";

class TextMesh {

    currentMesh;

    constructor(name, scene, camera) {
        const loader = new FontLoader();
        let textMesh = null;
        loader.load('fonts/helvetiker_regular.typeface.json', (font) => {
            const textGeometry = new TextGeometry( name, {
                font: font,
                size: 1,
                height: 1,
                curveSegments: 1,
                bevelEnabled: true,
                bevelThickness: .1,
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
            this.currentMesh = textMesh;
        })
    }
}

export default TextMesh;
