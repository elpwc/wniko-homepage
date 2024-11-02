import { useEffect, useRef, useState } from 'react';
import './BackgroundSlideshow.css';

interface P {
  images: string[];
  interval: number;
  fadeDuration: number;
  onChange?: (currentImageIndex: number) => void;
  children?: JSX.Element;
}

export default (props: P = { images: [], interval: 5000, fadeDuration: 1000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 当前图片的索引
  const [nextImageIndex, setNextImageIndex] = useState(1); // 下一张图片的索引
  const [isFading, setIsFading] = useState(false); // 控制渐变状态

  const currentImageIndexRef = useRef(currentImageIndex);
  const nextImageIndexRef = useRef(nextImageIndex);

  useEffect(() => {
    currentImageIndexRef.current = currentImageIndex;
  }, [currentImageIndex]);

  useEffect(() => {
    nextImageIndexRef.current = nextImageIndex;
  }, [nextImageIndex]);

  useEffect(() => {
    const switchImages = setInterval(() => {
      props.onChange?.(currentImageIndexRef.current);
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndexRef.current);

        setNextImageIndex(prevIndex => {
          const updatedIndex = (prevIndex + 1) % props.images.length;
          return updatedIndex;
        });

        console.log(currentImageIndex, nextImageIndex);
        setIsFading(false);
      }, props.fadeDuration);
    }, props.interval);

    return () => clearInterval(switchImages);
  }, [props.interval]);

  return (
    <div>
      <div className="slideshow">
        <div
          className="image"
          style={{
            backgroundImage: `url(${props.images[currentImageIndex]})`,
            zIndex: 2,
            opacity: isFading ? 0 : 1,
            transition: isFading ? `opacity ${props.fadeDuration}ms ease-in-out` : 'none',
          }}
        ></div>
        <div
          className="image"
          style={{
            backgroundImage: `url(${props.images[nextImageIndex]})`,
            zIndex: 1,
          }}
        ></div>
      </div>
      <div className="contentHTML">{props.children}</div>
    </div>
  );
};
