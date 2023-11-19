import { List, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { CurrentPageStorage } from '../dataStorage/storage';
import avatar from '../resource/avatar.png';
import './contact.css';

const imgs: [string, string, string][] = [
  ['js.png', 'JavaScript', 'https://www.ecma-international.org/'],
  ['ts.jpg', 'TypeScript', 'https://www.typescriptlang.org/'],
  ['es6.png', 'ES6', 'https://www.javascript.com/'],
  ['html.jpg', 'HTML5', 'https://html.spec.whatwg.org/multipage/'],
  ['css.jpg', 'CSS3', 'https://www.w3.org/Style/CSS/'],
  ['bootstrap.jpg', 'BootStrap', 'https://getbootstrap.com/'],
  ['csharp.jpg', 'C#', 'https://docs.microsoft.com/zh-cn/dotnet/csharp/'],
  ['dotnet.jpg', '.Net', 'https://docs.microsoft.com/zh-cn/dotnet/core/introduction'],
  ['electron.jpg', 'Electron', 'https://www.electronjs.org/'],
  ['jquery.jpg', 'JQuery', 'https://jquery.com/'],
  ['mysql.png', 'MySQL', 'https://www.mysql.com/'],
  ['nest.svg', 'Nest.js', 'https://nestjs.com/'],
  ['nodejs.png', 'Node.js', 'https://nodejs.org/en/'],
  ['php.jpg', 'PHP', 'https://www.php.net/'],
  ['python.jpg', 'Python', 'https://www.python.org/'],
  ['react.png', 'React.js', 'https://reactjs.org/'],
  ['ruby.jpg', 'Ruby', 'https://www.ruby-lang.org/en/'],
  ['sass.png', 'Sass', 'https://sass-lang.com/'],
  ['sequelize.png', 'Sequelize', 'https://sequelize.org/'],
  ['antd.png', 'Ant Design', 'https://ant.design/'],
];
const imgImports: [/* id */ string, /* url */ string, /* name */ string, /* website */ string][] = [];
imgs.forEach((img: [string, string, string]) => {
  imgImports.push([img[0].split('.')[0], require('../resource/techlogo/' + img[0]), img[1], img[2]]);
});

console.log(imgImports);

interface P {
  update: boolean;
  setUpdate: () => void;
}

let avatarRotateSpeed: number = 500;

export default function Contact(props: P) {
  useEffect(() => {
    CurrentPageStorage.set('contact');
    props.setUpdate();
  }, []);

  const [avatarRotate, setAvatarRotate]: [number, any] = useState(190);

  const avatarOnClick = () => {
    avatarRotateSpeed = Math.random() * 1000;
    let rotate = avatarRotate;
    rotate = rotate % 360;
    const timer2 = setInterval(() => {
      rotate += avatarRotateSpeed;

      // console.log(avatarRotateSpeed, rotate);
      setAvatarRotate(rotate);
      avatarRotateSpeed *= 0.95;
      if (avatarRotateSpeed < 1) {
        clearInterval(timer2);
      }
    }, 10);
  };

  const contactData = [
    {
      websiteLogo: 'http://cdn.onlinewebfonts.com/svg/img_237869.png',
      website: 'email',
      title: 'elpwc@hotmail.com',
      url: 'mailto:elpwc@hotmail.com',
      desc: '',
    },
    {
      websiteLogo: 'https://pngimg.com/uploads/github/github_PNG40.png',
      website: 'Github',
      title: '@elpwc',
      url: 'https://github.com/elpwc',
      desc: '',
    },
    {
      websiteLogo: 'https://cdn.freelogovectors.net/wp-content/uploads/2018/04/twitter-logo-new_freelogovectors.net_-768x624.png',
      website: 'Twitter',
      title: '@elpwc',
      url: 'https://twitter.com/elpwc',
      desc: '',
    },
    {
      websiteLogo: 'https://cdn.onlinewebfonts.com/svg/img_215949.png',
      website: 'QQ',
      title: '@unitower84 (2575784532)',
      url: 'https://user.qzone.qq.com/2575784532/main',
      desc: '',
    },
    {
      websiteLogo: 'https://pngpress.com/wp-content/uploads/2020/04/Telegram-Logo-free-png.png',
      website: 'Telegram',
      title: '@elpwc',
      url: '',
      desc: '',
    },
    {
      websiteLogo: 'https://iconape.com/wp-content/files/fh/349949/svg/pixiv-seeklogo.com.svg',
      website: 'Pixiv',
      title: 'うにこ/海胆子/elpwc',
      url: 'https://www.pixiv.net/users/18240502',
      desc: '',
    },
    {
      websiteLogo: 'https://www.pinclipart.com/picdir/middle/100-1003109_steam-clip-art.png',
      website: 'Steam',
      title: 'うにうに',
      url: 'https://steamcommunity.com/id/elpwc/',
      desc: '',
    },
    {
      websiteLogo: 'http://image.eostatic.com/l/5332/201902115c60e858247ce.png',
      website: 'Bilibili',
      title: '海胆子うにこ_wniko',
      url: 'https://space.bilibili.com/19893550',
      desc: '',
    },
  ];

  return (
    <>
      <div className="animate__animeted animate__bounceIn" style={{ position: 'absolute', zIndex: 2 }}>
        <img onClick={avatarOnClick} style={{ cursor: 'pointer', borderRadius: '250px', transform: `rotate(${avatarRotate}deg)` }} width="250px" src={avatar} alt="wniko" />
      </div>

      <div style={{ position: 'absolute', zIndex: 0, paddingTop: '30px', height: '100%', width: '100%' }}>
        <div className="white-card animate__animated animate__bounceInDown" style={{ position: 'absolute', top: '-30px', paddingLeft: '250px', paddingTop: '30px', height: '220px' }}>
          <div style={{ position: 'absolute', bottom: '0px' }}>
            <Space size="large">
              <h1>
                Wniko{' '}
                <span className="hoverUnderline" style={{ cursor: 'help', color: 'rgb(150, 150, 150)' }}>
                  <i>"Elpwc"</i>
                </span>{' '}
                Wang
              </h1>
              <h3>
                性别: 海胆
                <sup>
                  <abbr title="海胆就是海胆，浑身带刺的那种">?</abbr>
                </sup>
              </h3>
              <h3>居住地：淫梦大公国</h3>
              <h3></h3>
            </Space>
          </div>
        </div>

        <div className="white-card animate__animeted animate__bounceInLeft" style={{ height: 'fit-content', marginTop: '220px', padding: '30px 10px' }}>
          <div style={{ backgroundColor: 'plum', fontSize: '15px', position: 'absolute', color: 'white', left: '0px', width: '200px', textAlign: 'right', paddingRight: '20px' }}>
            <p>使用的技术</p>
          </div>
          <div style={{ marginTop: '50px' }}>
            {imgImports.map((img, index) => {
              return (
                <a className={`animate__animeted animate__bounceIn`} target="_blank" rel="noreferrer" href={img[3]} key={img[0]}>
                  <Tooltip title={img[2]}>
                    <img
                      alt={img[0].split('.')[0]}
                      src={
                        // @ts-ignore
                        img[1].default
                      }
                      width="50px"
                    />
                  </Tooltip>
                </a>
              );
            })}
          </div>
        </div>

        <div className="white-card animate__animeted animate__bounceInDown" style={{ height: 'fit-content', marginTop: '20px', padding: '30px 50px' }}>
          <div style={{ backgroundColor: 'plum', fontSize: '15px', position: 'absolute', color: 'white', left: '0px', width: '200px', textAlign: 'right', paddingRight: '20px' }}>
            <p>取得联系</p>
          </div>
          <div style={{ marginTop: '50px' }}>
            <address>
              <List
                itemLayout="horizontal"
                dataSource={contactData}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={typeof item.websiteLogo === 'string' ? <img alt={item.website} width="30px" src={item.websiteLogo} /> : item.websiteLogo}
                      title={
                        <>
                          <span style={{ position: 'absolute', width: '200px' }}>{item.website}</span>
                          <span style={{ position: 'absolute', left: '180px' }}>
                            <a target="_blank" rel="noreferrer" href={item.url}>
                              {item.title}
                            </a>
                          </span>
                        </>
                      }
                      description={item.desc}
                    />
                  </List.Item>
                )}
              />
            </address>
          </div>
        </div>
      </div>
    </>
  );
}
