import { useEffect } from "react";
import { CurrentPageStorage } from "../dataStorage/storage";


export default function Illust() {

    useEffect(() => {
        CurrentPageStorage.set('illust');
    }, []);

    
    return (<>
        i
    </>);
}