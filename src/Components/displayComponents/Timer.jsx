import React from 'react'
import styles from './Timer.module.css'
const Timer = ({setTime}) => {
    let activeTime;
    const selectorOnClick=(event)=>{
        activeTime=document.getElementsByClassName(`${styles.activeTime}`)[0];
     if(event.target!=activeTime){
        if(activeTime){
        activeTime.classList.remove(`${styles.activeTime}`);
        activeTime=event.target;
        setTime(activeTime.innerText);
        activeTime.classList.add(`${styles.activeTime}`);
     }
    }
    }
    return (
        <>
            <div className={styles.timer}>
                      <div className={styles.selector}>
                      <span onClick={(event)=>selectorOnClick(event)}>15</span><hr />
                      <span onClick={(event)=>selectorOnClick(event)} className={styles.activeTime}>30</span><hr />
                      <span onClick={(event)=>selectorOnClick(event)}>60</span><hr />
                      <span onClick={(event)=>selectorOnClick(event)}>120</span><hr />
                      <span onClick={(event)=>selectorOnClick(event)}>300</span>
                      </div>   
            </div>
        </>
    )
}

export default Timer
