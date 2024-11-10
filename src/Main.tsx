import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate, useParams, useLocation } from 'react-router-dom';
import { CurrentPageStorage, LangStorage, AdminModeStorage, DeviceStorage } from './dataStorage/storage';
import LangUtils from './lang/langUtils';
import { AdminPassword } from './staticData/adminPassword';
import cookie from 'react-cookies';
import appconfig from './appconfig';
import UMenu from './components/UMenu';
import './Main.css';
import Modal from './components/Modal';
import UMenuItem from './components/UMenuItem';
import BackgroundSlideshow from './components/BackgroundSlideshow';
import { BackgroundImages } from './resourcesReader/bgiReader';
import { useDataContext } from './utils/context';

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

  const [currentPageIndex, setcurrentPageIndex]: [number, any] = useState(0);

  const [isPhoneDeviceMenuOpen, setisPhoneDeviceMenuOpen]: [boolean, any] = useState(false);

  const [winWidth, setwinWidth]: [number, any] = useState(window.innerWidth);

  const { setbgIndex } = useDataContext();

  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  const L = LangUtils.selectLang();

  const themeColor = [
    ['#686868', '#ffffff00', 'home'],
    ['#ff7875', '#ffdbdb', 'projects'],
    ['#ffb729', '#fff2d7', 'blogs'],
    ['#17df55', '#d9ffdd', 'illust'],
    ['#f87bff', '#fce8ff', 'contact'],
    ['#f87bff', '#fce8ff', '404'],
    ['#f87bff', '#fce8ff', '500'],
  ];

  const menuItems = [
    { key: 'home', title: L.header.home, route: './', focuscolor: themeColor[0][0] },
    { key: 'projects', title: L.header.projects, route: './projects', focuscolor: themeColor[1][0] },
    { key: 'blogs', title: L.header.blogs, route: './blogs', focuscolor: themeColor[2][0] },
    { key: 'illust', title: L.header.illust, route: './illust', focuscolor: themeColor[3][0] },
    /*{ key: 'contact', title: L.header.contact, route: './contact', focuscolor: themeColor[4][0] },*/
  ];

  //console.log(CurrentPageStorage.value);

  // 启动时更新主题
  useEffect(() => {
    setcurrentPageIndex(
      themeColor.findIndex(t => {
        return t[2] === CurrentPageStorage.value;
      })
    );
  }, [CurrentPageStorage.value]);

  window.addEventListener('resize', e => {
    // @ts-ignore
    setwinWidth(e.target.innerWidth);
  });

  return (
    <div className="main">
      <header
        style={{
          display: 'flex',
          top: '0px',
          left: '0',
          right: '0',
          padding: '0 0',
          zIndex: 114514,
          backgroundColor: '#FFFFFF',
          position: 'fixed',
          boxShadow: '1px 1px 9px 0px rgb(222 232 241)' /*'0px 0px 5px 2px #121516'*/,
        }}
      >
        <div style={{ display: 'flex', width: '100%', paddingTop: '10px', justifyContent: 'space-between' }}>
          <div>
            <button
              id="phoneShowMenuButton"
              onClick={() => {
                setisPhoneDeviceMenuOpen(!isPhoneDeviceMenuOpen);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
          </div>
          {winWidth >= 768 ? (
            <UMenu
              items={menuItems}
              onCheck={index => {
                setcurrentPageIndex(index);
              }}
            />
          ) : (
            <>
              {isPhoneDeviceMenuOpen ? (
                <UMenu
                  items={menuItems}
                  onCheck={index => {
                    setcurrentPageIndex(index);
                    setisPhoneDeviceMenuOpen(false);
                  }}
                />
              ) : (
                <div style={{ width: '100%' }}>
                  <UMenuItem key={-1} data={menuItems[currentPageIndex > 3 ? 0 : currentPageIndex]} onClick={() => {}} />
                </div>
              )}
            </>
          )}

          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ alignContent: 'center' }}>
              {adminWinState === 2 ? (
                <button
                  style={{ margin: '3px', width: 'max-content' }}
                  onClick={() => {
                    sessionStorage.setItem('admin', 'false');
                    cookie.save('auto-admin', 'false', { path: '/' });
                    // Close admin win
                    setAdminWinState(0);
                    // Set global win state
                    AdminModeStorage.set(0);
                    props.setUpdate();
                  }}
                >
                  退出
                </button>
              ) : (
                <>
                  <a
                    onClick={() => {
                      setPw('');
                      setAdminWinState(1);
                      props.setUpdate();
                    }}
                    style={{
                      padding: '0 5px',
                      margin: '0 10px',
                      color: 'white',
                    }}
                  >
                    ◇
                  </a>
                  <Modal
                    title="E'яkesaru osokōy!"
                    isOpen={adminWinState === 1}
                    showOkButton={true}
                    showCancelButton={true}
                    onOk={() => {
                      if (pw === AdminPassword) {
                        if (rememberPw) {
                          cookie.save('auto-admin', 'true', { path: '/' });
                          console.log(1141514, cookie.load('auto-admin'));
                        }
                        sessionStorage.setItem('admin', 'true');
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
                  >
                    <input
                      type="password"
                      placeholder="Ōgna"
                      onChange={e => {
                        setPw(e.target.value);
                      }}
                      value={pw}
                    ></input>
                  </Modal>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <BackgroundSlideshow
        images={BackgroundImages}
        interval={7500}
        fadeDuration={1000}
        onChange={index => {
          setbgIndex(index);
        }}
      >
        <div
          style={{
            position: 'fixed',
            paddingTop: '50px',
            zIndex: '-5',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: themeColor[currentPageIndex][1],
            backdropFilter: 'blur(0px)',
            overflow: 'auto',
          }}
        >
          <main>
            <Outlet />
          </main>
        </div>
      </BackgroundSlideshow>
    </div>
  );
}

export default Main;
