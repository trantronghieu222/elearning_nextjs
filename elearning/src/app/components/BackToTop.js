'use client';
import React, { useEffect, useState } from 'react';

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setShowButton(window.scrollY > 100); // Dùng setShowButton để cập nhật
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {showButton && (
        <button
        style={{
          position:'fixed',
          bottom:'25px',
          right:'15px',
          height:'50px',
          width:'50px',
          borderRadius:'25px',


        }} onClick={scrollToTop}><i className="fa fa-home"></i></button>
      )}
    </div>
  );
};

export default BackToTop;
