import { useEffect, useState } from 'react';
import Styles from './Styles';

export const StylesLazy = () => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 200);
  }, []);

  if (render) {
    return <Styles />;
  }

  return null;
};
