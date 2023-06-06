import React, {FC, useEffect, useState} from 'react'
import {ITweetProps} from "@allTypes/reduxTypes/tweetsStateTypes";
import CharacterCount from '@tiptap/extension-character-count'
import {Color} from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Dropcursor from "@tiptap/extension-dropcursor";
import {Image} from "@tiptap/extension-image";
import ListItem from '@tiptap/extension-list-item'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import {TextStyle} from '@tiptap/extension-text-style';
import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CircleIcon from "src/assets/images/CircleIcon";
import CloseIcon from "src/assets/images/CloseIcon";
import PlusIcon from "src/assets/images/PlusIcon";
import ImageUploadInput from "src/components/TweetsModal/ImageUploadInput";
import MenuBar from "src/components/TweetsModal/MenuBar";
import {dispatch, useAppSelector} from "src/redux/hooks";
import {tweetsMiddleware, tweetsSelector} from "src/redux/slices/tweets";
import {v4 as uuidv4} from 'uuid';

import {LIMIT} from "../../shared/constants";
import TooltipButton from "./TooltipButton";

interface ITweetBodyProps {
    tweet: ITweetProps
    tweetOfId: string
    index: number
}

const TweetBody: FC<ITweetBodyProps> = ({tweet, tweetOfId, index}) => {
    const count = useAppSelector(tweetsSelector.count)
    const tweetsList = useAppSelector(tweetsSelector.tweetsList)
    const uuid = uuidv4();
    const [showCircle, setShowCircle] = useState<boolean>(true)
    const [characterCount, setCharacterCount] = useState(0);
    const tweetOfIndex = useAppSelector(tweetsSelector.tweetOfIndex);

    const editorTextarea = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text.configure({
                HTMLAttributes: {
                    rows: 5,
                },
            }),
            Color.configure({types: [TextStyle.name, ListItem.name]}),
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
        ],
        onUpdate({editor}) {
            dispatch(tweetsMiddleware.updateTweet(editor.getText(), tweet))
        },
        content: ``,
    })

    const handleKeyTwice = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (count >= 2 && editorTextarea && event.key === 'Enter') {
            dispatch(tweetsMiddleware.addNewWithOnKeyTweet(
                {
                    name: 'Sergei',
                    userName: '@Sergei757063608',
                    text: '',
                    id: uuid,
                    imageURL: '',
                },
                index + 1
            ))
            dispatch(tweetsMiddleware.incrementCount(0))
        }

        if (count <= -2 && editorTextarea && event.key === 'Backspace') {
            dispatch(tweetsMiddleware.removeTweet(index - 1))
            dispatch(tweetsMiddleware.incrementCount(0))
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            dispatch(tweetsMiddleware.incrementCount(count + 1))
            handleKeyTwice(event);
        } else if (event.key === 'Backspace' && editorTextarea && !editorTextarea.state.doc.textContent.length && tweetsList.length > 1) {
            dispatch(tweetsMiddleware.incrementCount(count - 1))
            handleKeyTwice(event);
        } else {
            dispatch(tweetsMiddleware.incrementCount(0))
        }
    };

    const editorImage = useEditor({
        extensions: [Document, Paragraph, Text, Image, Dropcursor, CharacterCount.configure({
            limit: LIMIT,
        }),],
        content: ``,
        onUpdate({editor}) {
            const imageNode = editor.getAttributes('image');

            if (imageNode && imageNode.src) {
                dispatch(tweetsMiddleware.updateImageOfTweet(imageNode.src, tweetOfId))
            }
        },
    })

    useEffect(() => {
        if (editorTextarea) {
            const updateCharacterCount = () => {
                const {content} = editorTextarea.getJSON();

                if (content) {
                    const text = content.map((node) => node.text).join(' ');

                    setCharacterCount(text.length);
                }
            };

            editorTextarea.on('update', updateCharacterCount);
            updateCharacterCount();

            return () => {
                editorTextarea.off('update', updateCharacterCount);
            };
        }
    }, [editorTextarea]);

    const percentage = editorTextarea
        ? Math.round((100 / LIMIT) * editorTextarea.state.doc.textContent.length)
        : 0

    const handleAddNewTweet = () => {
        dispatch(tweetsMiddleware.addTweet(
            {
                name: 'Sergeiee',
                userName: '@Sergei757063608',
                text: '',
                id: uuid,
                imageURL: '',
            }
        ))
    }

    const handleDeleteImage = () => {
        if (editorImage) {
            dispatch(tweetsMiddleware.updateImageOfTweet('', tweet.id))
            editorImage.commands.setContent('');
        }
    }

    useEffect(() => {
        if (editorTextarea && tweetOfId) {
            editorTextarea.view.focus()
            dispatch(tweetsMiddleware.updateTweetOfId(tweetsList[index].id))
        }
    }, [editorTextarea])

    useEffect(() => {
        if (editorTextarea && tweetOfId && index + 1 === tweetOfIndex) {
            editorTextarea.view.focus()
            dispatch(tweetsMiddleware.updateTweetOfId(tweetsList[index].id))
            dispatch(tweetsMiddleware.updateTweetOfIndex(index))
        } else if(editorTextarea && tweetOfId && 0 === index){
            editorTextarea.view.focus()
            dispatch(tweetsMiddleware.updateTweetOfId(tweetsList[index].id))
            dispatch(tweetsMiddleware.updateTweetOfIndex(index))
        }
    }, [editorTextarea, index, tweetsList.length])


    return (
        <div className='w-full group'>
            <div className='mt-5 outline-none w-full'>
                <MenuBar editor={editorTextarea}/>
                <div className='mt-5'>
                    <EditorContent onKeyDown={handleKeyDown} className="text-field break-words"
                                   editor={editorTextarea}/>
                </div>
                <div className={`relative ${!editorImage?.getCharacterCount() && 'hidden'}`}>
                    <div onClick={handleDeleteImage}
                         className="h-6 w-6 absolute top-2 z-10 cursor-pointer left-2 p-px transition bg-gray-800 hover:bg-gray-700 rounded-full hover:scale-125">
                        <CloseIcon/>
                    </div>
                    <EditorContent className='mt-3 text-field rounded-lg object-cover shadow-lg border-2'
                                   editor={editorImage}/>
                </div>
            </div>
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
                                <PlusIcon />
                            </div>
                        </button>
                    </TooltipButton>
                </div>
                }
            </div>
        </div>
    )
}

export default TweetBody