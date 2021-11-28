import { Col, Layout, Menu, Row, Select, Space } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Blogs from "./pages/Blogs";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import { ProjectsStorage } from "./dataStorage/storage";
import { DevState } from "./utils/project";
import Illust from "./pages/Illust";
import Contact from "./pages/Contact";
import BackgroundImage from "./resource/bg.jpg";
import { Lang } from "./lang/langUtils";

const { Option } = Select;

function App() {
  const [update, setUpdate]: [boolean, any] = useState(false);
  ProjectsStorage.set([
    {
      name: "Wotageipedia - ヲタ芸百科",
      description: "御宅艺副歌技视频分类收录网站 (绝赞开发进行中♥)",
      url: "#",
      githubUrl: "https://github.com/elpwc/wotageipedia",
      devState: DevState.Developping,
      version: "",
      startDate: "20210101180000",
    },
    {
      name: "アニメ整理 ANIMESEIRI",
      description: "一目了然的追番进度管理 (开发进行中+半弃坑)",
      url: "http://www.elpwc.com/animeseiri",
      githubUrl: "https://github.com/elpwc/ANIME-SEIRI.web",
      devState: DevState.Developping,
      version: "",
      startDate: "20210101180000",
    },
    {
      name: "City Counter Game",
      description: "猜城市名的web游戏 (待开发)",
      url: "",
      githubUrl: "",
      devState: DevState.Planning,
      version: "",
      startDate: "20210101180000",
    },
    {
      name: "RUA",
      description: "az",
      url: "http://www.elpwc.com/animeseiri",
      githubUrl: "https://github.com/elpwc/ANIME-SEIRI.web",
      devState: DevState.Done,
      version: "",
      startDate: "20210101180000",
    },
    {
      name: "RUsA",
      description: "az",
      url: "http://www.elpwc.com/animeseiri",
      githubUrl: "https://github.com/elpwc/ANIME-SEIRI.web",
      devState: DevState.Dispose,
      version: "",
      startDate: "20210101180000",
    },
  ]);

  return (
    <div className="App">
      <BrowserRouter>
        <Layout
          style={{
            position: "fixed",
            top: "0px",
            left: "0px",
            right: "0px",
            height: "60px",
            zIndex: "2",
          }}
        >
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["home"]}
              style={{ fontSize: "20px" }}
            >
              <Menu.Item key="home">
                <Link to="/">首页</Link>
              </Menu.Item>
              <Menu.Item key="projects">
                <Link to="/projects">项目</Link>
              </Menu.Item>
              <Menu.Item key="blogs">
                <Link to="/blog">博客</Link>
              </Menu.Item>
              <Menu.Item key="illust">
                <Link to="/illust">插画</Link>
              </Menu.Item>
              <Menu.Item key="contact">
                <Link to="/contact">联系</Link>
              </Menu.Item>

              <Menu.Item key="contact">
                <Select
                  defaultValue="zh_cn"
                  style={{ width: 120 }}
                  onChange={(value) => {}}
                >
                  {Object.keys(Lang)
                    .filter((k) => typeof Lang[k as any] === "number")
                    .map((lang: string) => {
                      return <Option value={lang}>{lang}</Option>;
                    })}
                </Select>
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
        <div
          style={{
            position: "fixed",
            top: "60px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            background: `url(${BackgroundImage})`,
            backgroundSize: `${window.innerWidth}px ${window.outerHeight}px`,
            zIndex: "0",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            zIndex: "1",
          }}
        >
          <Row>
            <Col span={12} offset={6}>
              <Routes>
                <Route index element={<Home />}></Route>
                <Route path="projects" element={<Projects />}></Route>
                <Route path="blog" element={<Blogs />}></Route>
                <Route path="illust" element={<Illust />}></Route>
                <Route path="contact" element={<Contact />}></Route>
              </Routes>
            </Col>
          </Row>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
