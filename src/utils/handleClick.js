import * as THREE from "three";

export const handleClickObject = (intersects, camera, jupiter) => {
    if (intersects.length !== 0) {
        console.log(intersects[0])
        return jupiter
    }else{
        return null
    }

}

export const handleFollow = (planet, sizes, camera) => {
    console.log(planet);
    if(planet){
        camera.position.set(
            planet.position.x + sizes.x + 10,
            planet.position.y + sizes.y + 10,
            planet.position.z + sizes.z + 10
        );
        camera.lookAt(planet.position);
    }
}
