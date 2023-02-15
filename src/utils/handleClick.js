export const handleClickObject = (intersects) => {
    if (intersects.length !== 0) {
        console.log(intersects[0])
        return jupiter
    }else{
        return null
    }

}
