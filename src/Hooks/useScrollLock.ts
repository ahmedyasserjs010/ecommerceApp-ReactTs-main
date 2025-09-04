// hooks/useScrollLock.js
import { useCallback } from 'react';

export const useScrollLock = () => {
  const lockScroll = useCallback(() => {
    // حفظ موضع التمرير الحالي في بيانات العنصر
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  }, []);

  const unlockScroll = useCallback(() => {
    // استعادة موضع التمرير
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }, []);

  return {
    lockScroll,
    unlockScroll
  };
};