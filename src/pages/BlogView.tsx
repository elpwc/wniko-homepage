import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Navigate, useLocation, useParams } from 'react-router';
import { CurrentPageStorage } from '../dataStorage/storage';
import init_debug_data from '../staticData/initDebugData';
import Blog, { BlogUtils } from '../utils/blog';
import Page404 from './404';

interface P {
  update: boolean;
  setUpdate: () => void;
}

// Exploring page for each blog.
export default function BlogView(props: P) {
  const params = useParams();
  const mylocation = useLocation();

  let currentBlogid: number = 0;
  let currentBlog: Blog = BlogUtils.create('', '');

  useEffect(() => {
    CurrentPageStorage.set('blogs');
    props.setUpdate();
  }, []);

  currentBlogid = Number(params.blogid);
  if ((init_debug_data.blogs, BlogUtils.exist(currentBlogid))) {
    currentBlog = init_debug_data.blogs.filter((b) => {
      return b.id === currentBlogid;
    })[0];
  } else {
    return <Page404 title={<>你要找的博客不存在捏</>} returnText={<>返回博客列表</>} returnRoute={mylocation.pathname + '/..'} />;
  }

  return (
    <>
      {currentBlog.title},<ReactMarkdown children={currentBlog.content} />
    </>
  );
}
