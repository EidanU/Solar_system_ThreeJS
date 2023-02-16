import {FontLoader} from "three/addons/loaders/FontLoader.js";
import {TextGeometry} from "three/addons/geometries/TextGeometry.js";
import * as THREE from "three";

class TextMesh {

    currentMesh;

    constructor(name, scene, camera) {
        const loader = new FontLoader();
        let textMesh = null;
        let planetName = name[0].toUpperCase() + name.slice(1).toLowerCase();
        loader.load('fonts/helvetiker_regular.typeface.json', (font) => {
            const textGeometry = new TextGeometry( planetName, {
                font: font,
                size: 1,
                height: 1,
            });
            const textMaterial = new THREE.MeshBasicMaterial(
                { color: 'white', specular: 0xffffff }
            );
            textMesh = new THREE.Mesh( textGeometry, textMaterial );
            scene.add(textMesh);
            textMesh.position.set(10, 80, 20);
            textMesh.rotateX(-80);
            textMesh.quaternion.copy(camera.quaternion);
            this.currentMesh = textMesh;
        })
    }
}

export default TextMesh;
