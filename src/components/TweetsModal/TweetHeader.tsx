import React, {FC} from "react";
import {ITweetProps} from "@allTypes/reduxTypes/tweetsStateTypes";

interface ITweetHeaderProps {
    tweet: ITweetProps
}


const TweetHeader: FC<ITweetHeaderProps> = ({tweet}) => (
    <div className='flex items-center'>
        <div className='leading-6 text-base font-bold'>{tweet.name}</div>
        <div className='user-name text-sm ml-1'>{tweet.userName}</div>
    </div>
)

export default TweetHeader