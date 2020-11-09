import React, {useEffect, useRef} from 'react';
import {goTopref} from './GoTop';

const options = {
    root: document.querySelector('#scrollArea'),
    rootMargin: '100px',
    threshold: 1.0
  }

const HeaderObserver = ({children}) => {

    const headerRef = useRef();
      useEffect(() => {
          const observer = new IntersectionObserver((intersection) => {
            goTopref.current(intersection[0].isIntersecting)
          }, options);

          observer.observe(headerRef.current)

      }, []);

    return (
        <div ref={headerRef}>
            {children}
        </div>
    );
}

export default HeaderObserver;
