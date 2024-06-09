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

  const [selectedMenu, setselectedMenu]: [number, any] = useState(0);

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

  return (
    <div className="main">
      <div
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          background: `url(${headerbg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `100%`,
          zIndex: -114514,
        }}
      ></div>
      <div style={{ height: '80%', margin: '45% 0' }}></div>
      {/*<div style={{ height: '5px', margin: '0', width: '100%', backgroundColor: 'rgb(18 21 22 / 61%)' }}></div>*/}
      <header
        style={{
          display: 'flex',
          position: 'sticky',
          top: '0px',
          padding: '5px 0',
          zIndex: 114514,
          color: 'white',
          backgroundColor: '#121516',
          boxShadow: 'rgb(18, 21, 22) 0px -30px 50px 50px' /*'0px 0px 5px 2px #121516'*/,
        }}
      >
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ padding: '0 10px' }}>
            <p style={{ width: 'max-content', height: '100%', padding: '1px 5px', margin: '0' }}>🌸 wniko's homepage</p>
          </div>
          <UMenu
            items={[
              { key: 'home', title: L.header.home, route: './' },
              { key: 'projects', title: L.header.projects, route: './projects' },
              { key: 'blogs', title: L.header.blogs, route: './blogs' },
              { key: 'photos', title: L.header.illust, route: './photos' },
              { key: 'contact', title: L.header.contact, route: './contact' },
            ]}
            onCheck={() => {}}
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
            <Select
              defaultValue="zh_cn"
              style={{ width: 120, backgroundColor: '#121516', color: 'black' }}
              onChange={value => {
                navigate(`/${value.replace('_', '-')}/` + mylocation.pathname.split('/').slice(2).join('/'));
                props.setUpdate();
              }}
            >
              {LangUtils.getEnumStrings().map((lang: string) => {
                if (appconfig.usingLanguages.includes(LangUtils.enumStrToLang(lang))) {
                  return (
                    <Option value={lang} key={lang}>
                      {lang}
                    </Option>
                  );
                } else {
                  return <></>;
                }
              })}
            </Select>
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
          backgroundColor: '#ffffff87',
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
