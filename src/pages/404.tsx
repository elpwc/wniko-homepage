import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrentPageStorage, LangStorage } from '../dataStorage/storage';
import LangUtils from '../lang/langUtils';

interface P {}

export default function Page404(props: P) {
  useEffect(() => {
    CurrentPageStorage.set('404');
  }, []);
  return (
    <>
      <div style={{ backgroundColor: 'white', borderRadius: '5px', marginTop: '10px' }}>
        <div style={{ padding: '60px 30px' }}>
          <p style={{ fontSize: '50px', color: 'red' }}>404</p>
          <p>
            这个页面不存在捏
            <br />
            如果你确信网址没有问题，那大概是因为已经被删了或者改了位置了8
          </p>
          <Link to={`/${LangUtils.LangToEnumStr(LangStorage.value).replace('_', '-')}`}>👉返回主页👈</Link>
        </div>
      </div>
    </>
  );
}
