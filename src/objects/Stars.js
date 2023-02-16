import * as THREE from "three";

export const addStars = (scene) => {

    for ( let z= -1000; z < 1000; z+=5 ) {

        const geometry   = new THREE.SphereGeometry(.4, 32, 32)
        const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        const sphere = new THREE.Mesh(geometry, material)

        sphere.position.x = (Math.random() * 1000 -500);
        sphere.position.y = (Math.random() * 1000 - 500);

        sphere.position.z = z;

        sphere.scale.x = sphere.scale.y = Math.floor(Math.random() * 3);

        //add the sphere to the scene
        scene.add( sphere );
    }
}
