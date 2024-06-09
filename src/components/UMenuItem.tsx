import React from 'react';
import { CurrentPageStorage, LangStorage } from '../dataStorage/storage';
import { Space } from 'antd';
import BlogCard from './BlogCard';
import Blog from '../utils/blog';
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
    <>
      <span>
        <Link
          className={'umenuitem' + (isChecked() ? ' checked' : '')}
          to={props.data.route}
          onClick={() => {
            props.onClick();
          }}
          style={{
            color: 'white',
            margin: '3px 10px',
          }}
        >
          {isChecked() ? '⇒' : ''}
          {props.data.title}
        </Link>
      </span>
    </>
  );
}
