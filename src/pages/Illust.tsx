import { useEffect, useState } from 'react';
import { CurrentPageStorage } from '../dataStorage/storage';
import './Illust.css';
import IllustCard from '../components/IllustCard';
import { illustDesc } from '../staticData/illustDesc';
import IllustObj, { IllustType, IllustUtils } from '../utils/illust';

interface P {
  update: boolean;
  setUpdate: () => void;
}

const getTypeText = (type: IllustType) => {
  switch (type) {
    case IllustType.Default:
      return '';
    case IllustType.Illust:
      return 'Illust';
    case IllustType.Map:
      return 'Map';
    case IllustType.Photo:
      return 'Photo';
    case IllustType.Meal:
      return 'Meal';
    case IllustType.Junrei:
      return 'Seichi';
    case IllustType.None:
      return '';
    default:
      return '';
  }
};

export default function Illust(props: P) {
  const [isViewerOpen, setisViewerOpen]: [boolean, any] = useState(false);
  const [currentViewingIllust, setcurrentViewingIllust]: [IllustObj, any] = useState(IllustUtils.create(''));
  const [currentSubject, setcurrentSubject]: [number, any] = useState(0);

  useEffect(() => {
    CurrentPageStorage.set('illust');
    props.setUpdate();
  }, []);

  return (
    <div>
      {isViewerOpen ? (
        <div id="imageViewer">
          <div id="imageViewerImg">
            <a href={currentViewingIllust.url} target="_blank" style={{ width: '100%', height: '40%' }}>
              <img src={currentViewingIllust.url} alt={currentViewingIllust.title} />
            </a>
          </div>
          <div id="imageViewerImgDesc">
            <div style={{ display: 'flex' }}>
              <span style={{ fontSize: '20px' }}>
                {/* <span id="imageViewerImgDescType">{getTypeText(currentViewingIllust.type)}</span> */}
                <span>{currentViewingIllust.title}</span>
              </span>
              <button
                id="imageViewerImgDescCloseButton"
                onClick={() => {
                  setisViewerOpen(false);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>

            <p style={{ margin: '10px 0', color: 'lightgray' }}>{currentViewingIllust.date}</p>
            <p style={{ color: 'lightgray' }}>{currentViewingIllust.description}</p>
          </div>
        </div>
      ) : (
        <></>
      )}

      <header>
        <div id="imageSelector">
          <button
            className={'left ' + (currentSubject === 0 ? 'select' : '')}
            onClick={() => {
              setcurrentSubject(0);
            }}
          >
            All
          </button>
          <button
            className={currentSubject === 1 ? 'select' : ''}
            onClick={() => {
              setcurrentSubject(1);
            }}
          >
            Illust
          </button>
          <button
            className={currentSubject === 2 ? 'select' : ''}
            onClick={() => {
              setcurrentSubject(2);
            }}
          >
            Maps
          </button>
          <button
            className={currentSubject === 3 ? 'select' : ''}
            onClick={() => {
              setcurrentSubject(3);
            }}
          >
            Photos
          </button>
          <button
            className={currentSubject === 4 ? 'select' : ''}
            onClick={() => {
              setcurrentSubject(4);
            }}
          >
            Meal
          </button>
          <button
            className={'right ' + (currentSubject === 5 ? 'select' : '')}
            onClick={() => {
              setcurrentSubject(5);
            }}
          >
            Junrei
          </button>
        </div>
      </header>
      <div className="imageList">
        {illustDesc.map(illust => {
          if (currentSubject === 0) {
            return (
              <IllustCard
                src={illust}
                onClick={() => {
                  setcurrentViewingIllust(illust);
                  setisViewerOpen(true);
                }}
              />
            );
          }
          if (illust.type.includes(currentSubject)) {
            return (
              <IllustCard
                src={illust}
                onClick={() => {
                  setcurrentViewingIllust(illust);
                  setisViewerOpen(true);
                }}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
