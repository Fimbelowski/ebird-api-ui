import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({ behavior: 'instant', left: 0, top: 0 });
  }, [pathname]);

  return null;
}
