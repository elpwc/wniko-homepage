import { useEffect } from 'react';
import BlogList from '../components/BlogList';
import FilterBar from '../components/FilterBar';
import LeftContent from '../components/LeftContent';
import RightContent from '../components/RightContent';
import { CurrentPageStorage } from '../dataStorage/storage';
import init_debug_data from '../staticData/initDebugData';

interface P {
  update: boolean;
  setUpdate: () => void;
}

export default function Blogs(props: P) {
  useEffect(() => {
    CurrentPageStorage.set('blogs');
    props.setUpdate();
  }, []);
  return (
    <>
      <LeftContent update={props.update} setUpdate={props.setUpdate} marginRight={20}>
        <div style={{ marginTop: '20px', borderRadius: '5px' }}>
          <FilterBar
            update={props.update}
            setUpdate={props.setUpdate}
            items={[
              { title: '杂记', key: '1' },
              { title: 'web前端', key: '2' },
              { title: '摸鱼', key: '3' },
              { title: 'rua', key: '4' },
              { title: 'rua', key: '5' },
              { title: 'rua', key: '46' },
              { title: 'rua', key: '44' },
              { title: 'rua', key: '443' },
              { title: 'rua', key: '4ere4' },
              { title: 'rua', key: '4443' },
              { title: 'rua', key: '4t' },
              { title: 'rua', key: '4d' },
              { title: 'rua', key: '4f' },
              { title: 'rua', key: 'f4' },
              { title: 'rua', key: 'g334' },
              { title: 'rua', key: '4tgf' },
              { title: 'rua', key: '455d' },
              { title: 'rua', key: 'g4' },
              { title: 'rua', key: '4x' },
              { title: 'rua', key: '4h' },
              { title: 'rua', key: '4xc' },
              { title: 'rua', key: 'xcv4' },
              { title: 'rua', key: 'vb4' },
              { title: 'rua', key: 'd4f' },
              { title: 'rua', key: '4dgf' },
              { title: 'rua', key: 'dfg4' },
              { title: 'rua', key: '4fdd' },
              { title: 'rua', key: 'dgf4' },
              { title: 'rua', key: '4ggd' },
              { title: 'rua', key: 'gdfgr4' },
              { title: 'rua', key: '4yhj' },
              { title: 'rua', key: '4j' },
            ]}
            selectedKey=''
            onClick={() => {}}
          />
        </div>
      </LeftContent>
      <RightContent update={props.update} setUpdate={props.setUpdate}>
        <p>114514</p>
      </RightContent>
      <BlogList update={props.update} setUpdate={props.setUpdate} blogs={init_debug_data.blogs}></BlogList>
    </>
  );
}
