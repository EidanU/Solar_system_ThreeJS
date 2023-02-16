import gsap from "gsap";

export const cameraZooming = async (clock, controls,camera, planetToFollow) => {
    clock.running = false;
    controls.target.set(
        planetToFollow.planet.position.x,
        planetToFollow.planet.position.y,
        planetToFollow.planet.position.z
    );
    await gsap.to(camera.position,
        {
            z: planetToFollow.planet.position.z +  planetToFollow.sizes.x + 10,
            x: planetToFollow.planet.position.x + planetToFollow.sizes.y + 10,
            y: planetToFollow.planet.position.y + planetToFollow.sizes.z + 10,
            duration: 2
        }
    );

    clock.running = true;
    return false;
}

export const dezoom = (control, camera, sun) => {
    control.target.set(
        sun.planet.position.x,
        sun.planet.position.y,
        sun.planet.position.z
    );
    camera.position.set(0,0,0);
    gsap.to(camera.position,
        {
            z: sun.planet.position.z +  sun.sizes.x + 10,
            x: sun.planet.position.x + sun.sizes.y + 10,
            y: sun.planet.position.y + sun.sizes.z + 10,
            duration: 2
        }
    );
    camera.lookAt(0,0,0)
}
