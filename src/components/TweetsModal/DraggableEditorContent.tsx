import update from 'immutability-helper'
import type {FC} from 'react'
import {useCallback, useEffect, useState} from 'react'
import {Tweet} from './Tweet'
import {dispatch, useAppSelector} from "src/redux/hooks";
import {ITweetProps} from "@allTypes/reduxTypes/tweetsStateTypes";
import {tweetsMiddleware, tweetsSelector} from "src/redux/slices/tweets";

const DraggableEditorContent: FC = () => {
    const tweetsList = useAppSelector(tweetsSelector.tweetsList)

    const [tweets, setTweets] = useState<ITweetProps[]>([])

    useEffect(() => {
        setTweets(tweetsList)
    }, [tweetsList])

    const moveTweet = useCallback((dragIndex: number, hoverIndex: number) => {
        let tweet

        setTweets((prevCards: ITweetProps[]) => {
                tweet = update(prevCards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, prevCards[dragIndex] as ITweetProps],
                    ],
                })

                return tweet
            }
        )
        if(tweet){
            dispatch(tweetsMiddleware.moveTweet(tweet))
        }

    }, [])


    const renderTweet = useCallback(
        (tweet: ITweetProps, index: number) => {
            return (
                <Tweet
                    index={index}
                    tweet={tweet}
                    moveTweet={moveTweet}
                />
            )
        },
        [],
    )

    return (
        <>
            <div className='w-full py-9'>
                {tweets.map((tweet, i) => renderTweet(tweet, i))}
            </div>
        </>
    )
}

export default DraggableEditorContent