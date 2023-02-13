import * as THREE from 'three';

class CelestialObject {

    geometry;
    materiel;
    planet;
    position;
    texture;

    constructor(radius, widthSegments, heightSegments, texture, planetColor, x, y, z,) {
        this.geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments );
        this.materiel = new THREE.MeshPhongMaterial({color: planetColor});
        this.texture = new THREE.TextureLoader().load(texture);
        this.planet = new THREE.Mesh(this.geometry, this.materiel);
        this.planet.position.set(x, y, z);
    }

    updateX = (X) => {
        this.planet.position.x += X;
    }

    updateY = (Y) => {
        this.planet.position.y += Y;
    }

    updateZ = (Z) => {
        this.planet.position.z += Z;
    }
}

export default  CelestialObject;
