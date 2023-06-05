import store, {AppDispatch} from '../../store'

import slice from './slice'
import {ITweetProps, ITweetsProps} from "@allTypes/reduxTypes/tweetsStateTypes";

const {
    setTweetsList,
} = slice.actions

const addTweet = (params: ITweetProps) => async (dispatch: AppDispatch) => {
    const tweetsList = store.getState().tweets.tweetsList
    dispatch(setTweetsList([...tweetsList, params]))
}

const updateTweet = (value: string, params: ITweetProps) => async (dispatch: AppDispatch) => {
    const {id} = params
    const tweetsList = store.getState().tweets.tweetsList

    const updateTweetsList = tweetsList.map((item) => item.id === id ? {...item, text: value} : item);

    dispatch(setTweetsList([...updateTweetsList]))
}

const updateImageOfTweet = (url: string, id: any) => async (dispatch: AppDispatch) => {
    const tweetsList = store.getState().tweets.tweetsList

    const updateTweetsList = tweetsList.map((item) => item.id === id ? {...item, imageURL: url} : item);

    dispatch(setTweetsList([...updateTweetsList]))
}

const moveTweet = (params: ITweetProps[]) => async (dispatch: AppDispatch) => {
    dispatch(setTweetsList([...params]))
}

export default {
    addTweet,
    moveTweet,
    updateTweet,
    updateImageOfTweet
}
