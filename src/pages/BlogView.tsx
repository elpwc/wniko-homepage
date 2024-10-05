import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Navigate, useLocation, useParams } from 'react-router';
import { CurrentPageStorage } from '../dataStorage/storage';
import init_debug_data from '../staticData/initDebugData';
import Blog, { BlogUtils } from '../utils/blog';
import Page404 from './404';
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
    <div style={{ backgroundColor: 'white', borderRadius: '5px', marginTop: '8px', minHeight: window.innerHeight + 'px' }}>
      <article>
        <div id="articleHeader" style={{ padding: '20px 50px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link to={mylocation.pathname + '/..'}>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                </svg>
              </button>
            </Link>
            <h1>{blog.title}</h1>
          </div>

          <p className="bloginfo">
            {
              // @ts-ignore
              new Date(blog.createtime).format('yyyy-MM-dd hh:mm:ss')
            }
          </p>
        </div>

        <div className="divideLine"></div>
        <div style={{ padding: '20px 50px' }}>
          <ReactMarkdown children={blog.content} />
        </div>
      </article>
    </div>
  );
}
