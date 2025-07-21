import React, { useEffect, useRef, useState, } from 'react'
import styles from './DisplayText.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { resultActions, storiesActions } from '../store';
import { FaRepeat } from "react-icons/fa6";
import Timer from './displayComponents/Timer';
import Result from './displayComponents/Result';
import { PiCursorClickFill } from 'react-icons/pi';
const DisplayText = () => {
  const dispatch = useDispatch();
  
  // fetch story from public folder and set to redux store 
  useEffect(() => {
    const fetchStories = () => {
      fetch("/stories.json")
        .then((response) => response.json())
        .then((data) => {
          dispatch(storiesActions.setStory(data))
        })
        .catch((error) => console.error("Error loading stories:", error));
    }
    fetchStories();
  }, []);


  // get story from redux store
  const { storyArray } = useSelector((store) => store.story);


  // function for cursor
 const cursorPosFun = () => {
  const nextLetter = document.getElementsByClassName(`${styles.currentLetter}`)[0];
  const nextWord = document.getElementsByClassName(`${styles.currentWord}`)[0];
    let cursor = document.getElementById("cursor");
    cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top + 5 + 'px';
    cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right'] -2+ 'px';
}


// choose random story from story object 
  const [story,setStory]=useState([]);
  const getStory=()=>{
    if(storyArray.length>0){
      const randomNumber1 = Math.floor(Math.random() * 10);
      const randomNumber2 = Math.floor(Math.random() * 10);
      const randomNumber3 = Math.floor(Math.random() * 10);
      const randomNumber4 = Math.floor(Math.random() * 10);
      const randomNumber5 = Math.floor(Math.random() * 10);

      const storyString=storyArray[randomNumber1].text + storyArray[randomNumber2].text + storyArray[randomNumber3].text + storyArray[randomNumber4].text + storyArray[randomNumber5].text;



      const wordArray = storyString.trim().replace(/\s+/g, " ").split(" ");
      setStory(wordArray);
    }
    
  }

  // get story when page is reloaded
  useEffect(()=>{ 
      getStory();
  },[storyArray]);
  

  
   let currentWord;
   let currentLetter;

   const resetClasses = () => {
    document.querySelectorAll(
      ".error, .typed, ." + styles.right + ", ." + styles.wrong + ", ." + styles.currentWord + ", ." + styles.currentLetter
    ).forEach(el => {
      el.classList.remove("error", "typed", styles.right, styles.wrong, styles.currentWord, styles.currentLetter);
    });
  };
  
  //  When selected story is changed    =>reload,repeat,time-change
  useEffect(()=>{
    if(story.length>0){
      resetClasses();
  
    currentWord = document.getElementById("wordContainer")?.firstElementChild;
    currentWord?.classList.add(`${styles.currentWord}`);
    currentLetter = currentWord?.firstElementChild;
    currentLetter?.classList.add(`${styles.currentLetter}`);
    cursorPosFun();
    cursor.style.display="block";
    document.getElementsByClassName(`${styles.focusDiv}`)[0].focus();
  }
  },[story]);
  
  
 

 

    
 

 

  // Timer
  const [timeSelector,setTimeSelector]=useState(true);
  let start = true;
  const [time, setTime] = useState(30);
  let testTime;
  const [testEnd,setTestEnd]=useState(false);
  const getTime = (time) => {
    setTime(time);
    getStory();
    if(!start){
   start=true;
    }
  }

// Timer 
const timer = () => {
  start = false;
  testTime=time;
  const timeOut = setInterval(() => {
    if(start===true){
      clearInterval(timeOut);
      document.getElementById("timeElement").innerText=testTime;
      return
    }
    const timeElement = document.getElementById("timeElement");
    const time = parseInt(timeElement.innerText);
    if (time === 0) {
      clearInterval(timeOut);
      resultvlaues();
    }
    else {
      let currentTime = time - 1;
      timeElement.innerText = currentTime;
    }
  }, 1000);

}


// send result values to redux store 
const resultvlaues=()=>{
  const totalWord = document.querySelectorAll(".typed").length;
  const incorrectWord = document.querySelectorAll(".typed.error").length;
  const correctWord=totalWord-incorrectWord;
  let wpm=(correctWord/testTime)*60;
  let acc=((correctWord/totalWord) * 100).toFixed(1);
  let raw=(totalWord/testTime)*60;
  dispatch(resultActions.updateResult({wpm:wpm,acc:acc + " %",time:testTime + " Sec",raw:raw}));
  setTestEnd(true);
}



 
//  focus div on Typing function 
  const typingHandler = (event) => {

    if (start && event.key.length === 1) {  
      timer();
    }

// when Backspace is  clicked
    if (event.key === "Backspace" && currentLetter != document.getElementById("wordContainer").firstElementChild.firstElementChild) {
      if (currentLetter && currentLetter === currentWord.firstElementChild) {
        currentLetter.classList.remove(`${styles.currentLetter}`);
        currentWord.classList.remove(`${styles.currentWord}`);
        currentWord = currentWord.previousElementSibling;
        currentWord.classList.add(`${styles.currentWord}`);
        currentLetter = null;
      }
      else if (document.getElementsByClassName(`${styles.currentLetter}`)[0] && currentLetter != currentWord.firstElementChild) {
        currentLetter.classList.remove(`${styles.currentLetter}`);
        currentLetter = currentLetter.previousElementSibling;
        currentLetter.classList.add(`${styles.currentLetter}`);
        if (currentLetter.classList.contains(`${styles.right}`) || currentLetter.classList.contains(`${styles.wrong}`)) {
          currentLetter.classList.remove(`${styles.right}`);
          currentLetter.classList.remove(`${styles.wrong}`);
        }
      }
      else if (!document.getElementsByClassName(`${styles.currentLetter}`)[0]) {
        currentLetter = currentWord.lastElementChild;
        currentLetter.classList.add(`${styles.currentLetter}`);
        if (currentLetter.classList.contains(`${styles.right}`) || currentLetter.classList.contains(`${styles.wrong}`)) {
          currentLetter.classList.remove(`${styles.right}`);
          currentLetter.classList.remove(`${styles.wrong}`);
        }
      }
    }

    if (event.key.length === 1) {
      // when space is clicked
      if (event.key === " " &&  currentWord && currentWord.nextElementSibling ) {
        if(currentLetter===currentWord.firstElementChild){
          return
        }
        currentWord.classList.remove(`${styles.currentWord}`);
        currentWord.classList.add("typed");

        if (currentLetter) {
          currentLetter.classList.remove(`${styles.currentLetter}`);
          while (currentLetter) {
            currentLetter.classList.add(`${styles.wrong}`);
            currentLetter = currentLetter.nextElementSibling;
          }
        }
        if (currentWord.querySelectorAll(`.${styles.wrong}`).length > 0) {
          currentWord.classList.add("error");
        }
        currentWord = currentWord.nextElementSibling;
        currentWord.classList.add(`${styles.currentWord}`);
        currentLetter = currentWord.firstElementChild;
        currentLetter.classList.add(`${styles.currentLetter}`);
      }
      // when a  character is entered
      else {
        if (currentLetter) {
          if (currentLetter.innerText === event.key) {
            currentLetter.classList.add(`${styles.right}`);
          }
          else {
            currentLetter.classList.add(`${styles.wrong}`);

          }
        }
        if (currentWord && currentLetter === currentWord.lastElementChild) {
          currentLetter.classList.remove(`${styles.currentLetter}`);
          currentLetter = null;
        }
        if (currentLetter) {
          currentLetter.classList.remove(`${styles.currentLetter}`);
          currentLetter = currentLetter.nextElementSibling;
          currentLetter.classList.add(`${styles.currentLetter}`);
        }
      }

    }
    // for line up 
   if(cursor){
   const focusDivTop=document.getElementsByClassName(`${styles.focusDiv}`)[0];
   const cursorPosition=cursor.offsetTop-focusDivTop.offsetTop;
   if(cursorPosition>50){
    const words = document.getElementById(`wordContainer`);
    words.style.top = parseInt(window.getComputedStyle(words).top) - 40 + "px";
   }
   }

    cursorPosFun();
  }


  
  

// repeat button handler 
const repeatBtn=()=>{
start=true;
  getStory();
if(testEnd){
setTestEnd(false);
}

  }
  if(!testEnd){
    window.addEventListener("resize",()=>{
      if(cursor){
      cursorPosFun();
      }
    });
  }
  return (
    <>
      <div className={styles.main}>
      {!testEnd &&  <Timer setTime={getTime} />}
       {!testEnd &&<div className={styles.selected}>
        <h3 id="timeElement">{time}</h3>
      </div>}


        {!testEnd?<div className={styles.focusDiv} tabIndex={0} onKeyDown={(event) => typingHandler(event)}>
          <div className={styles.words} id='wordContainer' >
            {story.length>0 && story.map((word, index) => (
              <div key={index} className={styles.word}>
                {word.split("").map((letter, index) => {
                  return <span key={index} className={styles.letter}>{letter}</span>
                })}
              </div>
            ))}
          </div>
            <div className={styles.cursor} id="cursor"></div>
          <div className={styles.focusError}><PiCursorClickFill size={25} />Click here to Continue Typing</div>
        </div>:<Result/>
        }
        <h3><FaRepeat  className={styles.againBtn} onClick={repeatBtn}/></h3>
      </div>
    </>
  )
}

export default DisplayText
