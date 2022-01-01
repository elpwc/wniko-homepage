import { Button, Divider, Space, Input, Select } from 'antd';
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
import RightContent from '../components/RightContent';
import { PlusOutlined } from '@ant-design/icons';
import LangUtils from '../lang/langUtils';

const { TextArea } = Input;
const { Option } = Select;

interface P {
  update: boolean;
  setUpdate: () => void;
}

export default function BlogEdit(props: P) {
  const params = useParams();
  const mylocation = useLocation();

  const [markdownCode, setMarkdownCode]: [string, any] = useState('');
  const [newSubjectName, setNewSubjectName]: [string, any] = useState('');

  let currentBlogid: number = 0;
  let currentBlog: Blog = BlogUtils.create('', '');

  useEffect(() => {
    CurrentPageStorage.set('blogs');
    props.setUpdate();
  }, []);

  currentBlogid = Number(params.blogid);

  const onDraftClick = () => {};

  const onSaveClick = () => {};

  const onNewSubjectClick = () => {};

  const onHeadImageClick = () => {};

  return (
    <>
      <div style={{ position: 'absolute', top: '15px', left: '-50px' }}>
        <Link to={mylocation.pathname + '/..'}>
          <Button size='large' shape='circle'>
            <LeftOutlined />
          </Button>
        </Link>
      </div>

      <RightContent update={props.update} setUpdate={props.setUpdate}>
        <div style={{ backgroundColor: 'white', borderRadius: '5px', marginTop: '5px' }}>
          <Space direction='vertical'>
          <Select
            style={{ width: '100%' }}
            placeholder='选择主题'
            dropdownRender={(menu) => (
              <div>
                <Divider style={{ margin: '4px 0' }} />
                <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                  <Input
                    style={{ flex: 'auto' }}
                    value={newSubjectName}
                    onChange={(e) => {
                      setNewSubjectName(e.target.value);
                    }}
                  />
                  <a style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }} onClick={onNewSubjectClick}>
                    <PlusOutlined /> 添加主题
                  </a>
                </div>
              </div>
            )}
          >
            {/*items.map((item) => (
              <Option key={item}>{item}</Option>
            ))*/}
          </Select>

          <Select style={{ width: '100%' }} placeholder='选择语言'>
            {LangUtils.getEnumStrings().map((lang: string) => {
              return (
                <Option key={lang} value={lang}>
                  {LangUtils.enumStrToLangName(lang)}
                </Option>
              );
            })}
          </Select>

          <Input placeholder='地点'></Input>

          <Select style={{ width: '100%' }} placeholder='选择可访问性'>
            {['private', 'urasekai', 'public'].map((value: string) => {
              return (
                <Option key={value} value={value}>
                  {value}
                </Option>
              );
            })}
          </Select>
          </Space>

        </div>
      </RightContent>

      <div style={{ backgroundColor: 'white', borderRadius: '5px', padding: '20px 50px', marginTop: '8px' }}>
        <Space>
          <Button onClick={onHeadImageClick}>选择头图</Button>
          <Button onClick={onDraftClick}>保存草稿</Button>
          <Button onClick={onSaveClick}>发布</Button>
        </Space>
        <h1>
          <Input placeholder='标题' bordered={false} style={{ fontWeight: 'bold', fontSize: '20px', borderBottom: 'solid 1px lightgray' }} />
        </h1>
        <Space>
          <p className='bloginfo'>
            <Input placeholder='作者' bordered={false} style={{ borderBottom: 'solid 1px lightgray' }} />
          </p>
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

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextArea
            rows={20}
            style={{ width: '50%' }}
            onChange={(e) => {
              setMarkdownCode(e.target.value);
            }}
          />
          <div
            style={{
              border: 'solid 1px gray',
              marginLeft: '5px',
              padding: '5px',
              width: '50%',
            }}
          >
            <ReactMarkdown children={markdownCode} />
          </div>
        </div>
      </div>
    </>
  );
}
