import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Blogs from './pages/Blogs';
import Home from './pages/Home';
import Projects from './pages/Projects';
import { AdminModeStorage, DeviceStorage } from './dataStorage/storage';
import Illust from './pages/Illust';
import LangUtils from './lang/langUtils';
import Main from './Main';
import Page404 from './pages/404';
import cookie from 'react-cookies';
import BlogView from './pages/BlogView';
import TestPage from './pages/test';
import BlogEdit from './pages/BlogEdit';
import 'animate.css';
import Page500 from './pages/500';

function App() {
  const [update, setUpdate]: [boolean, any] = useState(false);

  const updateNow = () => {
    setUpdate(!update);
  };

  // 判断刷新后是否是管理员模式
  const isAdmin = sessionStorage.getItem('admin');
  if (isAdmin) {
    if (isAdmin === 'true') {
      AdminModeStorage.set(1);
    }
  } else {
    sessionStorage.setItem('admin', 'false');
    const isAdminFromCookie = cookie.load('auto-admin');
    console.log('cookie', isAdminFromCookie);
    if (isAdminFromCookie) {
      if (isAdminFromCookie === 'true') {
        AdminModeStorage.set(1);
      }
    } else {
      cookie.save('auto-admin', 'false', { path: '/' });
    }
  }

  // 判断设备
  const isMobile: boolean = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
  DeviceStorage.set(isMobile ? 1 : 0);
  //console.log('device: ', isMobile);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
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
            path="projects"
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
            path="blogs"
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
            path="blogs/:blogid"
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
            path="blogs/new"
            element={
              <BlogEdit
                update={update}
                setUpdate={() => {
                  updateNow();
                }}
              />
            }
          ></Route>
          <Route
            path="blogs/new/:blogid"
            element={
              <BlogEdit
                update={update}
                setUpdate={() => {
                  updateNow();
                }}
              />
            }
          ></Route>
          <Route
            path="illust"
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
            path="test"
            element={
              <TestPage
                update={update}
                setUpdate={() => {
                  updateNow();
                }}
              />
            }
          ></Route>
          <Route path="404" element={<Page404 />}></Route>
          <Route path="500" element={<Page500 />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
