import { Card, Space, Tag, Tooltip, Image } from 'antd';
import { LangStorage } from '../dataStorage/storage';
import LangUtils from '../lang/langUtils';
import Illust from '../utils/illust';

interface P {
    illust: Illust;
}

export default function IllustCard(props: P) {
  const L = LangUtils.selectLang();


  return (
    <>
      <Card
        style={{}}
      >
          <Image width={200} src={props.illust.url} preview={{src: props.illust.thumburl}}/>
      </Card>
    </>
  );
}
