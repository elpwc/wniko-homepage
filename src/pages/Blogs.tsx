import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogList from '../components/BlogList';
import FilterBar from '../components/FilterBar';
import { AdminModeStorage, CurrentPageStorage } from '../dataStorage/storage';
import init_debug_data from '../staticData/initDebugData';
import { findAllBlog } from '../services/api/blog';
import './Blogs.css';

interface P {
  update: boolean;
  setUpdate: () => void;
}

interface BlogSubject {
  name: string;
  sum: number;
}

const newBlogSubject = (name: string, sum: number = 1) => {
  return { name, sum } as BlogSubject;
};

export default function Blogs(props: P) {
  const [blogs, setBlogs]: [API.Blog[], any] = useState([]);
  const [blogSubjects, setBlogSubjects]: [BlogSubject[], any] = useState([]);
  const [selectedSubjectKey, setselectedSubjectKey]: [string, any] = useState('0');

  const getBlogs = (subject: string = '', includeDraft: boolean = false, onReceive?: (e: any) => void) => {
    findAllBlog({ params: { subject, includeDraft: includeDraft ? '1' : '0' } })
      .then((e: any) => {
        onReceive?.(e);
        console.log(e);
        const receivedBlogs = e.data;
        setBlogs(receivedBlogs as API.Blog[]);

        props.setUpdate();
      })
      .catch(error => {});
  };

  const updateSubjects = (receivedBlogs: API.Blog[]) => {
    let blogSubjectsTemp: BlogSubject[] = [];
    (receivedBlogs as API.Blog[]).forEach(blogItem => {
      const blogItemSubjects = blogItem.subject.split(',');

      blogItemSubjects.forEach(blogItemSubject => {
        const index = blogSubjectsTemp.findIndex(blogSubject => {
          return blogSubject.name === blogItemSubject;
        });
        console.log(index);
        if (index !== -1) {
          // 确保 sum 更新正确
          blogSubjectsTemp[index].sum++;
        } else {
          blogSubjectsTemp.push(newBlogSubject(blogItemSubject));
        }
      });
    });
    blogSubjectsTemp = [{ name: 'All', sum: receivedBlogs.length }, ...blogSubjectsTemp];
    setBlogSubjects(blogSubjectsTemp);
  };

  useEffect(() => {
    CurrentPageStorage.set('blogs');
    getBlogs('', AdminModeStorage.value === 1 ? true : false, e => {
      updateSubjects(e.data);
    });
    props.setUpdate();
  }, []);

  return (
    <>
      <div id="blogPageContainer">
        <div style={{ marginTop: '20px', borderRadius: '5px', minWidth: '15%' }}>
          {AdminModeStorage.value === 1 ? (
            <Link to="./new">
              <button style={{ marginBottom: '10px' }}>写博客</button>
            </Link>
          ) : (
            <></>
          )}
          <FilterBar
            update={props.update}
            setUpdate={props.setUpdate}
            items={blogSubjects.map((blogSubject, i) => {
              return {
                contents: (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{blogSubject.name === '' ? 'Others' : blogSubject.name}</span>
                    <span>{blogSubject.sum}</span>
                  </div>
                ),
                key: i.toString(),
              };
            })}
            selectedKey={selectedSubjectKey}
            onClick={e => {
              setselectedSubjectKey(e);
              if (e === '0') {
                getBlogs();
              } else {
                getBlogs(blogSubjects[Number(e)].name);
              }
            }}
          />
        </div>

        <BlogList update={props.update} setUpdate={props.setUpdate} blogs={blogs} />
      </div>
    </>
  );
}
