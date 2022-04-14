import React, { useState, useEffect, useLayoutEffect } from 'react';

import './carousel.css';

const Carousel = (props) => {
  const { children, infiniteLoop } = props;

  const [show, setShow] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0);
  const [length, setLength] = useState(children.length);
  const [isRepeating, setIsRepeating] = useState(
    infiniteLoop && children.length > show
  );
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [touchPosition, setTouchPosition] = useState(null);

  useEffect(() => {
    setLength(children.length);
    setIsRepeating(infiniteLoop && children.length > show);
  }, [children, infiniteLoop, show]);

  useEffect(() => {
    if (isRepeating) {
      if (currentIndex === show || currentIndex === length) {
        setTransitionEnabled(true);
      }
    }
  }, [currentIndex, isRepeating, show, length]);

  // useLayoutEffect(() => {
  //   console.log(window.screen.width);
  //   function updateShow() {
  //     if (window.screen.width < 464) {
  //       setShow(1);
  //       return;
  //     }
  //     if (window.screen.width < 1024) {
  //       setShow(2);
  //       return;
  //     }
  //     setShow(3);
  //   }
  //   window.addEventListener('resize', updateShow);
  //   updateShow();
  //   return () => window.removeEventListener('resize', updateShow);
  // }, []);

  const next = () => {
    if (isRepeating || currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (isRepeating || currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) next();
    if (diff < -5) prev();

    setTouchPosition(null);
  };

  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false);
        setCurrentIndex(length);
      } else if (currentIndex === length + show) {
        setTransitionEnabled(false);
        setCurrentIndex(show);
      }
    }
  };

  const renderExtraPrev = () => {
    let output = [];

    for (let i = 0; i < show; i++) {
      output.push(children[length - 1 - i]);
    }

    output.reverse();

    return output;
  };

  const renderExtraNext = () => {
    let output = [];

    for (let i = 0; i < show; i++) {
      output.push(children[i]);
    }

    return output;
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {(isRepeating || currentIndex) > 0 && (
          <button className="left-arrow" onClick={prev}>
            &lt;
          </button>
        )}
        <div
          className="carousel-content-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`carousel-content show-${show}`}
            style={{
              transform: `translateX(-${(currentIndex * 100) / show}%)`,
              transition: !transitionEnabled ? 'none' : undefined,
            }}
            onTransitionEnd={() => handleTransitionEnd()}
          >
            {length > show && isRepeating && renderExtraPrev()}
            {children}
            {length > show && isRepeating && renderExtraNext()}
          </div>
        </div>
        {(isRepeating || currentIndex < length - show) && (
          <button className="right-arrow" onClick={next}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
