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
  const [title, setTitle]: [string, any] = useState('');
  const [author, setAuthor]: [string, any] = useState('');
  const [subjectModalVisibility, setSubjectModalVisibility]: [boolean, any] = useState(false);
  const [language, setLanguage]: [string, any] = useState('');
  const [location, setLocation]: [string, any] = useState('');
  const [access, setAccess]: ['public' | 'urasekai' | 'private', any] = useState('public');
  const [headPageUrl, setHeadPageUrl]: [string, any] = useState('');
  const [subjects, setSubjects]: [BlogSubject[], any] = useState([]);
  const [subjectid, setSubjectid]: [number, any] = useState(0);

  let currentBlogid: number = 0;
  let currentBlog: Blog = BlogUtils.create('', '');

  useEffect(() => {
    CurrentPageStorage.set('blogs');
    getSubjects();
    props.setUpdate();
  }, []);

  currentBlogid = Number(params.blogid);

  const onDraftClick = () => {
    axios({
      method: 'POST',
      url: api.url + api.blog,
      data: BlogUtils.create(title, markdownCode, author, 0, subjectid, language, location, access, headPageUrl, true),
    })
      .then(res => {
        console.log(res);
        message.success('????????????');
      })
      .catch(error => {
        console.log(error);
        message.error('????????????');
      });
  };

  const onSaveClick = () => {
    axios({
      method: 'POST',
      url: api.url + api.blog,
      data: BlogUtils.create(title, markdownCode, author, 0, subjectid, language, location, access, headPageUrl, false),
    })
      .then(res => {
        console.log(res);
        message.success('????????????');
      })
      .catch(error => {
        console.log(error);
        message.error('????????????');
      });
  };

  const onNewSubjectClick = (values: any) => {
    axios({
      method: 'POST',
      url: api.url + api.blogsubject,
      data: values,
    })
      .then(res => {
        console.log(res);
        message.success('????????????');
        getSubjects();
        setSubjectModalVisibility(false);
      })
      .catch(error => {
        console.log(error);
        message.error('????????????');
      });
  };

  const onHeadImageClick = () => {};

  const getSubjects = (id: number = 0) => {
    axios({
      method: 'GET',
      url: api.url + api.blogsubject + (id <= 0 ? '' : '/' + id),
    })
      .then(res => {
        console.log(res);
        setSubjects(res.data);
        console.log(114514, subjects);
      })
      .catch(error => {
        console.log(error);
        message.error('??????????????????');
      });
  };

  return (
    <>
      <ModalForm
        title={'????????????'}
        visible={subjectModalVisibility}
        okButtonTitle="??????"
        cancelButtonTitle="??????"
        onSubmit={values => {
          onNewSubjectClick(values);
        }}
        onCancel={error => {
          setSubjectModalVisibility(false);
        }}
        items={[
          {
            name: 'title',
            label: '??????',
            initialValue: '',
            child: <Input />,
          },
          {
            name: 'description',
            label: '??????',
            initialValue: '',
            child: <Input />,
          },
          {
            name: 'access',
            label: '????????????',
            initialValue: 'public',
            child: (
              <Select style={{ width: '100%' }} placeholder="??????????????????">
                {['private', 'urasekai', 'public'].map((value: string) => {
                  return (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  );
                })}
              </Select>
            ),
          },
        ]}
      />

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
            <Select
              style={{ width: '100%' }}
              placeholder="????????????"
              onChange={setSubjectid}
              dropdownRender={menu => (
                <div>
                  {menu}
                  <Divider style={{ margin: '4px 0' }} />
                  <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                    <button
                      style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer', border: 'none', background: 'none' }}
                      onClick={() => {
                        setSubjectModalVisibility(true);
                      }}
                    >
                      <PlusOutlined /> ????????????
                    </button>
                  </div>
                </div>
              )}
            >
              {subjects.map(item => {
                console.log(item);
                return (
                  <Option key={item.id} value={item.id}>
                    {item.title}
                  </Option>
                );
              })}
            </Select>

            <Input
              placeholder="??????"
              onChange={e => {
                setLanguage(e.target.value);
              }}
              value={language}
            ></Input>

            <Input
              placeholder="??????"
              onChange={e => {
                setLocation(e.target.value);
              }}
              value={location}
            ></Input>

            <Select
              style={{ width: '100%' }}
              placeholder="??????????????????"
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
          <Button onClick={onHeadImageClick}>????????????</Button>
          <Button onClick={onDraftClick}>????????????</Button>
          <Button onClick={onSaveClick}>??????</Button>
        </Space>
        <h1>
          <Input
            placeholder="??????"
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
              placeholder="??????"
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
            ?????????
            {
              // @ts-ignore
              currentBlog.createTime.format('yyyy-MM-dd hh:mm:ss')
            }
          </p>
          <p className='bloginfo'>
            ?????????
            {
              // @ts-ignore
              currentBlog.updateTime.format('yyyy-MM-dd hh:mm:ss')
            }
          </p>
          <p className='bloginfo'>
            ????????????
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
