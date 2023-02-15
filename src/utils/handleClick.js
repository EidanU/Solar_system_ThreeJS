import * as THREE from "three";

export const handleClickObject = (intersects, camera, planets) => {
    if (intersects.length === 0) {
        return null
    }

    return planets.filter((planet)=>{
        return planet.planet.name === intersects[0].object.name;
    })[0]
}

export const handleFollow = (planet, sizes, camera, control) => {

    //orbit controll
    control.target.set(
        planet.position.x,
        planet.position.y,
        planet.position.z
    );
    camera.position.set(
        planet.position.x + sizes.x + 10,
        planet.position.y + sizes.y + 10,
        planet.position.z + sizes.z + 10
    );
    camera.lookAt(planet.position.x, planet.position.y, planet.position.z);
}
