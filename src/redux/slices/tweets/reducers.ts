import { IAction } from '@redux/store'
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice'
import {ITweetProps, ITweetsProps} from "@allTypes/reduxTypes/tweetsStateTypes";

const createReducer = <T extends SliceCaseReducers<ITweetsProps>>(reducer: T) => ({ ...reducer })

const reducers = createReducer({
  setTweetsList(state, action: IAction<ITweetProps[]>) {
    state.tweetsList = action.payload
  },
})

export default reducers
