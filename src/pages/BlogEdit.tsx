import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Navigate, useLocation, useParams } from 'react-router';
import { CurrentPageStorage } from '../dataStorage/storage';
import init_debug_data from '../staticData/initDebugData';
import Blog, { BlogUtils } from '../utils/blog';
import Page404 from './404';
import { Link } from 'react-router-dom';
import './blogView.css';
import LangUtils from '../lang/langUtils';
import axios from 'axios';
import api from '../api';
import { createBlog } from '../services/api/blog';
import './BlogEdit.css';
import { isNull } from 'util';

interface P {
  update: boolean;
  setUpdate: () => void;
}

export default function BlogEdit(props: P) {
  const params = useParams();
  const mylocation = useLocation();

  const [markdownCode, setMarkdownCode]: [string, any] = useState('');
  const [title, setTitle]: [string, any] = useState('');
  const [author, setAuthor]: [string, any] = useState('');
  const [language, setLanguage]: [string, any] = useState('');
  const [location, setLocation]: [string, any] = useState('');
  const [access, setAccess]: ['public' | 'urasekai' | 'private', any] = useState('public');
  const [headPageUrl, setHeadPageUrl]: [string, any] = useState('');
  const [subject, setSubject]: [string, any] = useState('');

  let currentBlogid: number = 0;
  let currentBlog: Blog = BlogUtils.create('', '');

  useEffect(() => {
    CurrentPageStorage.set('blogs');
    props.setUpdate();
  }, []);

  currentBlogid = Number(params.blogid);

  const onDraftClick = () => {
    createBlog({
      title,
      author,
      viewCount: 0,
      subject,
      lang: language,
      location,
      content: markdownCode,
      headPageUrl,
      access,
      isDraft: true,
    })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onSaveClick = () => {
    createBlog({
      title,
      author,
      viewCount: 0,
      subject,
      lang: language,
      location,
      content: markdownCode,
      headPageUrl,
      access,
      isDraft: false,
    })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onHeadImageClick = () => {};

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '5px', padding: '20px 50px', marginTop: '8px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to={mylocation.pathname + '/..'}>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            </svg>
          </button>
        </Link>
        <button onClick={onHeadImageClick}>选择头图</button>
        <button onClick={onDraftClick}>保存草稿</button>
        <button style={{ color: 'white', backgroundColor: 'blueviolet' }} onClick={onSaveClick}>
          发布
        </button>
      </div>

      <h1>
        <input
          placeholder="标题"
          onChange={e => {
            setTitle(e.target.value);
          }}
          value={title}
          style={{ fontWeight: 'bold', fontSize: '20px', borderBottom: 'solid 1px lightgray' }}
        />
      </h1>
      <p className="bloginfo">
        <input
          placeholder="主题"
          onChange={e => {
            setSubject(e.target.value);
          }}
          value={subject}
        ></input>
      </p>

      <div id="editContainer">
        <textarea
          className="editor"
          rows={20}
          onChange={e => {
            setMarkdownCode(e.target.value);
          }}
        />
        <div
          className="editor"
          style={{
            border: 'solid 1px gray',
            padding: '5px',
          }}
        >
          <ReactMarkdown children={markdownCode} />
        </div>
      </div>
    </div>
  );
}
