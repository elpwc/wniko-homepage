import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Blogs from './pages/Blogs';
import Home from './pages/Home';
import Projects from './pages/Projects';
import { ProjectsStorage } from './dataStorage/storage';
import { DevState, ProjectUtils } from './utils/project';
import Illust from './pages/Illust';
import Contact from './pages/Contact';
import LangUtils from './lang/langUtils';
import { UsingTechs } from './staticData/usingTechs';
import Main from './Main';
import Page404 from './pages/404';

function App() {
  const [update, setUpdate]: [boolean, any] = useState(false);

  const updateNow = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    // 初始化数据
  }, []);

  ProjectsStorage.set([
    ProjectUtils.create(
      'Wotageipedia - ヲタ芸百科',
      '御宅艺副歌技视频分类收录网站 (绝赞开发进行中♥)',
      DevState.Developping,
      [UsingTechs.reactjs, UsingTechs.sequelize, UsingTechs.nestjs, UsingTechs.antd, UsingTechs.typescript],
      'https://github.com/elpwc/wotageipedia'
    ),
    ProjectUtils.create(
      'アニメ整理 ANIMESEIRI',
      '一目了然的追番进度管理',
      DevState.Developping,
      [UsingTechs.php, UsingTechs.scss],
      'https://github.com/elpwc/ANIME-SEIRI.web',
      'http://www.elpwc.com/animeseiri'
    ),
    ProjectUtils.create('City Counter Game', '猜城市名的web游戏 (待开发)', DevState.Planning),
    ProjectUtils.create('RUA', 'az', DevState.Done),
    ProjectUtils.create('RUA2', 'az', DevState.Dispose),
  ]);

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
          <Route path='*' element={<Page404 />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
