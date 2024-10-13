import { useEffect } from 'react';
import { CurrentPageStorage } from '../dataStorage/storage';
import './Illust.css';

interface P {
  update: boolean;
  setUpdate: () => void;
}

export default function Illust(props: P) {
  useEffect(() => {
    CurrentPageStorage.set('illust');
    props.setUpdate();
  }, []);

  return (
    <header>
      <p className="constructioninfo">🚧 Under Construction.</p>
    </header>
  );
}
