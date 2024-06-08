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
      <Space direction="horizontal" style={{ width: '-webkit-fill-available' }}>
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
      </Space>
    </>
  );
}
