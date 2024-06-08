import React from 'react';
import { LangStorage } from '../dataStorage/storage';
import { Space } from 'antd';
import BlogCard from './BlogCard';
import Blog from '../utils/blog';

interface P {
  update: boolean;
  setUpdate: () => void;
  blogs?: API.Blog[];
}

// 监听滚动条位置，到最下面时加载更多
// TOD-O
/*
    由于 scroll 事件可被高频触发，事件处理程序
    不应该执行高性能消耗的操作，如DOM操作。而更
    推荐的做法是使用 requestAnimationFrame(), 
    setTimeout() 或 CustomEvent 给事件节流，如
    下所述。
    https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scroll_event
*/

document.addEventListener('scroll', (e: any) => {
  console.log(e.target.documentElement.scrollTop);
});

export default function TimeLine(props: P) {
  return (
    <>
      <Space direction="vertical" style={{ width: '-webkit-fill-available' }}>
        {props.blogs?.map((blog: API.Blog) => {
          return <BlogCard blog={blog} key={blog.id} />;
        })}
      </Space>
    </>
  );
}
