import { useEffect } from "react";
import { CurrentPageStorage } from "../dataStorage/storage";

export default function Blogs() {
    useEffect(() => {
        CurrentPageStorage.set('blogs');
    }, []);
    return (<>
    blog
    </>);
}