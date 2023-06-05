import React, {useState} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {dispatch, useAppSelector} from "src/redux/hooks";
import {tweetsMiddleware, tweetsSelector} from "src/redux/slices/tweets";
import {Tweet} from "src/components/TweetsModal/Tweet";

const DragAndDropList = () => {
    const tweetsList = useAppSelector(tweetsSelector.tweetsList)
    const [tweetOfId, setTweetOfId] = useState<string>('')

    const onDragEnd = (result: any) => {
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
                                {(provided) => (
                                    <Tweet
                                        setTweetOfId={setTweetOfId}
                                        tweetOfId={tweetOfId}
                                        provided={provided}
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