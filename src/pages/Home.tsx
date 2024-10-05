import { useEffect } from 'react';
import { CurrentPageStorage } from '../dataStorage/storage';
import './home.css';
import { Timeline } from 'react-twitter-widgets';

interface P {
  update: boolean;
  setUpdate: () => void;
}

export default function Home(props: P) {
  useEffect(() => {
    CurrentPageStorage.set('home');
    props.setUpdate();
  }, []);

  return (
    <div>
      <p className="headerText1">Wniko or うに</p>
      <div id="welcomeContainer">
        <div className="welcomeItem" id="welcomeContent1">
          <p className="contentText">🪪筑波大学大学院在学，東京在住</p>
          <p className="contentText">🌟地理，地図，ｱﾌﾟﾘ開発，言語，漢字，旅行，アニメ，ヲタ芸，音ゲー</p>
          <p className="contentText">✨SIMPLE is BEST</p>
        </div>
        <div className="welcomeItem">
          <p className="headerText2">Contact</p>
          <p className="contentText">📫elpwc@hotmail.com</p>
          <p className="contentText">🐱<a href='https://github.com/elpwc'>elpwc</a>&nbsp;&nbsp;&nbsp;🐤<a href='https://x.com/elpwc'>elpwc</a></p>
        </div>
      </div>
      <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'elpwc' // アカウント名
          }}
          options={{
            height: 'auto'
          }}
        />
    </div>
  );
}
