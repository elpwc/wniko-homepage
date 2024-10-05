import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrentPageStorage, LangStorage } from '../dataStorage/storage';
import LangUtils from '../lang/langUtils';

interface P {
  title?: JSX.Element;
  text?: JSX.Element;
  returnText?: JSX.Element;
  returnRoute?: string;
}

export default function Page404(props: P) {
  const L = LangUtils.selectLang();

  useEffect(() => {
    CurrentPageStorage.set('404');
  }, []);
  let title = props.title ? props.title : <>{L.page404.tip1}</>;
  let text = props.text ? props.text : <>{L.page404.tip2}</>;
  let returnText = props.returnText ? props.returnText : <>{L.page404.returnButton}</>;
  let returnRoute = props.returnRoute ? props.returnRoute : `/${LangUtils.LangToEnumStr(LangStorage.value).replace('_', '-')}`;

  return (
    <>
      <div style={{ backgroundColor: 'white', borderRadius: '5px', marginTop: '10px' }}>
        <div style={{ padding: '60px 30px' }}>
          <p>
            <span style={{ fontSize: '50px', color: 'red' }}>404 </span>
            <span style={{ fontSize: '35px' }}>Page Not Exist</span>
          </p>
          <p>
            {title}
            <br />
            {text}
          </p>
          <Link to={returnRoute as string}>{returnText}</Link>
        </div>
      </div>
    </>
  );
}
