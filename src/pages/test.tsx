import { useEffect } from 'react';
//import UniEditorTextbox from '../components/UniEditor/Components/UniEditorTextbox';
import { CurrentPageStorage } from '../dataStorage/storage';

interface P {
  update: boolean;
  setUpdate: () => void;
}

export default function TestPage(props: P) {
  useEffect(() => {
    CurrentPageStorage.set('test');
    props.setUpdate();
  }, []);
  return <></>;
}
