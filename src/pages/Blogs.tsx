import { Button } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import BlogList from '../components/BlogList';
import FilterBar from '../components/FilterBar';
import LeftContent from '../components/LeftContent';
import RightContent from '../components/RightContent';
import { AdminModeStorage, CurrentPageStorage } from '../dataStorage/storage';
import init_debug_data from '../staticData/initDebugData';
import Blog, { BlogUtils } from '../utils/blog';
import BlogSubject from '../utils/blogSubject';

interface P {
  update: boolean;
  setUpdate: () => void;
}

let blogSubjects: BlogSubject[] = [];

export default function Blogs(props: P) {
  const [blogs, setBlogs]: [Blog[], any] = useState([]);

  const getBlogs = () => {
    axios({
      method: 'get',
      url: api.url + api.blog,
    })
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    CurrentPageStorage.set('blogs');

    blogSubjects = init_debug_data.blogSubjects;
    getBlogs();
    props.setUpdate();
  }, []);
  return (
    <>
      <LeftContent update={props.update} setUpdate={props.setUpdate} marginRight={20}>
        <div style={{ marginTop: '20px', borderRadius: '5px' }}>
          {AdminModeStorage.value === 1 ? (
            <Link to='./new'>
              <Button style={{ marginBottom: '10px' }}>写博客</Button>
            </Link>
          ) : (
            <></>
          )}
          <FilterBar
            update={props.update}
            setUpdate={props.setUpdate}
            items={blogSubjects.map((sub) => {
              return { title: sub.title, key: String(sub.id) };
            })}
            selectedKey='1'
            onClick={() => {}}
          />
        </div>
      </LeftContent>
      <RightContent update={props.update} setUpdate={props.setUpdate}>
        <p>114514</p>
      </RightContent>
      <BlogList update={props.update} setUpdate={props.setUpdate} blogs={blogs}></BlogList>
    </>
  );
}
