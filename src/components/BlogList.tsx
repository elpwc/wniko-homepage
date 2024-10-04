import React from 'react';
import { LangStorage } from '../dataStorage/storage';
import { Space } from 'antd';
import BlogCard from './BlogCard';
import Blog from '../utils/blog';

interface P {
  update: boolean;
  setUpdate: () => void;
  blogs: API.Blog[];
}

export default function BlogList(props: P) {
  return (
    <div>
      {props.blogs
        ?.sort((a, b) => {
          return new Date(b.createtime).getTime() - new Date(a.createtime).getTime();
        })
        .map((blog: API.Blog) => {
          return <BlogCard blog={blog} key={blog.id} />;
        })}
    </div>
  );
}
