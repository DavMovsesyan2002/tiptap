import React, {FC} from "react";
import {ITweetProps} from "@allTypes/reduxTypes/tweetsStateTypes";

interface ITweetHeaderProps {
    tweet: ITweetProps
}


const TweetHeader: FC<ITweetHeaderProps> = ({tweet}) => (
    <div className='flex items-center text-sm'>
        <div className='font-bold text-gray-900 tracking-wide select-none text-base mr-0.5 font-circular'>{tweet.name}</div>
        <div className='ml-1 text-gray-500 select-none'>{tweet.userName}</div>
    </div>
)

export default TweetHeader