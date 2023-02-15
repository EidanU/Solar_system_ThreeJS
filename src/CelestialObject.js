import * as THREE from 'three';

class CelestialObject {

    geometry;
    materiel;
    planet;
    position;
    texture;

    constructor(radius, widthSegments, heightSegments, texture, x, y, z,name) {
        this.geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments );
        this.texture = new THREE.TextureLoader().load(texture);
        this.materiel = new THREE.MeshPhongMaterial({map: this.texture});
        //this.texture = new THREE.TextureLoader().load(texture);
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
