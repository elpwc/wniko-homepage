import React from 'react';
import { LangStorage } from '../dataStorage/storage';
import { Space } from 'antd';
import BlogCard from './BlogCard';
import Blog from '../utils/blog';
import { UMenuItemData } from '../utils/umenu';
import UMenuItem from './UMenuItem';

interface P {
  items: UMenuItemData[];
  onCheck: (index: number) => void;
}

export default function UMenu(props: P) {
  return (
    <>
      <menu
        style={{
          display: 'flex',
          gap: '',
          width: '-webkit-fill-available',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        {props.items.map((item, i) => {
          return (
            <UMenuItem
              key={i}
              data={item}
              onClick={() => {
                props.onCheck(i);
              }}
            />
          );
        })}
      </menu>
    </>
  );
}
