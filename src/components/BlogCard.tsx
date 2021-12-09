import { Card, Space, Tag, Tooltip } from 'antd';
import LangUtils from '../lang/langUtils';
import { GithubOutlined, SendOutlined } from '@ant-design/icons';
import Technology from '../utils/technology';
import Blog from '../utils/blog';

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
            <span>{props.blog.title}</span>
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
            <p>{props.blog.content}</p>
          </div>
        </Space>
      </Card>
    </>
  );
}
