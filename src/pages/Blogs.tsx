import { useEffect } from 'react';
import BlogList from '../components/BlogList';
import { CurrentPageStorage } from '../dataStorage/storage';
import init_debug_data from '../staticData/initDebugData';

interface P {
  update: boolean;
  setUpdate: () => void;
}

export default function Blogs(props: P) {
  useEffect(() => {
    CurrentPageStorage.set('blogs');
    props.setUpdate();
  }, []);
  return <><BlogList update={props.update} setUpdate={props.setUpdate} blogs={init_debug_data.blogs}></BlogList></>;
}
