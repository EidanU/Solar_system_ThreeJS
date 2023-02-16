import * as THREE from "three";
export const createPlanetPath = (planets, scene) => {
    planets.forEach((planet) => {
        if(planet.position.x !== 0) {
            const geometryPlanetPath = new THREE.TorusGeometry( planet.position.x,0.1, 3, 100);
            const materialPlanetPath = new THREE.MeshBasicMaterial( { color: "white" } );
            const planetPath = new THREE.Mesh( geometryPlanetPath, materialPlanetPath );
            planetPath.rotateX(  Math.PI / 2)
            scene.add(planetPath);
        }
    });
}
