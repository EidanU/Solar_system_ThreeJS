export const updatePositions = (planets, sun, saturne, clock, timePassed) => {


    planets.forEach((planet) => {
        if(planet.name.planet){
            planet.name.planet.rotateY(planet.speed);
            planet.name.planet.position.x =
                (sun.planet.position.x + (Math.cos((clock.getElapsedTime()) * planet.velocity) * planet.position.x));
            planet.name.planet.position.z =
                ( sun.planet.position.z + (Math.sin((clock.getElapsedTime()) * planet.velocity) * planet.position.x));
        } else {
            //Saturne rings
            planet.name.rotateY(planet.speed);
            planet.name.position.x
                = saturne.planet.position.x + (Math.cos(clock.getElapsedTime()));
            planet.name.position.z
                = saturne.planet.position.z + (Math.sin(clock.getElapsedTime()));
        }
    });
}