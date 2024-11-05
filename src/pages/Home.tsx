import { useEffect, useState } from 'react';
import { AdminModeStorage, CurrentPageStorage } from '../dataStorage/storage';
import './home.css';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import BlogList from '../components/BlogList';
import { findAllBlog } from '../services/api/blog';
import { Divider } from '../components/Divider';
import { useDataContext } from '../utils/context';
import { bgDesc } from '../staticData/bgDesc';
import { motion } from 'framer-motion';

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
  const { bgIndex } = useDataContext();

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
      {/*<p className="headerText1">Wniko</p>*/}
      <div id="welcomeContainer">
        <div className="welcomeItem" id="welcomeContent1">
          <p className="contentTextLarge">🪪 Wniko/うに</p>
          <p className="contentText">
            📢 中文<span className="welcomeContentTextLangname">(Native)</span>，日本語，English
          </p>
          <p className="contentText">🌟 Tags: 地理，地図，創作地図，アプリ開発，TypeScript♡，言語，漢字，旅行，鉄道，駅メモ，アニメ，ラブライブ，ゆるキャン△，鉄道，デザイン，ヲタ芸，地下芸，音ゲ，maimaiDX，云々</p>
        </div>
        <Divider />
        <p className="headerText2">🐝Latest blogs</p>
        <BlogList update={props.update} setUpdate={props.setUpdate} blogs={blogs} />
      </div>
      <div id="twitterContainer">
        <div className="ContactContainer">
          <p className="headerText2">Contact</p>
          <p className="contentText">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
            </svg>
            &nbsp;elpwc@hotmail.com
          </p>
          <p className="contentText">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            &nbsp;
            <a target="_blank" href="https://github.com/elpwc">
              Github
            </a>
            &nbsp;&nbsp;&nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
            &nbsp;
            <a target="_blank" href="https://x.com/elpwc">
              Twitter
            </a>
          </p>
        </div>

        <div className="bgDescContainer">
          <motion.div key={bgIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <p className="">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
              </svg>
              &nbsp;
              {bgDesc[bgIndex ?? 0].title}
            </p>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
              &nbsp;
              <span>{bgDesc[bgIndex ?? 0].date}</span>
              &nbsp;&nbsp;&nbsp;<span>{bgDesc[bgIndex ?? 0].location}</span>
            </p>
          </motion.div>
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
