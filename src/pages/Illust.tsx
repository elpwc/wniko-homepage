import { useEffect } from 'react';
import { CurrentPageStorage } from '../dataStorage/storage';

interface P {
  update: boolean;
  setUpdate: () => void;
}

export default function Illust(props: P) {
  useEffect(() => {
    CurrentPageStorage.set('illust');
    props.setUpdate();
  }, []);

  return <>i</>;
}
