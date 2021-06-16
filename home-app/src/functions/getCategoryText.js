
export const getCategoryText = (text) => {
    if(text === "cakes"){
        return "Ciasta"
    }
    else if(text === "desserts"){
        return "Desery"
    }
    else if(text === "dinners"){
        return "Obiady"
    }
    else if(text === "salads"){
        return "Sałatki"
    }
    else if(text === "soup"){
        return "Zupy"
    }
    else if(text === "fasts"){
        return "Na szybko"
    }
    else if(text === "specials"){
        return "Specjalne"
    }
    else{
        return "(dodaj tłumaczenie)"
    }
}
