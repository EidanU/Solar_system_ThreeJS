import * as THREE from "three";

export const handleClickObject = (intersects, camera, jupiter) => {
    if (intersects.length !== 0) {
        console.log(intersects[0])
        return jupiter
    }else{
        return null
    }
    return planets.filter((planet)=>{
        return planet.planet.name === intersects[0].object.name;
    })[0]
}

export const handleFollow = (planet, sizes, camera) => {
    console.log(planet)
    camera.lookAt(planet.position.x, planet.position.y, planet.position.z);
    camera.position.set(
        planet.position.x + sizes.x + 10,
        planet.position.y + sizes.y + 10,
        planet.position.z + sizes.z + 10
    );
}
