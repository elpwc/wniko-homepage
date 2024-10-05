import React from 'react';
import { CurrentPageStorage, LangStorage } from '../dataStorage/storage';
import { UMenuItemData } from '../utils/umenu';
import { Link } from 'react-router-dom';
import './UMenuItem.css';

interface P {
  data: UMenuItemData;
  onClick: () => void;
}

export default function UMenuItem(props: P) {
  const isChecked = () => {
    return props.data.key === CurrentPageStorage.value;
  };

  return (
    <div className={'umenuitem' + (isChecked() ? ' checked' : '')} style={{ height: '100%', display: 'flex', flexDirection: 'column', borderBottomColor: props.data.focuscolor }}>
      <Link
        to={props.data.route}
        onClick={() => {
          props.onClick();
        }}
        style={{
          color: 'black',
          margin: '3px 10px',
          fontSize: '24px',
        }}
      >
        {props.data.title}
      </Link>
    </div>
  );
}
