import React from 'react';
import { LangStorage } from '../dataStorage/storage';
import BlogCard from './BlogCard';
import Blog from '../utils/blog';

interface P {
  update: boolean;
  setUpdate: () => void;
  blogs: API.Blog[];
}

export default function BlogList(props: P) {
  return (
    <div style={{ width: '-webkit-fill-available' , marginTop: '5px'}}>
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
