import React, { useEffect, useRef } from 'react';
import styles from "@/app/styles/Radial.module.css";



interface RadialMenuProps {
      children: React.ReactNode;
      className?: string | String
}

const RadialMenu: React.FC<RadialMenuProps> = ({ children, className }) => {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (circleRef.current) {
      const items = circleRef.current.querySelectorAll<HTMLDivElement>(".entry");

      for (let i = 0, l = items.length; i < l; i++) {
            //percentages are with respect to the list parent, position is absolute
            const left = (50 - 50 * Math.cos(2 * (1 / l) * i * Math.PI)).toFixed(4) + '%';
            const top = (50 + 50 * Math.sin(2 * (1 / l) * i * Math.PI)).toFixed(4) + '%';
            console.log("left, top: ",left, top);

            const style: React.CSSProperties = {
            left,
            top,
            };

            Object.assign(items[i].style, style);
      }
    }
    setTimeout(handleMenuButtonClick, 500);
  }, []);

  const handleMenuButtonClick = () => {
      if (circleRef.current) {
            circleRef.current.classList.add(styles.open);
            console.log(circleRef.current.classList);
      }
  };

  return (
    <div className={`${className}`}>
      <nav className={`${styles["circular-menu"]} relative top-24 right-12`}>
        <div ref={circleRef} className={`${styles["circle"]}`}>
            {React.Children.map(children, child => (
            <a className="entry">
                  { child }
            </a>
            )
            )}
        </div>
        {/* <a href="" className={`${styles["menu-button"]}`} onClick={handleMenuButtonClick}>
            <MdMouse/>
        </a> */}
      </nav>
    </div>
  );
};

export default RadialMenu;
