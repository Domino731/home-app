export const getUnit = (unit, amount) => {
    const last = amount.toString().split('').pop();
    if (unit === "Na sztuki") {
        if(last === 1){
            return "sztuka"
        }
        else if(last === 2 || last === 3 || last === 4){
            return "sztuki"
        }
        else{
            return "sztuk"
        }
    }
    else {
        return unit
    }
}





