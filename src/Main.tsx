import { Button, Col, Input, Layout, Menu, message, Modal, Row, Select, Space } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { Link, Navigate, Outlet, useNavigate, useParams, useLocation } from 'react-router-dom';
import { CurrentPageStorage, LangStorage, ProjectsStorage, AdminModeStorage } from './dataStorage/storage';
import BackgroundImage from './resource/bg.jpg';
import LangUtils from './lang/langUtils';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { AdminPassword } from './staticData/adminPassword';
const { Option } = Select;

interface P {
  update: boolean;
  setUpdate: () => void;
}

function Main(props: P) {
  const [update, setUpdate]: [boolean, any] = useState(false);
  const [pw, setPw]: [string, any] = useState('');

  const updateNow = () => {
    setUpdate(!update);
  };

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang: string = String(params.lang).toLowerCase().replace('-', '_');

  if (LangUtils.getEnumStrings().includes(currentLang)) {
    LangStorage.set(LangUtils.enumStrToLang(currentLang));
  } else {
    return <Navigate to='/zh-cn' />;
  }

  const L = LangUtils.selectLang();

  return (
    <div className='main'>
      <Layout
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          right: '0px',
          height: '60px',
          zIndex: '2',
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
              {AdminModeStorage.value === 2 ? (
                <Button
                  onClick={() => {
                    message.success('再会~');
                    AdminModeStorage.set(0);
                    props.setUpdate();
                  }}
                >
                  退出adminMode
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setPw('');
                      AdminModeStorage.set(1);
                      props.setUpdate();
                    }}
                  >
                    喵🐾
                  </Button>
                  <Modal
                    title='~里世界的入口~'
                    visible={AdminModeStorage.value === 1}
                    onOk={() => {
                      if (pw === AdminPassword) {
                        message.success('欢迎来到里世界~');
                        AdminModeStorage.set(2);
                      } else {
                        message.warning('来自守门人的传话：咳..前往里世界的口令不对');
                      }
                      props.setUpdate();
                    }}
                    onCancel={() => {
                      AdminModeStorage.set(0);
                      props.setUpdate();
                    }}
                    okText='进入里世界~'
                    cancelText='算了'
                  >
                    <Input.Password
                      placeholder='口令'
                      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      onChange={(e) => {
                        setPw(e.target.value);
                      }}
                      value={pw}
                    />
                  </Modal>
                </>
              )}
            </Menu.Item>

            <Menu.Item key='langsele' disabled style={{ cursor: 'default', position: 'absolute', width: '200px', right: '0px' }}>
              <Select
                defaultValue='zh_cn'
                style={{ width: 120 }}
                onChange={(value) => {
                  navigate(`/${value.replace('_', '-')}/` + location.pathname.split('/').slice(2).join('/'));
                  props.setUpdate();
                }}
              >
                {LangUtils.getEnumStrings().map((lang: string) => {
                  return <Option value={lang}>{LangUtils.enumStrToLangName(lang)}</Option>;
                })}
              </Select>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
      <div
        style={{
          position: 'fixed',
          top: '60px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          background: `url(${BackgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `100%`,
          zIndex: '0',
          backgroundColor: 'rgb(20,20,20)',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          top: '60px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          zIndex: '1',
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
