export const handleClickObject = (intersects) => {
    if (intersects.length !== 0) {
        intersects[0].object.material.color.set(0xff0000);
    }
}
