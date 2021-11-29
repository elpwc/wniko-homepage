import { Col, Layout, Menu, Row, Select } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import {
  CurrentPageStorage,
  LangStorage,
  ProjectsStorage,
} from "./dataStorage/storage";
import BackgroundImage from "./resource/bg.jpg";
import LangUtils from "./lang/langUtils";

const { Option } = Select;

interface P {
  update: boolean;
  setUpdate: () => void;
}

function Main(props: P) {
  const [update, setUpdate]: [boolean, any] = useState(false);

  const updateNow = () => {
    setUpdate(!update);
  };

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang: string = String(params.lang)
    .toLowerCase()
    .replace("-", "_");

  if (LangUtils.getEnumStrings().includes(currentLang)) {
    LangStorage.set(LangUtils.enumStrToLang(currentLang));
  } else {
    return <Navigate to="/zh-cn" />;
  }

  const L = LangUtils.selectLang();

  return (
    <div className="main">
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
                  //console.log(value, location.pathname.split('/').slice(2).join('/'));
                  navigate(
                    `/${value.replace("_", "-")}/` +
                      location.pathname.split("/").slice(2).join("/")
                  );
                  props.setUpdate();
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
