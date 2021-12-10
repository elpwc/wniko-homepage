import React from 'react';
import { LangStorage } from '../dataStorage/storage';
import { Space } from 'antd';
import BlogCard from './BlogCard';
import Blog from '../utils/blog';

interface P {
  update: boolean;
  setUpdate: () => void;
  blogs: Blog[];
}

export default function BlogList(props: P) {
  return (
    <>
      <Space direction='vertical' style={{ width: '-webkit-fill-available' }}>
        {props.blogs.map((blog: Blog) => {
          return <BlogCard blog={blog} key={blog.id}/>;
        })}
      </Space>
    </>
  );
}
