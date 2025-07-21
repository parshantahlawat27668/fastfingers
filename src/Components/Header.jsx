import React, { useEffect } from 'react'
import styles from './Header.module.css'
import { FaHandsWash } from "react-icons/fa";
const Header = () => {
  return (
    <div className={styles.main}>
    <div className={styles.logo}>
      <h2>
    Fast<FaHandsWash  color={"rgb(6, 146, 6)"}/>
    </h2>
    </div>
    <div className={styles.options}>
    
    </div>
    </div>
  )
}

export default Header
