import {ITweetProps, ITweetsProps} from "@allTypes/reduxTypes/tweetsStateTypes";
import {IAction} from '@redux/store'
import {SliceCaseReducers} from '@reduxjs/toolkit/src/createSlice'
 
const createReducer = <T extends SliceCaseReducers<ITweetsProps>>(reducer: T) => ({...reducer})

const reducers = createReducer({
    setTweetsList(state, action: IAction<ITweetProps[]>) {
        state.tweetsList = action.payload
    },
    setCount(state, action: IAction<number>) {
        state.count = action.payload
    },
    setTweetOfId(state, action: IAction<string>) {
        state.tweetOfId = action.payload
    },
    setTweetOfIndex(state, action: IAction<number>) {
        state.tweetOfIndex = action.payload
    },
})


export default reducers
