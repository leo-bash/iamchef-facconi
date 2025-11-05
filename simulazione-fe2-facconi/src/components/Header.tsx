
import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <span className={styles.brand}>I Am Chef</span>
      </div>
      <div className={styles.right}>
      </div>
    </header>
  );
};

export default Header;
