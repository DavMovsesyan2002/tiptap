import store, {AppDispatch} from '../../store'

import slice from './slice'
import {ITweetProps} from "@allTypes/reduxTypes/tweetsStateTypes";

const {
    setTweetsList,
    setCount,
} = slice.actions

const addTweet = (params: ITweetProps) => async (dispatch: AppDispatch) => {
    const tweetsList = store.getState().tweets.tweetsList
    dispatch(setTweetsList([...tweetsList, params]))
}

const incrementCount = (value: any) => async (dispatch: AppDispatch) => {
    dispatch(setCount(value))
}

const removeTweet = (currentIndex: number) => async (dispatch: AppDispatch) => {
    const tweetsList = store.getState().tweets.tweetsList
    const nextIndex = tweetsList.findIndex((item, index) => index === currentIndex + 1);
    const updatedItems = tweetsList.slice();
    updatedItems.splice(nextIndex, 1);

    dispatch(setTweetsList([...updatedItems]))
}

const addNewWithOnKeyTweet = (params: ITweetProps, currentIndex: number) => async (dispatch: AppDispatch) => {
    const tweetsList = store.getState().tweets.tweetsList;
    const updatedTweetsList = [...tweetsList];

    updatedTweetsList.splice(currentIndex, 0, params);

    dispatch(setTweetsList(updatedTweetsList));
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
    updateImageOfTweet,
    incrementCount,
    removeTweet,
    addNewWithOnKeyTweet
}
