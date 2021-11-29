import { useEffect } from "react";
import { CurrentPageStorage } from "../dataStorage/storage";

interface P {
    update: boolean;
    setUpdate: () => void;
}

export default function Contact(props: P) {
    useEffect(() => {
        CurrentPageStorage.set('contact');
    props.setUpdate();
    }, []);

    return (<>
        c
    </>);
}