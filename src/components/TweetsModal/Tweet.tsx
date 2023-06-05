import type {FC} from 'react'
import React from 'react'
import Profile from "../../assets/images/profile.png";
import TweetBody from "./TweetBody";
import DragIndicator from "src/assets/images/DragIndicator";
import {useAppSelector} from "src/redux/hooks";
import {tweetsSelector} from "src/redux/slices/tweets";
import TweetHeader from "src/components/TweetsModal/TweetHeader";
import {  DraggableProps } from "react-beautiful-dnd";

interface DragItemProps {
    provided: any
    item: any
    snapshot: any
    tweetOfId: any
    setTweetOfId: any
    index: number
}

export const Tweet: FC<DragItemProps> = ({provided, snapshot, item, tweetOfId, setTweetOfId, index}) => {
    const tweetsList = useAppSelector(tweetsSelector.tweetsList)
    const isDragging = snapshot.isDragging;

    const isDraggingOver = snapshot.isDraggingOver;

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const renderDragHandle = (dragHandleProps: DraggableProps | undefined) => {
        return (
            <div onDragStart={handleDragStart} draggable={Boolean(dragHandleProps)} {...dragHandleProps} className='drag-handle cursor-move w-10 h-14 items-center mr-2 justify-end flex'>
                <div className='justify-center hidden items-center group-hover:flex'>
                    <DragIndicator/>
                </div>
            </div>
        );
    };

    return (
        <div className={`${isDraggingOver && !isDragging ? 'shadow-lg' : ''}`}  key={item.id} ref={provided.innerRef} onClick={() => setTweetOfId(item.id)}
             {...provided.draggableProps}>
            <div className='px-12 group'>
                <div className='flex'>
                    <div className='flex h-auto w-1/5 min-w-max'>
                        {renderDragHandle(provided.dragHandleProps)}
                        <div className='flex flex-col h-full items-center'>
                            <img
                                className="h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                                src={Profile}/>
                            <span
                                className={`${tweetsList.length - 1 !== index ? 'block' : 'hidden'} h-full w-0.5 mt-2 mb-2 bg-gray-200 animate__animated animate__fadeInDown animate__fast`}
                                aria-hidden="true"/>
                        </div>
                    </div>
                    <div className='flex-col flex items-start w-4/5 pl-5' onClick={() => setTweetOfId(item.id)}>
                        <TweetHeader tweet={item}/>
                        <TweetBody tweet={item} tweetOfId={tweetOfId}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
