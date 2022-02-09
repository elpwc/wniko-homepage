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
import axios from 'axios';
import api from '../api';

interface P {
  update: boolean;
  setUpdate: () => void;
}

// Exploring page for each blog.
export default function BlogView(props: P) {
  const params = useParams();
  const mylocation = useLocation();

  let currentBlogid: number = Number(params.blogid);

  const [blog, setBlog]: [Blog, any] = useState(BlogUtils.create('', ''));

  const getBlog = () => {
    axios({
      method: 'get',
      url: api.url + api.blog + '/' + currentBlogid,
    })
      .then(res => {
        setBlog(res.data);
      })
      .catch(error => {
        return <Page404 title={<>你要找的博客不存在捏</>} returnText={<>返回博客列表</>} returnRoute={mylocation.pathname + '/..'} />;
      });
  };

  useEffect(() => {
    CurrentPageStorage.set('blogs');
    getBlog();
    props.setUpdate();
  }, []);

  return (
    <>
      <div style={{ position: 'absolute', top: '15px', left: '-50px' }}>
        <Link to={mylocation.pathname + '/..'}>
          <Button size="large" shape="circle">
            <LeftOutlined />
          </Button>
        </Link>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '5px', padding: '20px 50px', marginTop: '8px' }}>
        <article>
          <h1>{blog.title}</h1>
          <Space>
            <p className="bloginfo">{blog.author}</p>
            <p className="bloginfo">
              创建：
              {
                // @ts-ignore
                (new Date(blog.createTime || '') as Date).format?.('yyyy-MM-dd hh:mm:ss')
              }
            </p>
            <p className="bloginfo">
              修改：
              {
                // @ts-ignore
                (new Date(blog.updateTime || '') as Date).format?.('yyyy-MM-dd hh:mm:ss')
              }
            </p>
            <p className="bloginfo">
              访问量：
              {blog.viewCount}
            </p>
          </Space>

          <Divider style={{ marginTop: '10px', marginBottom: '20px' }} />

          <ReactMarkdown children={blog.content} />
        </article>
      </div>
    </>
  );
}
