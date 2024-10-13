import { useEffect, useRef, useState } from 'react';
import './BackgroundSlideshow.css';

interface P {
  images: string[];
  interval: number;
  fadeDuration: number;
}

export default (props: P = { images: [], interval: 5000, fadeDuration: 1000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 当前图片的索引
  const [nextImageIndex, setNextImageIndex] = useState(1); // 下一张图片的索引
  const [isFading, setIsFading] = useState(false); // 控制渐变状态

  useEffect(() => {
    // 定时切换图片
    const switchImages = setInterval(() => {
      setIsFading(true); // 开始渐变
      setTimeout(() => {
        // 渐变结束后，更新图片的索引，并停止渐变
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex(prevIndex => (prevIndex + 1) % props.images.length);
        setIsFading(false); // 结束渐变
      }, props.fadeDuration); // 渐变时间
    }, props.interval); // 切换间隔

    return () => clearInterval(switchImages); // 清除定时器
  }, []);

  return (
    <div className="slideshow">
      {/* 第一张图片 */}
      <div
        className="image"
        style={{
          backgroundImage: `url(${props.images[currentImageIndex]})`,
          zIndex: isFading ? 1 : 2, // 渐入时当前图片在上
          opacity: isFading ? 0 : 1, // 渐出时当前图片透明度减少
          transition: `opacity ${props.fadeDuration}ms ease-in-out`,
        }}
      ></div>

      {/* 第二张图片 */}
      <div
        className="image"
        style={{
          backgroundImage: `url(${props.images[nextImageIndex]})`,
          zIndex: isFading ? 2 : 1, // 渐入时下一张图片在上
          opacity: isFading ? 1 : 0, // 渐入时下一张图片透明度增加
          transition: `opacity ${props.fadeDuration}ms ease-in-out`,
        }}
      ></div>
    </div>
  );
};
