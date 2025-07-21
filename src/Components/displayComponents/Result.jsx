import React from 'react'
import styles from './Result.module.css';
import { useSelector } from 'react-redux';
const Result = () => {
 const {resultData}= useSelector((store)=>store.result);
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.object}>
          <h1>WPM : </h1>
          <h1>{resultData.wpm}</h1>
        </div>
        <div className={styles.object}>
          <h1>Accuracy : </h1>
          <h1>{resultData.acc}</h1>
        </div>
        <div className={styles.object}>
          <h1>Time :</h1>
          <h1>{resultData.time}</h1>
        </div>
        <div className={styles.object}>
          <h1>Raw :</h1>
          <h1>{resultData.raw}</h1>
        </div>
      </div>
    </div>
  )
}
export default Result
