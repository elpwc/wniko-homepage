import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
import { AdminModeStorage, CurrentPageStorage } from '../dataStorage/storage';
import init_debug_data from '../staticData/initDebugData';
import { BlogUtils } from '../utils/blog';
import { Link, useSearchParams } from 'react-router-dom';
import './blogView.css';
import './blogStyle.css';
import 'highlight.js/styles/github.css';
import axios from 'axios';
import appconfig from '../appconfig';

interface P {
  update: boolean;
  setUpdate: () => void;
}

// Exploring page for each blog.
export default function BlogView(props: P) {
  const params = useParams();
  const [queryParams] = useSearchParams();
  const mylocation = useLocation();
  const navigate = useNavigate();

  let currentBlogid: number = Number(params.blogid);

  const [blog, setBlog]: [API.Blog, any] = useState(BlogUtils.initializeBlog());
  /** 是否是从home跳转来的 */
  const [isFromHome, setisFromHome]: [boolean, any] = useState(false);
  const [isloading, setisloading]: [boolean, any] = useState(true);

  const getBlog = () => {
    setisloading(true);
    axios({
      method: 'get',
      url: appconfig.api.url + appconfig.api.blog + '/' + currentBlogid,
    })
      .then(res => {
        if (res.data === '') {
          navigate('/404');
        } else {
          setBlog(res.data);
        }

        setisloading(false);
      })
      .catch(error => {
        navigate('/500');

        setisloading(false);
      });
  };

  useEffect(() => {
    const from = queryParams.get('from');
    if (from) {
      setisFromHome(true);
    }
    CurrentPageStorage.set('blogs');
    getBlog();
    props.setUpdate();
  }, []);

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '5px', marginTop: '8px', marginBottom: '100px', minHeight: window.innerHeight + 'px' }}>
      <article>
        <div id="articleHeader" style={{ padding: '20px 50px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link to={isFromHome ? '/' : mylocation.pathname + '/..'}>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                </svg>
              </button>
            </Link>
            {AdminModeStorage.value === 1 ? (
              <Link to={'/blogs/new/' + blog.id}>
                <button>编辑</button>
              </Link>
            ) : (
              <></>
            )}
            <h1>
              {isloading ? (
                'Loading...'
              ) : blog.isDraft ? (
                <>
                  <span style={{ color: 'blue' }}>〈DRAFT〉</span>
                  {blog.title}
                </>
              ) : (
                blog.title
              )}
            </h1>
          </div>

          <p className="bloginfo">
            {
              // @ts-ignore
              new Date(blog.createtime).format('yyyy-MM-dd hh:mm:ss')
            }
            &nbsp;&nbsp;&nbsp;
            {blog.subject !== '' ? blog.subject : ''}
          </p>
        </div>

        <div style={{ padding: '20px 50px 100px 50px' }}>
          <Markdown className="markdown-body" rehypePlugins={[rehypeHighlight, rehypeRaw]} remarkPlugins={[remarkGfm]} children={blog.content} />
        </div>
      </article>
    </div>
  );
}
