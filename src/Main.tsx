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

const { Option } = Select;

function Main(props: any) {
  const [update, setUpdate]: [boolean, any] = useState(false);

  const updateNow = () => {
    setUpdate(!update);
  };
  const L = LangUtils.selectLang();

  const params = useParams();

  console.log(114514, params.lang);
  return (
    <div className="App">
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
            defaultSelectedKeys={[CurrentPageStorage.value]}
            selectedKeys={[CurrentPageStorage.value]}
            style={{ fontSize: "20px" }}
            onClick={(key) => {
              CurrentPageStorage.set(key.key);
            }}
          >
            <Menu.Item key="home">
              <Link to="./">{L.header.home}</Link>
            </Menu.Item>
            <Menu.Item key="projects">
              <Link to="./projects">{L.header.projects}</Link>
            </Menu.Item>
            <Menu.Item key="blogs">
              <Link to="./blog">{L.header.blogs}</Link>
            </Menu.Item>
            <Menu.Item key="illust">
              <Link to="./illust">{L.header.illust}</Link>
            </Menu.Item>
            <Menu.Item key="contact">
              <Link to="./contact">{L.header.contact}</Link>
            </Menu.Item>

            <Menu.Item key="langsele">
              <Select
                defaultValue="zh_cn"
                style={{ width: 120 }}
                onChange={(value) => {
                  console.log(value);
                  LangStorage.set(LangUtils.enumStrToLang(value));
                  updateNow();
                }}
              >
                {LangUtils.getEnumStrings().map((lang: string) => {
                  return (
                    <Option value={lang}>
                      {LangUtils.enumStrToLangName(lang)}
                    </Option>
                  );
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
          backgroundRepeat: "no-repeat",
          backgroundSize: `100%`,
          zIndex: "0",
          backgroundColor: "rgb(20,20,20)",
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
            <Outlet />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Main;
