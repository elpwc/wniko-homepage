import { Timeline } from 'antd';
import { useEffect } from 'react';
import TimeLine from '../components/TimeLine';
import { CurrentPageStorage } from '../dataStorage/storage';

interface P {
  update: boolean;
  setUpdate: () => void;
}

export default function Home(props: P) {
  useEffect(() => {
    CurrentPageStorage.set('home');
    props.setUpdate();
  }, []);

  return (
    <>
      <TimeLine update={props.update} setUpdate={props.setUpdate} />
    </>
  );
}
