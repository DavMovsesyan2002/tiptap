import { combineReducers } from 'redux'

import {tweetsSlice} from "./slices/tweets";

const reducer = combineReducers({
  tweets: tweetsSlice.reducer
})

export default reducer
