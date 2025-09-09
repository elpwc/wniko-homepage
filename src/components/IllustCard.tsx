import LangUtils from '../lang/langUtils';
import './IllustCard.css';
import Illust from '../utils/illust';

interface P {
  src: Illust;
  onClick: () => void;
}

export default function IllustCard(props: P) {
  const L = LangUtils.selectLang();

  return (
    <div
      className="imageCard"
      onClick={() => {
        props.onClick();
      }}
    >
      <div className="imageContainer">
        <img src={props.src.thumburl} alt={props.src.title} style={{ filter: props.src.nsfw ? 'blur(10px)' : '' }} />
      </div>
      <div className="imageDesc">
        <p className="imageTitle">{props.src.title}</p>
        <p style={{ fontSize: '10px', color: 'gray' }}>{props.src.date}</p>
      </div>
    </div>
  );
}
