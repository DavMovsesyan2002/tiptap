import type {Identifier, XYCoord} from 'dnd-core'
import type {FC} from 'react'
import React, {useRef} from 'react'
import {useDrag, useDrop} from 'react-dnd'

import {ItemTypes} from './ItemTypes'
import Profile from "../../assets/images/profile.png";
import TweetBody from "./TweetBody";
import DragIndicator from "src/assets/images/DragIndicator";
import {useAppSelector} from "src/redux/hooks";
import {tweetsSelector} from "src/redux/slices/tweets";
import TweetHeader from "src/components/TweetsModal/TweetHeader";
import {ITweetProps} from "@allTypes/reduxTypes/tweetsStateTypes";

interface DragItemProps {
    index: number
    tweet: ITweetProps
    moveTweet: (dragIndex: number, hoverIndex: number) => void
}

export const Tweet: FC<DragItemProps> = ({tweet, index, moveTweet}) => {
    const ref = useRef<HTMLDivElement>(null)

    const tweetsList = useAppSelector(tweetsSelector.tweetsList)

    const [{handlerId}, drop] = useDrop<DragItemProps,
        void,
        { handlerId: Identifier | null }>({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItemProps, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveTweet(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const [{isDragging}, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return {id: tweet.id, index}
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1

    drag(drop(ref))

    return (
        <div data-handler-id={handlerId}>
            <div className='px-12 group'>
                <div className='flex'>
                    <div className='flex h-auto w-30'>
                        <div className='cursor-move w-10 h-14 items-center mr-2 justify-end flex' ref={ref}
                             style={{opacity}}>
                            <div className='justify-center hidden items-center group-hover:flex'>
                                <DragIndicator/>
                            </div>
                        </div>
                        <div className='flex flex-col h-full items-center'>
                            <img
                                className="h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                                src={Profile}/>
                            <span
                                className={`${tweetsList.length - 1 !== index ? 'block' : 'hidden'} h-full w-0.5 mt-2 mb-2 bg-gray-200 animate__animated animate__fadeInDown animate__fast`}
                                aria-hidden="true"/>
                        </div>
                    </div>
                    <div className='flex-col flex items-start w-10/12 ml-5'>
                        <TweetHeader tweet={tweet}/>
                        <TweetBody tweet={tweet} />
                    </div>
                </div>
            </div>
        </div>
    )
}
