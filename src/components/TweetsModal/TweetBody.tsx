import CircleIcon from "../../assets/images/CircleIcon";
import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import {EditorContent, useEditor} from '@tiptap/react'
import React, {FC, useEffect, useState} from 'react'
import PlusIcon from "../../assets/images/PlusIcon";
import TooltipButton from "./TooltipButton";
import {dispatch} from "../../redux/hooks";
import {tweetsMiddleware} from "../../redux/slices/tweets";
import {Image} from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import ImageUploadInput from "src/components/TweetsModal/ImageUploadInput";
import CloseIcon from "src/assets/images/CloseIcon";
import {v4 as uuidv4} from 'uuid';
import {ITweetProps} from "@allTypes/reduxTypes/tweetsStateTypes";
import MenuBar from "src/components/TweetsModal/MenuBar";
import {Color} from '@tiptap/extension-color'
import {TextStyle} from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit'
import ListItem from '@tiptap/extension-list-item'

interface ITweetBodyProps {
    tweet: ITweetProps
    tweetOfId: string
}

const TweetBody: FC<ITweetBodyProps> = ({tweet, tweetOfId}) => {
    const uuid = uuidv4();
    const limit = 280
    const [showCircle, setShowCircle] = useState<boolean>(true)
    const [characterCount, setCharacterCount] = useState(0);

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
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
            }),
        ],
        onUpdate({editor}) {
            dispatch(tweetsMiddleware.updateTweet(editor.getText(), tweet))
        },
        content: ``,
    })

    const editorImage = useEditor({
        extensions: [Document, Paragraph, Text, Image, Dropcursor, CharacterCount.configure({
            limit,
        }),],
        content: ``,
        onUpdate({editor}) {
            console.log(tweet.id, "tweet.id")
            const imageNode = editor.getAttributes('image');
            if (imageNode && imageNode.src) {
                console.log(tweetOfId, "imageNode", imageNode)
                dispatch(tweetsMiddleware.updateImageOfTweet(imageNode.src, tweetOfId))
            }
        },
    })

    useEffect(() => {
        if (editorTextarea) {
            const updateCharacterCount = () => {
                const content = editorTextarea.getJSON().content;
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
        ? Math.round((100 / limit) * editorTextarea.state.doc.textContent.length)
        : 0


    const handleAddNewCard = () => {
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
            dispatch(tweetsMiddleware.updateImageOfTweet('', tweet))
            editorImage.commands.setContent('');
        }
    }

    return (
        <div className='w-full group'>
            <div className='mt-5 outline-none w-full'>
                <MenuBar editor={editorTextarea}/>
                <div className='mt-5'>
                    <EditorContent className='text-field break-words'
                                   editor={editorTextarea}/>
                </div>
                <div className={`relative ${!editorImage?.getCharacterCount() && 'hidden'}`}>
                    <div onClick={handleDeleteImage}
                         className="h-6 w-6 absolute top-2 z-10 cursor-pointer left-2 p-px text-red-500 transition bg-gray-800 hover:bg-gray-700 rounded-full hover:scale-125">
                        <CloseIcon/>
                    </div>
                    <EditorContent className='mt-3 text-field rounded-lg object-cover shadow-lg border border-2'
                                   editor={editorImage}/>
                </div>
            </div>
            <div className='grid grid-flow-col auto-cols-max w-full justify-end mt-4 h-5 '>
                {editorTextarea && tweetOfId === tweet.id &&
                <div
                    className={`w-28 justify-evenly flex justify-end items-center end character-count`}>
                    <TooltipButton
                        tooltipTitle={`${editorTextarea.state.doc.textContent.length + characterCount}/280`}>
                        <button
                            className={`flex transition-all transition ease-in-out delay-50 items-center focus:outline-none hover:-translate-y-1 hover:scale-110 h-5 w-5  ${editorTextarea.state.doc.textContent.length + characterCount > limit ? 'text-red-400' : 'text-blue-400'}`}
                            data-tooltip={`${editorTextarea.state.doc.textContent.length + characterCount}/${limit}`}
                            onClick={() => setShowCircle(!showCircle)}>
                            {showCircle ? <CircleIcon
                                percentage={percentage}/> : <div
                                className={`${editorTextarea.state.doc.textContent.length + characterCount > limit ? 'text-red-400' : 'dark-gray-color'}`}>{(limit - editorTextarea.state.doc.textContent.length - characterCount)}</div>}
                        </button>
                    </TooltipButton>
                    <TooltipButton tooltipTitle='Add an image'>
                        <ImageUploadInput editor={editorImage} tweet={tweet}/>
                    </TooltipButton>
                    <TooltipButton tooltipTitle='Add a new tweet'>
                        <button onClick={handleAddNewCard} type="button" className='focus:outline-none'>
                            <div
                                className='h-5 w-5 text-gray-300 hover:text-blue-400 transition-all transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-110 duration-300'>
                                <PlusIcon/>
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