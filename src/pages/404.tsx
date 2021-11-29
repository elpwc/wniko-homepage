import { useEffect } from 'react';
import { CurrentPageStorage } from '../dataStorage/storage';

interface P {}

export default function Page404(props: P) {
  useEffect(() => {
    CurrentPageStorage.set('404');
  }, []);
  return <>你找的页面不存在捏</>;
}
