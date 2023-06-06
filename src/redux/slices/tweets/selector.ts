import { RootState } from '@redux/store'
import { createSelector } from '@reduxjs/toolkit'

const selector = (state: RootState) => state.tweets

export const tweetsList = createSelector([selector], (state) => state.tweetsList)
export const count = createSelector([selector], (state) => state.count)
export const tweetOfId = createSelector([selector], (state) => state.tweetOfId)
export const tweetOfIndex = createSelector([selector], (state) => state.tweetOfIndex)

export default {
  tweetsList,
  count,
  tweetOfId,
  tweetOfIndex
}
