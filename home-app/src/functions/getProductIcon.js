export const getProductIcon = (type) => {
    if(type === "meat"){
        return  <i className="fas fa-drumstick-bite"/>
    }
    else if (type === "vegetables"){
        return <i className="fas fa-carrot"/>
    }
    else if(type === "sugar"){
        return <i className="fas fa-candy-cane"/>
    }
    else if (type === "dairy"){
        return <i className="fas fa-cheese"/>
    }
    else if (type === "fruit"){
        return <i className="fas fa-apple-alt"/>
    }
    else if (type === "drinks"){
        return <i className="fas fa-wine-bottle"/>
    }
    else if (type === "frozenFood"){
        return <i className="fas fa-snowflake"/>
    }
    else{
        return <i className="fas fa-question"/>
    }

}