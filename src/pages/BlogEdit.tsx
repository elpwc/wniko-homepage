import { Button, Divider, Space, Input, Select, message } from 'antd';
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
import axios from 'axios';
import api from '../api';
import ModalForm from '../components/ModalForm';
import BlogSubject from '../utils/blogSubject';
import { createBlog } from '../services/api/blog';

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
        message.success('储存成功');
      })
      .catch(error => {
        console.log(error);
        message.error('储存失败');
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
        message.success('储存成功');
      })
      .catch(error => {
        console.log(error);
        message.error('储存失败');
      });
  };

  const onHeadImageClick = () => {};

  return (
    <>
      <div style={{ position: 'absolute', top: '15px', left: '-50px' }}>
        <Link to={mylocation.pathname + '/..'}>
          <Button size="large" shape="circle">
            <LeftOutlined />
          </Button>
        </Link>
      </div>

      <RightContent update={props.update} setUpdate={props.setUpdate}>
        <div style={{ backgroundColor: 'white', borderRadius: '5px', marginTop: '5px', width: '200px', padding: '10px' }}>
          <Space direction="vertical">
            <Input
              placeholder="主题"
              onChange={e => {
                setSubject(e.target.value);
              }}
              value={subject}
            ></Input>
            <Input
              placeholder="语言"
              onChange={e => {
                setLanguage(e.target.value);
              }}
              value={language}
            ></Input>

            <Input
              placeholder="地点"
              onChange={e => {
                setLocation(e.target.value);
              }}
              value={location}
            ></Input>

            <Select
              style={{ width: '100%' }}
              placeholder="选择可访问性"
              onChange={e => {
                setAccess(e);
              }}
              value={access}
            >
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
          <Input
            placeholder="标题"
            onChange={e => {
              setTitle(e.target.value);
            }}
            value={title}
            bordered={false}
            style={{ fontWeight: 'bold', fontSize: '20px', borderBottom: 'solid 1px lightgray' }}
          />
        </h1>
        <Space>
          <p className="bloginfo">
            <Input
              placeholder="作者"
              onChange={e => {
                setAuthor(e.target.value);
              }}
              value={author}
              bordered={false}
              style={{ borderBottom: 'solid 1px lightgray' }}
            />
          </p>
          {/*
          
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
          */}
        </Space>

        <Divider style={{ marginTop: '10px', marginBottom: '20px' }} />

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextArea
            rows={20}
            style={{ width: '50%' }}
            onChange={e => {
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
