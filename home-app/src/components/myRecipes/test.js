import {useEffect} from "react";

export const Test = (props) => {
    useEffect(()=>{
        console.log(props.match.params.iden)
    }, [])
    return <h1>asdddddddddddddddd</h1>
}