import { useState } from 'react';
import './FilterBar.css';

interface P {
  update: boolean;
  setUpdate: () => void;
  items: { title: string; key: string }[];
  itemHeight?: number;
  fontSize?: string;
  selectedKey: string;
  onClick: (key: string) => void;
}
let formerTop: number = 0,
  targetTop: number = 0;
let floatBlockTop = 0;
let currentTime = 0;

export default function FilterBar_old(props: P) {
  const [selected, setSelected]: [string, any] = useState(props.selectedKey);
  const [update, setUpdate]: [number, any] = useState(0);
  const updateNow = () => {
    setUpdate(Math.random());
  };

  let itemHeight: number = 30;
  let fontSize: string = '15px';
  if (props.itemHeight) {
    itemHeight = props.itemHeight;
  }
  if (props.fontSize) {
    fontSize = props.fontSize;
  }

  const moveFloatBlock = (totalTimes: number = 10, msPerMove: number = 10) => {
    const C = 0;
    //const C: number = (2 * (targetTop - formerTop)) / (totalTimes - 1);
    //let n: number = (C / totalTimes) * currentTime - C;
    let n = 0;
    currentTime = 0;
    const timer = setInterval(() => {
      currentTime++;
      //n = (C / totalTimes) * currentTime - C;
      n = (targetTop - formerTop) / totalTimes;
      console.log(targetTop, formerTop, C, n, currentTime, floatBlockTop);
      if (currentTime === totalTimes) {
        clearInterval(timer);
      }
      floatBlockTop += n;
      updateNow();
    }, msPerMove);
  };

  return (
    <>
      <div style={{ fontSize: fontSize }}>
        <div id="list_background" style={{ position: 'absolute', zIndex: 0, width: '100%', borderRadius: '5px', backgroundColor: 'white', padding: '5px 0px' }}>
          {props.items.map((item, index) => {
            return (
              <div key={item.key} className={'item' + (selected === item.key ? ' selected' : '') + (index === props.items.length - 1 ? ' lastitem' : '')} style={{ height: `${itemHeight}px` }}>
                &nbsp;
              </div>
            );
          })}
        </div>
        <div id="list_select_block" style={{ position: 'absolute', zIndex: 1, width: '100%', padding: '5px 0px' }}>
          {selected !== '' ? (
            <div
              style={{
                position: 'absolute',
                height: `${itemHeight}px`,
                top: `${floatBlockTop + 5}px`,
                left: '-10px',
                width: 'calc(100% + 20px)',
                backgroundColor: 'rgb(10,80,170)',
                borderRadius: '5px',
                borderRight: 'darkblue 5px solid',
                borderBottom: 'darkblue 4px solid',
              }}
            >
              &nbsp;
            </div>
          ) : (
            <></>
          )}
        </div>
        <div id="list_title" style={{ position: 'absolute', zIndex: 2, width: '100%', padding: '5px 0px' }}>
          {props.items.map((item, index) => {
            return (
              <div
                key={item.key}
                data-index={index}
                className={''}
                onClick={e => {
                  setSelected(item.key);
                  formerTop = targetTop;
                  targetTop = index * itemHeight;
                  moveFloatBlock();
                  props.onClick(item.key);
                }}
                style={{ cursor: 'pointer', color: selected === item.key ? 'white' : 'black', height: `${itemHeight}px`, paddingLeft: '20px' }}
              >
                {item.title}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
