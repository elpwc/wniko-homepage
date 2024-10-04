import { Timeline } from 'antd';
import { useEffect } from 'react';
import TimeLine from '../components/TimeLine';
import { CurrentPageStorage } from '../dataStorage/storage';
import './home.css';

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
          <p>大学院在读</p>
          <p>地理，地図，ｱﾌﾟﾘ開発，言語，漢字，旅行，アニメ，ヲタ芸，音ゲ</p>
          <p></p>
        </div>
        <div className="welcomeItem">
          <p className="headerText2">Contact</p>
          <p>📫elpwc@hotmail.com</p>
          <p>🐱elpwc</p>
        </div>
      </div>
      <a className="twitter-timeline" href="https://twitter.com/elpwc?ref_src=twsrc%5Etfw">
        Tweets by elpwc
      </a>
    </div>
  );
}
