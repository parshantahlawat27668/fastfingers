import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import DisplayText from '../Components/DisplayText';
import Header from '../Components/Header';
const Home =  () => {
  return (
   <>
   <div className={styles.main}>
    <Header/>
    <DisplayText/>
   </div>
   </>
  )
}

export default Home
