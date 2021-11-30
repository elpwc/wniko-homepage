import { useEffect } from 'react';
import { CurrentPageStorage } from '../dataStorage/storage';
import React from 'react';

interface P {
  update: boolean;
  setUpdate: () => void;
}

export default function Blogs(props: P) {
  useEffect(() => {
    CurrentPageStorage.set('blogs');
    props.setUpdate();
  }, []);
  return <>blog</>;
}
