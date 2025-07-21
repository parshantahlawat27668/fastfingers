import { configureStore, createSlice } from "@reduxjs/toolkit";

const resultSlice=createSlice({
    name:"result",
    initialState:{resultData:{
        wpm:0,
        acc:"0%",
        time:"Sec",
        raw:0
    }},
    reducers:{
        updateResult:(state,actions)=>{
          state.resultData=actions.payload;
        }
    }

});




const storiesSlice=createSlice({
    name:"story",
    initialState:{storyArray:[]},
    reducers:{
        setStory:(state,actions)=>{ 
              state.storyArray=actions.payload;
        },
      
    }
})

const appStore=configureStore({
    reducer:{
story:storiesSlice.reducer,
result:resultSlice.reducer,
    }
});

export const  storiesActions=storiesSlice.actions;
export const resultActions=resultSlice.actions;

export default appStore;        