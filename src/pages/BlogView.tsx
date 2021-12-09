import { Button, Divider, Space } from 'antd';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Navigate, useLocation, useParams } from 'react-router';
import { CurrentPageStorage } from '../dataStorage/storage';
import init_debug_data from '../staticData/initDebugData';
import Blog, { BlogUtils } from '../utils/blog';
import Page404 from './404';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './blogView.css';

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
      <div style={{ position: 'absolute', top: '15px', left: '-50px' }}>
        <Link to={mylocation.pathname + '/..'}>
          <Button size='large' shape='circle'>
            <LeftOutlined />
          </Button>
        </Link>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '5px', padding: '20px 50px', marginTop: '8px' }}>
        <h1>{currentBlog.title}</h1>
        <Space>
          <p className='bloginfo'>{currentBlog.author}</p>
          <p className='bloginfo'>
            创建：
            {
              // @ts-ignore
              currentBlog.createTime.format('yyyy-MM-dd hh:mm:ss')
            }
          </p>
          <p className='bloginfo'>
            修改：
            {
              // @ts-ignore
              currentBlog.updateTime.format('yyyy-MM-dd hh:mm:ss')
            }
          </p>
          <p className='bloginfo'>
            访问量：
            {currentBlog.viewCount}
          </p>
        </Space>

        <Divider style={{ marginTop: '10px', marginBottom: '20px' }} />

        <ReactMarkdown children={currentBlog.content} />
      </div>
    </>
  );
}
