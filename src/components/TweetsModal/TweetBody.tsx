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

interface ITweetBodyProps {
    tweet: ITweetProps
}

const TweetBody: FC<ITweetBodyProps> = ({tweet}) => {
    const uuid = uuidv4();
    const limit = 280
    const [showCircle, setShowCircle] = useState<boolean>(true)


    const editorTextarea = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text.configure({
                HTMLAttributes: {
                    rows: 5,
                },
            }),
            CharacterCount.configure({
                limit,
            }),
        ],
        onUpdate({editor}) {
            dispatch(tweetsMiddleware.updateTweet(editor.getText(), tweet))
        },
        content: ``,
    })

    const editorImage = useEditor({
        extensions: [Document, Paragraph, Text, Image, Dropcursor],
        content: ``,
    })

    useEffect(() => {
        if (editorTextarea && tweet.text) {
            editorTextarea.chain().setContent(tweet.text).run();
        }
        if (editorImage && tweet.imageURL) {
            editorImage.chain().focus().setImage({ src: tweet.imageURL }).run()        }
    }, [editorTextarea, tweet]);

    const percentage = editorTextarea
        ? Math.round((100 / limit) * editorTextarea.storage.characterCount.characters())
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
        <div className='w-full'>
            <div className='mt-5 outline-none w-full'>
                <EditorContent className='text-field' editor={editorTextarea}/>

                <div className={`relative ${!editorImage?.getCharacterCount() && 'hidden'}`}>
                    <div onClick={handleDeleteImage}
                         className="h-6 w-6 absolute top-2 z-10 cursor-pointer left-2 p-px text-red-500 transition bg-gray-800 hover:bg-gray-700 rounded-full hover:scale-125">
                        <CloseIcon/>
                    </div>
                    <EditorContent className='mt-4 text-field rounded-lg object-cover shadow-lg border border-2'
                                   editor={editorImage}/>
                </div>
            </div>
            <div className='flex w-full justify-end'>
                {editorTextarea &&
                <div
                    className={`w-28 justify-evenly flex mt-8 justify-end items-center end character-count ${editorTextarea.storage.characterCount.characters() === limit ? 'character-count--warning' : ''}`}>
                    <TooltipButton tooltipTitle={`${editorTextarea.storage.characterCount.characters()}/280`}>
                        <button
                            className='flex transition-all transition ease-in-out delay-50 items-center focus:outline-none hover:-translate-y-1 hover:scale-110 h-5 w-5  text-blue-400'
                            data-tooltip={`${editorTextarea.storage.characterCount.characters()}/${limit}`}
                            onClick={() => setShowCircle(!showCircle)}>
                            {showCircle ? <CircleIcon
                                percentage={percentage}/> : <div
                                className='dark-gray-color'>{(limit - editorTextarea.storage.characterCount.characters())}</div>}
                        </button>
                    </TooltipButton>
                    <TooltipButton tooltipTitle='Add an image'>
                        <ImageUploadInput editor={editorImage}  tweet={tweet} />
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