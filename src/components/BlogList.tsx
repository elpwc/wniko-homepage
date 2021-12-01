import React from 'react';
import { LangStorage, BlogsStorage } from '../dataStorage/storage';
import { Space } from 'antd';
import BlogCard from './BlogCard';
import Blog from '../utils/blog';

interface P {
  update: boolean;
  setUpdate: () => void;
}

export default function BlogList(props: P) {
  return (
    <>
      <Space direction='vertical' style={{ width: '-webkit-fill-available' }}>
        {BlogsStorage.value.map((blog: Blog) => {
          return <BlogCard blog={blog} />;
        })}
      </Space>
    </>
  );
}
