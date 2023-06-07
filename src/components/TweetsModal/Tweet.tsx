import React, { useCallback } from 'react';
import { DraggableProvided, DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { ITweetProps } from '@allTypes/reduxTypes/tweetsStateTypes';
import DragIndicator from 'src/assets/images/DragIndicator';
import TweetHeader from 'src/components/TweetsModal/TweetHeader';
import { dispatch,useAppSelector } from 'src/redux/hooks';
import { tweetsMiddleware,tweetsSelector } from 'src/redux/slices/tweets';

import Profile from '../../assets/images/profile.png';

import TweetBody from './TweetBody';

interface DragItemProps {
    provided: DraggableProvided;
    item: ITweetProps;
    tweetOfId: string;
    index: number;
}

export const Tweet: React.FC<DragItemProps> = ({provided, item, tweetOfId, index}) => {
    const tweetsList = useAppSelector(tweetsSelector.tweetsList);

    const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }, []);

    const handleClickUpdateTweetOfIdAndIndex = () => {
        dispatch(tweetsMiddleware.updateTweetOfId(item.id))
        dispatch(tweetsMiddleware.updateTweetOfIndex(index - 1))
    };

    const renderDragHandle = (dragHandleProps?: DraggableProvidedDragHandleProps | null) => {
        if (dragHandleProps === undefined) {
            return null
        }

        return (
            <div
                onDragStart={handleDragStart}
                draggable={Boolean(dragHandleProps)}
                {...dragHandleProps}
                className='drag-handle cursor-move w-10 h-14 items-center mr-2 justify-end flex'
            >
                <div className='justify-center hidden items-center group-hover:flex'>
                    <DragIndicator/>
                </div>
            </div>
        );
    };

    return (
        <div key={item.id} ref={provided.innerRef} {...provided.draggableProps}>
            <div className="px-12 group">
                <div className="flex">
                    <div className="flex h-auto w-1/5 min-w-max">
                        {renderDragHandle(provided.dragHandleProps)}
                        <div className="flex flex-col h-full items-center">
                            <img
                                className="h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                                src={Profile}
                                alt="Profile"
                            />
                            <span
                                className={`${
                                    tweetsList.length - 1 !== index ? 'block' : 'hidden'
                                } h-full w-0.5 mt-2 mb-2 bg-gray-200 animate__animated animate__fadeInDown animate__fast`}
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                    <div className="flex-col flex items-start w-4/5 pl-5">
                        <TweetHeader tweet={item} />
                        <TweetBody handleClick={handleClickUpdateTweetOfIdAndIndex} tweet={item} tweetOfId={tweetOfId} index={index} />
                    </div>
                </div>
            </div>
        </div>
    );
};