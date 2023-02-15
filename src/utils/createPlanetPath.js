import * as THREE from "three";
export const createPlanetPath = (planets, scene) => {
    planets.forEach((planet) => {
        if(planet.position.x !== 0) {
            const geometryPlanetPath = new THREE.TorusGeometry( planet.position.x,0.02, 3, 100);
            const materialPlanetPath = new THREE.MeshPhongMaterial( { color: "white" } );
            const planetPath = new THREE.Mesh( geometryPlanetPath, materialPlanetPath );
            planetPath.rotateX(  Math.PI / 2)
            scene.add(planetPath);
        }
    });
}
