import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import {Tweet} from "src/components/TweetsModal/Tweet";
import {dispatch, useAppSelector} from "src/redux/hooks";
import {tweetsMiddleware, tweetsSelector} from "src/redux/slices/tweets";

const DragAndDropList = () => {
    const tweetsList = useAppSelector(tweetsSelector.tweetsList)
    const tweetOfId = useAppSelector(tweetsSelector.tweetOfId)
    
    const onDragEnd = (result: DropResult) => {
        if (result.destination) {
            const newItems = Array.from(tweetsList);
            const [removed] = newItems.splice(result.source.index, 1);

            newItems.splice(result.destination.index, 0, removed);
            dispatch(tweetsMiddleware.moveTweet(newItems))
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppableId">
                {(provided) => (
                    <div className='w-full py-9' {...provided.droppableProps} ref={provided.innerRef}>
                        {tweetsList.map((item, index) => (
                            <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                {(draggableProvided) => (
                                    <Tweet
                                        tweetOfId={tweetOfId}
                                        provided={draggableProvided}
                                        item={item}
                                        index={index}
                                    />
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DragAndDropList