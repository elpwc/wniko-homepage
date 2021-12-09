import { Card, Space, Tag, Tooltip } from 'antd';
import LangUtils from '../lang/langUtils';
import { GithubOutlined, SendOutlined } from '@ant-design/icons';
import Technology from '../utils/technology';
import Blog from '../utils/blog';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

interface P {
  blog: Blog;
}

export default function BlogCard(props: P) {
  const L = LangUtils.selectLang();

  return (
    <>
      <Card
        title={
          <>
            <span>{<Link to={'./'+props.blog.id}>{props.blog.title}</Link>}</span>
          </>
        }
        extra={
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Space></Space>
          </div>
        }
        style={{}}
      >
        <Space direction='vertical'>
          <div>
            <ReactMarkdown children={props.blog.content}/>
          </div>
        </Space>
      </Card>
    </>
  );
}
