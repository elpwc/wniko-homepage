import { useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router';
import { CurrentPageStorage } from '../dataStorage/storage';
import Blog, { BlogUtils } from '../utils/blog';
import Page404 from './404';

interface P {
  update: boolean;
  setUpdate: () => void;
}

// Exploring page for each blog.
export default function BlogView(props: P) {
  const [blog, setBlog]: [Blog, any] = useState(BlogUtils.create('', ''));
  const params = useParams();
  const mylocation = useLocation();
  let currentBlogid: number = 0;
  useEffect(() => {
    CurrentPageStorage.set('blogs');

    props.setUpdate();
  }, []);

  currentBlogid = Number(params.blogid);
  console.log(currentBlogid);

  if (BlogUtils.exist(currentBlogid)) {
    //setBlog();
  } else {
    return <Page404 title={<>你要找的博客不存在捏</>} returnText={<>返回博客列表</>} returnRoute={mylocation.pathname + '/..'} />;
  }

  return (
    <>
      {blog.title},{blog.content}
    </>
  );
}
