import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Blogs from './pages/Blogs';
import Home from './pages/Home';
import Projects from './pages/Projects';
import { ProjectsStorage, AdminModeStorage, DeviceStorage } from './dataStorage/storage';
import { DevState, ProjectUtils } from './utils/project';
import Illust from './pages/Illust';
import Contact from './pages/Contact';
import LangUtils from './lang/langUtils';
import { UsingTechs } from './staticData/usingTechs';
import Main from './Main';
import Page404 from './pages/404';
import cookie from 'react-cookies';
import BlogView from './pages/BlogView';
import init_debug_data from './staticData/initDebugData';

function App() {
  const [update, setUpdate]: [boolean, any] = useState(false);

  const updateNow = () => {
    setUpdate(!update);
  };

  // 判断刷新后是否是管理员模式
  const isAdmin = sessionStorage.getItem('admin');
  if (isAdmin) {
    if (isAdmin === 'true') {
      AdminModeStorage.set(2);
    }
  } else {
    sessionStorage.setItem('admin', 'false');
    const isAdminFromCookie = cookie.load('auto-admin');
    console.log('cookie', isAdminFromCookie);
    if (isAdminFromCookie) {
      if (isAdminFromCookie === 'true') {
        AdminModeStorage.set(2);
      }
    } else {
      cookie.save('auto-admin', 'false', { path: '/' });
    }
  }

  // 判断设备
  const isMobile: boolean = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
  DeviceStorage.set(isMobile ? 1 : 0);
  console.log('device: ', isMobile);

  useEffect(() => {
    // 初始化数据
  }, []);

  init_debug_data();

  return (
    <div className='App'>
      <Routes>
        <Route index element={<Navigate to='/zh-cn' />}></Route>
        <Route
          path=':lang'
          element={
            <Main
              update={update}
              setUpdate={() => {
                updateNow();
              }}
            />
          }
        >
          <Route
            index
            element={
              <Home
                update={update}
                setUpdate={() => {
                  updateNow();
                }}
              />
            }
          ></Route>
          <Route
            path='projects'
            element={
              <Projects
                update={update}
                setUpdate={() => {
                  updateNow();
                }}
              />
            }
          ></Route>
          <Route
            path='blog'
            element={
              <Blogs
                update={update}
                setUpdate={() => {
                  updateNow();
                }}
              />
            }
          ></Route>
          <Route
            path='blog/:blogid'
            element={
              <BlogView
                update={update}
                setUpdate={() => {
                  updateNow();
                }}
              />
            }
          ></Route>
          <Route
            path='illust'
            element={
              <Illust
                update={update}
                setUpdate={() => {
                  updateNow();
                }}
              />
            }
          ></Route>
          <Route
            path='contact'
            element={
              <Contact
                update={update}
                setUpdate={() => {
                  updateNow();
                }}
              />
            }
          ></Route>
          <Route
            path='404'
            element={
              <Contact
                update={update}
                setUpdate={() => {
                  updateNow();
                }}
              />
            }
          ></Route>
          <Route path='*' element={<Page404 />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
