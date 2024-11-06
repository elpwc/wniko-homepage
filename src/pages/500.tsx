import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrentPageStorage, LangStorage } from '../dataStorage/storage';
import LangUtils from '../lang/langUtils';

export default function Page500() {
  const L = LangUtils.selectLang();

  useEffect(() => {
    CurrentPageStorage.set('500');
  }, []);
  let title = '鯖故障したぁ';
  let text = 'どうすんだこりゃ...たまげたなあ';
  let returnText = <>{L.page404.returnButton}</>;
  let returnRoute = `/`;

  return (
    <>
      <div style={{ backgroundColor: 'white', borderRadius: '5px', marginTop: '10px' }}>
        <div style={{ padding: '60px 30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p>
            <span style={{ fontSize: '50px', color: 'red' }}>500 </span>
            <span style={{ fontSize: '35px' }}>Server ERROR</span>
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
