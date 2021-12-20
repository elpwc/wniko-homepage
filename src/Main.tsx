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

  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  const currentLang: string = String(params.lang).toLowerCase().replace('-', '_');

  if (LangUtils.getEnumStrings().includes(currentLang)) {
    LangStorage.set(LangUtils.enumStrToLang(currentLang));
  } else {
    return <Navigate to='/zh-cn' />;
  }

  const L = LangUtils.selectLang();

  const leaveAdminBtn_onClick = () => {
    message.success('再会~');
    sessionStorage.setItem('admin', 'false');
    cookie.save('auto-admin', 'false', { path: '/' });
    // Close admin win
    setAdminWinState(0);
    // Set global win state
    AdminModeStorage.set(0);
    props.setUpdate();
  };

  const enterAdminBtn_onClick = () => {
    setPw('');
    setAdminWinState(1);
    props.setUpdate();
  };

  const adminMode_Model = (
    <Modal
      title='~里世界的入口~'
      visible={adminWinState === 1}
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
          message.warning('来自守门人的传话：咳..前往里世界的口令不对');
        }
        props.setUpdate();
      }}
      onCancel={() => {
        setAdminWinState(0);
        props.setUpdate();
      }}
      okText='进入里世界~'
      cancelText='算了'
    >
      <Space size='large'>
        <Input.Password
          placeholder='口令'
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          onChange={(e) => {
            setPw(e.target.value);
          }}
          value={pw}
        />
        <Checkbox
          onChange={(e) => {
            setRememberPw(e.target.checked);
          }}
        >
          以后直接进入里世界~
        </Checkbox>
      </Space>
    </Modal>
  );

  const langSelector = (
    <Select
      defaultValue='zh_cn'
      style={{ width: 120 }}
      onChange={(value) => {
        navigate(`/${value.replace('_', '-')}/` + mylocation.pathname.split('/').slice(2).join('/'));
        props.setUpdate();
      }}
    >
      {LangUtils.getEnumStrings().map((lang: string) => {
        if (appconfig.usingLanguages.includes(LangUtils.enumStrToLang(lang))) {
          return (
            <Option value={lang} key={lang}>
              {LangUtils.enumStrToLangName(lang)}
            </Option>
          );
        }
      })}
    </Select>
  );

  return (
    <div className='main' style={{ overflow: 'visible' }}>
      <div
        style={{
          top: '0px',
          left: '0px',
          right: '0px',
          height: '600px',
          zIndex: '2',
        }}
      ></div>
            <div
        style={{
          display: 'flex',
          position: 'sticky',
          top: '30px',
          bottom: '0px',
        }}
      >114514</div>
      <div
        style={{
          display: 'flex',
          position: 'sticky',
          top: '30px',
          bottom: '0px',
          zIndex: '2',
        }}
      >
        <Layout
          style={{
            top: '60px',
            left: '0px',
            right: '0px',
            height: '60px',
          }}
        >
          <Header className='header' style={{ padding: '0px', height: '60px', backgroundColor: 'white' }}>
            <div className='logo' />
            <Menu
              theme='light'
              mode='horizontal'
              defaultSelectedKeys={[CurrentPageStorage.value]}
              selectedKeys={[CurrentPageStorage.value]}
              style={{ fontSize: '15px', height: '60px' }}
              onClick={(key) => {
                CurrentPageStorage.set(key.key);
              }}
            >
              <Menu.Item key='home'>
                <Link to='./'>{L.header.home}</Link>
              </Menu.Item>
              <Menu.Item key='projects'>
                <Link to='./projects'>{L.header.projects}</Link>
              </Menu.Item>
              <Menu.Item key='blogs'>
                <Link to='./blog'>{L.header.blogs}</Link>
              </Menu.Item>
              <Menu.Item key='illust'>
                <Link to='./illust'>{L.header.illust}</Link>
              </Menu.Item>
              <Menu.Item key='contact'>
                <Link to='./contact'>{L.header.contact}</Link>
              </Menu.Item>

              <Menu.Item key='admin' disabled style={{ cursor: 'default', position: 'absolute', right: '200px' }}>
                {adminWinState === 2 ? (
                  <Button onClick={leaveAdminBtn_onClick}>退出adminMode</Button>
                ) : (
                  <>
                    <Button onClick={enterAdminBtn_onClick}>喵🐾</Button>
                    {adminMode_Model}
                  </>
                )}
              </Menu.Item>

              <Menu.Item key='langsele' disabled style={{ cursor: 'default', position: 'absolute', width: '200px', right: '0px' }}>
                {langSelector}
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
        
      </div>

      <div style={{}}>
          <div
            style={{
              position: 'absolute',
              top: '650px',
              left: '0px',
              right: '0px',
              height: '100%',
              background: `url(${BackgroundImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: `100%`,
              zIndex: '0',
              backgroundColor: 'rgb(20,20,20)',
            }}
          ></div>
          <div
            style={{
            }}
          >
            <Row>
              <Col span={DeviceStorage.value === 1 ? 22 : 14} offset={DeviceStorage.value === 1 ? 1 : 5}>
                <Outlet />
              </Col>
            </Row>
          </div>
        </div>
    </div>
  );
}

export default Main;
