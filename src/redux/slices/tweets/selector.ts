import { RootState } from '@redux/store'
import { createSelector } from '@reduxjs/toolkit'

const selector = (state: RootState) => state.tweets
export const tweetsList = createSelector([selector], (state) => state.tweetsList)

export default {
  tweetsList,
}
