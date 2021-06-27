//simple function that returns string
// params //
// unit --> to check unit
// amount --> just amount :)
export const getUnit = (unit, amount) => {

    // holds last number, to know which string to return
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





