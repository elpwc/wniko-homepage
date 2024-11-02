import { useEffect, useState } from 'react';
import './BackgroundSlideshow.css';

interface SlideshowProps {
  images: string[];
  interval?: number; // Time between each image switch (ms)
  fadeDuration?: number; // Duration of the fade effect (ms)
  fadeSteps?: number; // Number of steps for smooth fade
  children?: JSX.Element;
}

const BackgroundSlideshow = ({ images, interval = 5000, fadeDuration = 1000, fadeSteps = 30, children = <></> }: SlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Current image index
  const [currentOpacity, setCurrentOpacity] = useState(1); // Opacity of the current image
  const [nextOpacity, setNextOpacity] = useState(0); // Opacity of the next image


  const stepInterval = fadeDuration / fadeSteps;

  useEffect(() => {
    if (images.length < 2) return; // Require at least two images

    // Calculate the time between each opacity step for smooth fading
    let fadeInterval: NodeJS.Timeout;

    const switchImage = () => {
      let step = 0;
      setCurrentOpacity(1); // Reset opacities at start of each switch
      setNextOpacity(0);

      // Set an interval to gradually change opacity
      fadeInterval = setInterval(() => {
        step += 1;
        const newOpacity = 1 - step / fadeSteps;

        // Gradually fade out current image and fade in next image
        setCurrentOpacity(newOpacity);
        setNextOpacity(1 - newOpacity);

        // If we've completed the fade steps, finalize switch
        if (step >= fadeSteps) {
          clearInterval(fadeInterval);
          setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
          setCurrentOpacity(1); // Reset current image opacity for next cycle
          setNextOpacity(0); // Reset next image opacity for next cycle
        }
      }, stepInterval);
    };

    // Main interval to switch images at specified interval
    const mainInterval = setInterval(switchImage, interval);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(mainInterval);
      clearInterval(fadeInterval); // Clear fade interval on unmount
    };
  }, [images, interval, fadeDuration, fadeSteps]);

  const nextIndex = (currentIndex + 1) % images.length;

  return (
    <div>
      <div className="slideshow">
        {/* Current Image */}
        <div
          className="image"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            opacity: currentOpacity,
          }}
        />

        {/* Next Image */}
        <div
          className="image"
          style={{
            backgroundImage: `url(${images[nextIndex]})`,
            opacity: nextOpacity,
          }}
        />
      </div>
      <div className="contentHTML">{children}</div>
    </div>
  );
};

export default BackgroundSlideshow;
