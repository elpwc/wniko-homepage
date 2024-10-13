import { useEffect, useState } from 'react';
import { AdminModeStorage, CurrentPageStorage } from '../dataStorage/storage';
import './home.css';
import { Timeline } from 'react-twitter-widgets';
import BackgroundSlideshow from '../components/BackgroundSlideshow';
import { BackgroundImages } from '../resourcesReader/bgiReader';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import BlogList from '../components/BlogList';
import { findAllBlog } from '../services/api/blog';
import { Divider } from '../components/Divider';

interface P {
  update: boolean;
  setUpdate: () => void;
}

export default function Home(props: P) {
  useEffect(() => {
    CurrentPageStorage.set('home');
    
    getBlogs('', AdminModeStorage.value === 1 ? true : false, e => {});
    props.setUpdate();
  }, []);

  const [blogs, setBlogs]: [API.Blog[], any] = useState([]);

  const getBlogs = (subject: string = '', includeDraft: boolean = false, onReceive?: (e: any) => void) => {
    findAllBlog({ params: { subject, includeDraft: includeDraft ? '1' : '0', num: 3 } })
      .then((e: any) => {
        onReceive?.(e);
        console.log(e);
        const receivedBlogs = e.data;
        setBlogs(receivedBlogs as API.Blog[]);

        props.setUpdate();
      })
      .catch(error => {});
  };

  return (
    <div id="homeMainContainer">
      <div>
        <BackgroundSlideshow images={BackgroundImages} interval={5000} fadeDuration={1000} />
      </div>
      {/*<p className="headerText1">Wniko</p>*/}
      <div id="welcomeContainer">
        <div className="welcomeItem" id="welcomeContent1">
          <p className="contentText">🪪 筑波大学大学院在学，東京在住</p>
          <p className="contentText">
            📢 中文<span className="welcomeContentTextLangname">(Native)</span>，日本語，English
          </p>
          <p className="contentText">🌟 地理，地図，ｱﾌﾟﾘ開発，言語，漢字，旅行，アニメ，ヲタ芸，音ゲー</p>
          <p className="contentText">✨ SIMPLE is the BEST</p>
        </div>
        <Divider />
        <p className="headerText2">🐝Latest blogs</p>
        <BlogList update={props.update} setUpdate={props.setUpdate} blogs={blogs} />
      </div>
      <div id="twitterContainer">
        <div className="ContactContainer">
          <p className="headerText2">Contact</p>
          <p className="contentText">📫elpwc@hotmail.com</p>
          <p className="contentText">
            🐱
            <a target="_blank" href="https://github.com/elpwc">
              Github
            </a>
            &nbsp;&nbsp;&nbsp;🐤
            <a target="_blank" href="https://x.com/elpwc">
              Twitter
            </a>
          </p>
        </div>
        <TwitterTimelineEmbed
          onLoad={function noRefCheck() {}}
          sourceType="profile"
          screenName="elpwc"
          options={{
            height: window.innerHeight * 0.6,
            width: 'auto',
          }}
          tweetLimit={5}
          lang="ja"
          placeholder={
            <div className="twitterPlaceHolder" style={{ height: window.innerHeight * 0.6 + 'px' }}>
              <p>Twitter timeline is loading...</p>
            </div>
          }
        />
      </div>
    </div>
  );
}
