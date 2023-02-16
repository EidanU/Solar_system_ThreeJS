export const textFollow = (planetText, planetToFollow, camera) => {
    planetText.currentMesh && planetText.currentMesh.lookAt(camera.position);
    planetText.currentMesh && planetToFollow && planetText.currentMesh.position.set(
        planetToFollow.planet.position.x,
        planetToFollow.planet.position.y + 5,
        planetToFollow.planet.position.z
    );
}