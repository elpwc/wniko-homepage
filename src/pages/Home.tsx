import { useEffect } from "react";
import { CurrentPageStorage } from "../dataStorage/storage";


export default function Home() {
    useEffect(() => {
        CurrentPageStorage.set('home');
    }, []);
    return (<>
        home
    </>);
}