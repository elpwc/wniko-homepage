import { useEffect } from "react";
import { CurrentPageStorage } from "../dataStorage/storage";


export default function Contact() {
    useEffect(() => {
        CurrentPageStorage.set('contact');
    }, []);

    return (<>
        c
    </>);
}