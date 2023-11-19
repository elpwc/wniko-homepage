import { Card, Space, Tag, Tooltip } from 'antd';
import LangUtils from '../lang/langUtils';
import { GithubOutlined, SendOutlined } from '@ant-design/icons';
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
            <span>{<Link to={'./' + props.blog.id}>{props.blog.title}</Link>}</span>
          </>
        }
        extra={
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Space></Space>
          </div>
        }
        style={{}}
      >
        <Space direction="vertical">
          <div style={{ height: '80px' }}>
            {/*<ReactMarkdown children={props.blog.content}/>*/}
            <Space>
              <p className="bloginfo">{props.blog.author}</p>
              <p className="bloginfo">
                创建：
                {
                  // @ts-ignore
                  (new Date(props.blog.createTime) as Date).format('yyyy-MM-dd hh:mm:ss')
                }
              </p>
              <p className="bloginfo">
                修改：
                {
                  // @ts-ignore
                  (new Date(props.blog.updateTime) as Date).format('yyyy-MM-dd hh:mm:ss')
                }
              </p>
              <p className="bloginfo">
                访问量：
                {props.blog.viewCount}
              </p>
            </Space>
          </div>
        </Space>
      </Card>
    </>
  );
}
