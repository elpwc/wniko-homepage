import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
import { CurrentPageStorage } from '../dataStorage/storage';
import init_debug_data from '../staticData/initDebugData';
import Page404 from './404';
import { Link } from 'react-router-dom';
import './blogView.css';
import LangUtils from '../lang/langUtils';
import axios from 'axios';
import { createBlog, updateBlog } from '../services/api/blog';
import './BlogEdit.css';
import './blogStyle.css';
import 'highlight.js/styles/github.css';
import appconfig from '../appconfig';

interface P {
  update: boolean;
  setUpdate: () => void;
}

export default function BlogEdit(props: P) {
  const params = useParams();
  const mylocation = useLocation();
  const navigate = useNavigate();

  const [markdownCode, setMarkdownCode]: [string, any] = useState('');
  const [title, setTitle]: [string, any] = useState('');
  const [author, setAuthor]: [string, any] = useState('');
  const [language, setLanguage]: [string, any] = useState('');
  const [location, setLocation]: [string, any] = useState('');
  const [access, setAccess]: ['public' | 'urasekai' | 'private', any] = useState('public');
  const [headPageUrl, setHeadPageUrl]: [string, any] = useState('');
  const [subject, setSubject]: [string, any] = useState('');

  const [currentBlogid, setcurrentBlogid]: [number, any] = useState(0);
  /** 是否是打开了一个blog进行编辑，而不是新建 */
  const [isEditMode, setisEditMode]: [boolean, any] = useState(false);
  const [isDraft, setisDraft]: [string, any] = useState('');

  const getBlog = (id: number) => {
    axios({
      method: 'get',
      url: appconfig.api.url + appconfig.api.blog + '/' + id,
    })
      .then(res => {
        setisEditMode(true);
        const currentBlog: API.Blog = res.data;
        setMarkdownCode(currentBlog.content);
        setTitle(currentBlog.title);
        setAuthor(currentBlog.author);
        setLanguage(currentBlog.lang);
        setLocation(currentBlog.location);
        setAccess(currentBlog.access);
        setHeadPageUrl(currentBlog.headPageUrl);
        setSubject(currentBlog.subject);
        setisDraft(currentBlog.isDraft);
      })
      .catch(error => {
        navigate('/500');
      });
  };

  useEffect(() => {
    CurrentPageStorage.set('blogs');
    if (params.blogid !== undefined) {
      setcurrentBlogid(Number(params.blogid));
      getBlog(Number(params.blogid ?? '-1'));
    }

    props.setUpdate();
  }, []);

  const onDraftClick = () => {
    if (isEditMode) {
      updateBlog(
        { id: currentBlogid.toString() ?? '-1' },
        {
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
        }
      )
        .then((e: any) => {
          alert('suc');
          console.log(e);
        })
        .catch((e: any) => {
          alert('err');
          console.log(e);
        });
    } else {
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
          alert('suc');
          console.log(res);
        })
        .catch(error => {
          alert('err');
          console.log(error);
        });
    }
  };

  const onSaveClick = () => {
    if (isEditMode) {
      updateBlog(
        { id: currentBlogid.toString() ?? '-1' },
        {
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
        }
      )
        .then((e: any) => {
          alert('suc');
          console.log(e);
        })
        .catch((e: any) => {
          alert('err');
          console.log(e);
        });
    } else {
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
          alert('err');
          console.log(error);
        });
    }
  };

  const onHeadImageClick = () => {};

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '5px', padding: '20px 50px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to={isEditMode ? '/blogs/' + currentBlogid : '/blogs'}>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            </svg>
          </button>
        </Link>
        {/* <button onClick={onHeadImageClick}>选择头图</button> */}
        <button onClick={onDraftClick}>{isEditMode ? (isDraft ? '保存草稿' : '改为草稿') : '保存草稿'}</button>
        <button style={{ color: 'white', backgroundColor: 'blueviolet' }} onClick={onSaveClick}>
          {isEditMode ? (isDraft ? '发布' : '保存') : '发布'}
        </button>
      </div>

      <h1>
        <input
          placeholder="标题"
          onChange={e => {
            setTitle(e.target.value);
          }}
          value={title}
          style={{ fontWeight: 'bold', fontSize: '20px', borderBottom: 'solid 1px lightgray', width: '100%' }}
        />
      </h1>
      <p className="bloginfo">
        <input
          placeholder="主题"
          onChange={e => {
            setSubject(e.target.value);
          }}
          value={subject}
          style={{ width: '100%' }}
        ></input>
      </p>

      <div id="editContainer">
        <textarea
          className="editor"
          rows={20}
          onChange={e => {
            setMarkdownCode(e.target.value);
          }}
          value={markdownCode}
        ></textarea>
        <div
          className="editor"
          style={{
            border: 'solid 1px gray',
            padding: '20px',
          }}
        >
          <Markdown className="markdown-body" rehypePlugins={[rehypeHighlight, rehypeRaw]} remarkPlugins={[remarkGfm]} children={markdownCode} />
        </div>
      </div>
    </div>
  );
}
