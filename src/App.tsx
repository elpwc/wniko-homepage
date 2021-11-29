import { Col, Layout, Menu, Row, Select, Space } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./App.css";
import Blogs from "./pages/Blogs";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import {
  CurrentPageStorage,
  LangStorage,
  ProjectsStorage,
} from "./dataStorage/storage";
import { DevState, ProjectUtils } from "./utils/project";
import Illust from "./pages/Illust";
import Contact from "./pages/Contact";
import BackgroundImage from "./resource/bg.jpg";
import LangUtils, { Lang } from "./lang/langUtils";
import { TechnologyUtils } from "./utils/technology";
import { UsingTechs } from "./staticData/usingTechs";
import Main from "./Main";

const { Option } = Select;

function App(props: any) {
  const [update, setUpdate]: [boolean, any] = useState(false);

  const updateNow = () => {
    setUpdate(!update);
  };
  const L = LangUtils.selectLang();

  ProjectsStorage.set([
    ProjectUtils.create(
      "Wotageipedia - ヲタ芸百科",
      "御宅艺副歌技视频分类收录网站 (绝赞开发进行中♥)",
      DevState.Developping,
      [
        UsingTechs.reactjs,
        UsingTechs.sequelize,
        UsingTechs.nestjs,
        UsingTechs.antd,
        UsingTechs.typescript,
      ],
      "https://github.com/elpwc/wotageipedia"
    ),
    ProjectUtils.create(
      "アニメ整理 ANIMESEIRI",
      "一目了然的追番进度管理",
      DevState.Developping,
      [UsingTechs.php, UsingTechs.scss],
      "https://github.com/elpwc/ANIME-SEIRI.web",
      "http://www.elpwc.com/animeseiri"
    ),
    ProjectUtils.create(
      "City Counter Game",
      "猜城市名的web游戏 (待开发)",
      DevState.Planning
    ),
    ProjectUtils.create("RUA", "az", DevState.Done),
    ProjectUtils.create("RUA2", "az", DevState.Dispose),
  ]);

  const params = useParams();

  return (
    <div className="App">
      <Routes>
        <Route path=":lang" element={<Main />}>
          <Route index element={<Home />}></Route>
          <Route path="projects" element={<Projects />}></Route>
          <Route path="blog" element={<Blogs />}></Route>
          <Route path="illust" element={<Illust />}></Route>
          <Route path="contact" element={<Contact />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
