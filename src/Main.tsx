import { Button, Checkbox, Col, Input, Layout, Menu, message, Modal, Row, Select, Space } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { Link, Navigate, Outlet, useNavigate, useParams, useLocation } from 'react-router-dom';
import { CurrentPageStorage, LangStorage, AdminModeStorage, DeviceStorage } from './dataStorage/storage';
import BackgroundImage from './resource/bg.jpg';
import LangUtils from './lang/langUtils';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { AdminPassword } from './staticData/adminPassword';
import cookie from 'react-cookies';
import appconfig from './appconfig';
import UMenu from './components/UMenu';
import headerbg from './resource/headerbg.jpg';
import './Main.css';

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

  // Inputed admin password in Admin Win
  const [pw, setPw]: [string, any] = useState('');
  // Admin Win para
  const [rememberPw, setRememberPw]: [boolean, any] = useState(false);
  // Admin Win state
  const [adminWinState, setAdminWinState]: [number, any] = useState(AdminModeStorage.value === 1 ? 2 : 0); // 0 not admin, 1 open requireWin, 2 admin mode

  const [langSelectMenuVisible, setLangSelectedMenuVisible]: [boolean, any] = useState(false);

  const [currentPageIndex, setcurrentPageIndex]: [number, any] = useState(0);

  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  const currentLang: string = String(params.lang).toLowerCase().replace('-', '_');

  if (LangUtils.getEnumStrings().includes(currentLang)) {
    LangStorage.set(LangUtils.enumStrToLang(currentLang));
  } else {
    return <Navigate to="/zh-cn" />;
  }

  const L = LangUtils.selectLang();

  const onLangSelectClick = (lang: string) => {
    navigate(`/${lang.replace('_', '-')}/` + mylocation.pathname.split('/').slice(2).join('/'));
    props.setUpdate();
    setLangSelectedMenuVisible(false);
  };

  const onLangSelectButtonClick = () => {
    setLangSelectedMenuVisible(!langSelectMenuVisible);
  };

  const themeColor = [
    ['#686868', '#FFFFFF'],
    ['#ff7875', '#ffdbdb'],
    ['#ffb729', '#fff2d7'],
    ['#f87bff', '#fce8ff'],
    ['#f87bff', '#fce8ff'],
  ];

  return (
    <div className="main">
      {langSelectMenuVisible ? (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1145141919, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '3px', padding: '10px' }}>
            <p>Select language</p>
            <div>
              {LangUtils.getEnumStrings().map((lang: string) => {
                if (appconfig.usingLanguages.includes(LangUtils.enumStrToLang(lang))) {
                  return (
                    <div
                      className="langSelectItem"
                      key={lang}
                      onClick={() => {
                        onLangSelectClick(lang);
                      }}
                    >
                      {lang}
                    </div>
                  );
                }
                return <></>;
              })}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {/*<div style={{ height: '5px', margin: '0', width: '100%', backgroundColor: 'rgb(18 21 22 / 61%)' }}></div>*/}
      <header
        style={{
          display: 'flex',
          top: '0px',
          left: '0',
          right: '0',
          padding: '0 0',
          zIndex: 114514,
          color: 'white',
          backgroundColor: '#FFFFFF',
          position: 'fixed',
          boxShadow: '1px 1px 9px 0px rgb(222 232 241)' /*'0px 0px 5px 2px #121516'*/,
        }}
      >
        <div style={{ display: 'flex', width: '100%', paddingTop: '10px' }}>
          <UMenu
            items={[
              { key: 'home', title: L.header.home, route: './', focuscolor: themeColor[0][0] },
              { key: 'projects', title: L.header.projects, route: './projects', focuscolor: themeColor[1][0] },
              { key: 'blogs', title: L.header.blogs, route: './blogs', focuscolor: themeColor[2][0] },
              { key: 'photos', title: L.header.illust, route: './photos', focuscolor: themeColor[3][0] },
              { key: 'contact', title: L.header.contact, route: './contact', focuscolor: themeColor[4][0] },
            ]}
            onCheck={index => {
              setcurrentPageIndex(index);
            }}
          />
          <div style={{ display: 'flex' }}>
            <div style={{ alignContent: 'center' }}>
              {adminWinState === 2 ? (
                <Button
                  onClick={() => {
                    message.success('再会~');
                    sessionStorage.setItem('admin', 'false');
                    cookie.save('auto-admin', 'false', { path: '/' });
                    // Close admin win
                    setAdminWinState(0);
                    // Set global win state
                    AdminModeStorage.set(0);
                    props.setUpdate();
                  }}
                >
                  退出adminMode
                </Button>
              ) : (
                <>
                  <a
                    onClick={() => {
                      setPw('');
                      setAdminWinState(1);
                      props.setUpdate();
                    }}
                    style={{
                      color: 'white',
                      padding: '0 5px',
                      margin: '0 10px',
                    }}
                  >
                    ◇
                  </a>
                  <Modal
                    title="E'яkesaru osokōy!"
                    open={adminWinState === 1}
                    // 登录
                    onOk={() => {
                      if (pw === AdminPassword) {
                        if (rememberPw) {
                          cookie.save('auto-admin', 'true', { path: '/' });
                          console.log(1141514, cookie.load('auto-admin'));
                        }
                        sessionStorage.setItem('admin', 'true');
                        message.success('欢迎来到里世界~');
                        setAdminWinState(2);
                        // Set global user mode to ADMIN
                        AdminModeStorage.set(1);
                      } else {
                        setAdminWinState(0);
                      }
                      props.setUpdate();
                    }}
                    onCancel={() => {
                      setAdminWinState(0);
                      props.setUpdate();
                    }}
                    okText="?"
                    closeIcon={null}
                  >
                    <Space size="large">
                      <Input.Password
                        placeholder="Ōgna"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={e => {
                          setPw(e.target.value);
                        }}
                        value={pw}
                      />
                      <Checkbox
                        onChange={e => {
                          setRememberPw(e.target.checked);
                        }}
                      >
                        Urяh in'яkesaru in'ustesukoч arakerok.
                      </Checkbox>
                    </Space>
                  </Modal>
                </>
              )}
            </div>
            <div style={{ display: 'flex' }}>
              <button style={{ backgroundColor: 'transparent', border: 'none', padding: '0 5px', cursor: 'pointer' }} onClick={onLangSelectButtonClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        style={{
          position: 'initial',
          top: '60px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          paddingTop: '5%',
          zIndex: '-5',
          backgroundColor: themeColor[currentPageIndex][1],
          backdropFilter: 'blur(10px)',
          minHeight: '1000px',
        }}
      >
        <Row>
          <Col span={DeviceStorage.value === 1 ? 22 : 14} offset={DeviceStorage.value === 1 ? 1 : 5}>
            <Outlet />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Main;
