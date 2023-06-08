import {ITweetProps} from "@allTypes/reduxTypes/tweetsStateTypes";

import store, {AppDispatch} from '../../store'

import slice from './slice'

const {
    setTweetsList,
    setCount,
    setTweetOfId,
    setTweetOfIndex
} = slice.actions

const addTweet = (params: ITweetProps) => async (dispatch: AppDispatch) => {
    const {tweetsList} = store.getState().tweets

    dispatch(setTweetsList([...tweetsList, params]))
}

const updateTweetOfId = (value: string) => async (dispatch: AppDispatch) => {
    dispatch(setTweetOfId(value))
}

const updateTweetOfIndex = (value: number) => async (dispatch: AppDispatch) => {
    dispatch(setTweetOfIndex(value))
}


const incrementCount = (value: number) => async (dispatch: AppDispatch) => {
    dispatch(setCount(value))
}

const removeTweet = (currentIndex: number) => async (dispatch: AppDispatch) => {
    const {tweetsList} = store.getState().tweets
    const nextIndex = tweetsList.findIndex((item, index) => index === currentIndex + 1);
    const updatedItems = tweetsList.slice();

    updatedItems.splice(nextIndex, 1);

    dispatch(setTweetsList([...updatedItems]))
}
 
const addNewWithOnKeyTweet = (params: ITweetProps, currentIndex: number) => async (dispatch: AppDispatch) => {
    const {tweetsList} = store.getState().tweets;
    const updatedTweetsList = [...tweetsList];

    updatedTweetsList.splice(currentIndex, 0, params);
    dispatch(setTweetsList(updatedTweetsList));
}

const updateTweet = (value: string, params: ITweetProps) => async (dispatch: AppDispatch) => {
    const {id} = params
    const {tweetsList} = store.getState().tweets

    const updateTweetsList = tweetsList.map((item) => item.id === id ? {...item, text: value} : item);

    dispatch(setTweetsList([...updateTweetsList]))
}

const updateImageOfTweet = (url: string, id: string) => async (dispatch: AppDispatch) => {
    const {tweetsList} = store.getState().tweets

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
    updateImageOfTweet,
    incrementCount,
    removeTweet,
    updateTweetOfId,
    addNewWithOnKeyTweet,
    updateTweetOfIndex
}
