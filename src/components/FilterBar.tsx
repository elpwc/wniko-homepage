import { useState } from 'react';
import './FilterBar.css';

interface P {
  update: boolean;
  setUpdate: () => void;
  items: { contents: JSX.Element; key: string }[];
  itemHeight?: number;
  fontSize?: string;
  selectedKey: string;
  onClick: (key: string) => void;
}

export default function FilterBar(props: P) {
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

  return (
    <div style={{ fontSize: fontSize }}>
      <div id="list_background" style={{ width: '100%', borderRadius: '5px', padding: '5px 0px' }}>
        {props.items.map((item, index) => {
          return (
            <div
              key={item.key}
              data-index={index}
              className={'item' + (selected === item.key ? ' selected' : '') + (index === props.items.length - 1 ? ' lastitem' : '')}
              onClick={e => {
                setSelected(item.key);
                props.onClick(item.key);
              }}
              style={{ cursor: 'pointer', height: `${itemHeight}px` }}
            >
              {item.contents}
            </div>
          );
        })}
      </div>
    </div>
  );
}
