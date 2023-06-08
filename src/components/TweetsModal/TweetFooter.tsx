import React, {useState} from "react";
import {ITweetProps} from "@allTypes/reduxTypes/tweetsStateTypes";
import {Editor} from "@tiptap/core";
import CircleIcon from "src/assets/images/CircleIcon";
import PlusIcon from "src/assets/images/PlusIcon";
import ImageUploadInput from "src/components/TweetsModal/ImageUploadInput";
import TooltipButton from "src/components/TweetsModal/TooltipButton";

import {LIMIT} from "../../shared/constants";

interface TweetFooterProps {
    editorTextarea: Editor | null;
    tweetOfId: string;
    tweet: ITweetProps;
    characterCount: number;
    percentage: number;
    editorImage: Editor | null;
    handleAddNewTweet: () => void;
}

const TweetFooter:  React.FC<TweetFooterProps> = ({editorTextarea, tweetOfId, tweet, characterCount, percentage, editorImage, handleAddNewTweet}) => {
    const [showCircle, setShowCircle] = useState<boolean>(true)

    return (
        <div className='flex w-full justify-end mt-4 h-5'>
            {editorTextarea && tweetOfId === tweet.id &&
                <div
                    className={`${editorTextarea.state.doc.textContent.length + characterCount > LIMIT ? 'w-36' : 'w-28'} justify-evenly flex justify-end items-center end character-count`}>
                    <TooltipButton
                        tooltipTitle={`${editorTextarea.state.doc.textContent.length + characterCount}/280`}>
                        <button
                            type="button"
                            className={`flex transition-all transition ease-in-out delay-50 items-center focus:outline-none hover:-translate-y-1 hover:scale-110 h-5 w-5  ${editorTextarea.state.doc.textContent.length + characterCount > LIMIT ? 'text-rose-400' : 'text-blue-400'}`}
                            data-tooltip={`${editorTextarea.state.doc.textContent.length + characterCount}/${LIMIT}`}
                            onClick={() => setShowCircle(!showCircle)}>
                            {showCircle ? <CircleIcon
                                percentage={percentage}/> : <div
                                className={`${editorTextarea.state.doc.textContent.length + characterCount > LIMIT ? 'text-rose-400 ' : 'dark-gray-color'} text-sm text-gray-500 flex justify-center hover:text-blue-400 transition-all transition ease-in-out delay-50`}>{(LIMIT - editorTextarea.state.doc.textContent.length - characterCount)}</div>}
                        </button>
                    </TooltipButton>
                    <TooltipButton tooltipTitle='Add an image'>
                        <ImageUploadInput editor={editorImage}/>
                    </TooltipButton>
                    <TooltipButton tooltipTitle='Add a new tweet'>
                        <button onClick={handleAddNewTweet} type="button" className='focus:outline-none'>
                            <div
                                className='h-5 w-5 text-gray-300 hover:text-blue-400 transition-all transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-110 duration-300'>
                                <PlusIcon/>
                            </div>
                        </button>
                    </TooltipButton>
                </div>
            }
        </div>
    )
}

export default TweetFooter