import React, { useState, useLayoutEffect } from 'react';

import TagsSlider from "components/TagsSlider";

import 'scss/base.scss';
import './index.scss';

export default function App() {
  const [size, setSize] = useState<number[]>([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="App">
      <TagsSlider windowSize={size}/>
    </div>
  );
}
