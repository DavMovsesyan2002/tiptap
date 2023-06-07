import React, {FC, useEffect, useState} from 'react'
import {ITweetProps} from "@allTypes/reduxTypes/tweetsStateTypes";
import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Dropcursor from "@tiptap/extension-dropcursor";
import {Image} from "@tiptap/extension-image";
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import {EditorContent, useEditor} from '@tiptap/react'
import CloseIcon from "src/assets/images/CloseIcon";
import useEditorTextarea from "src/components/TweetsModal/Editor/useEditorTextarea";
import MenuBar from "src/components/TweetsModal/MenuBar";
import TweetFooter from "src/components/TweetsModal/TweetFooter";
import {dispatch, useAppSelector} from "src/redux/hooks";
import {tweetsMiddleware, tweetsSelector} from "src/redux/slices/tweets";
import {createNewTweetObject} from "src/utils/tweetUtils";
import {v4 as uuidv4} from 'uuid';

import {LIMIT} from "../../shared/constants";

interface ITweetBodyProps {
    tweet: ITweetProps
    tweetOfId: string
    index: number
    handleClick: () => void
}

const TweetBody: FC<ITweetBodyProps> = ({tweet, tweetOfId, index, handleClick}) => {
    const count = useAppSelector(tweetsSelector.count)
    const tweetsList = useAppSelector(tweetsSelector.tweetsList)
    const uuid = uuidv4();
    const [characterCount, setCharacterCount] = useState(0);
    const tweetOfIndex = useAppSelector(tweetsSelector.tweetOfIndex);
    const editorTextarea = useEditorTextarea({tweet});

    const handleKeyTwice = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (count >= 2 && editorTextarea && event.key === 'Enter') {
            dispatch(tweetsMiddleware.addNewWithOnKeyTweet(
                createNewTweetObject({uuid}),
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

        return undefined;
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

    const UpdateTweetIdAndIndex = () => {
        if (editorTextarea && tweetOfId) {
            editorTextarea.view.focus()
            dispatch(tweetsMiddleware.updateTweetOfId(tweetsList[index].id))
            dispatch(tweetsMiddleware.updateTweetOfIndex(index - 1))
        }
    }

    const SetZeroOfTweetIdAndIndex = () => {
        if (editorTextarea && tweetOfId) {
            editorTextarea.view.focus()
            dispatch(tweetsMiddleware.updateTweetOfId(tweetsList[0].id))
            dispatch(tweetsMiddleware.updateTweetOfIndex(0))
        }
    }

    useEffect(() => {
        UpdateTweetIdAndIndex()
    }, [editorTextarea])

    useEffect(() => {
        if (editorTextarea && index === tweetOfIndex) {
            UpdateTweetIdAndIndex()
        } else if (editorTextarea && index === 0) {
            SetZeroOfTweetIdAndIndex()
        }
    }, [editorTextarea, index, tweetsList.length])


    return (
        <div className='w-full group'>
            <div className='mt-5 outline-none w-full'>
                <MenuBar editor={editorTextarea}/>
                <div className='mt-5'>
                    <EditorContent onClick={handleClick} onKeyDown={handleKeyDown} className="text-field break-words"
                                   editor={editorTextarea}/>
                </div>
                <div className={`relative ${!editorImage?.storage.characterCount.characters() && 'hidden'}`}>
                    <button type='button' onClick={handleDeleteImage}
                            className="h-6 w-6 absolute top-2 z-10 cursor-pointer left-2 p-px transition bg-gray-800 hover:bg-gray-700 rounded-full hover:scale-125">
                        <CloseIcon/>
                    </button>
                    <EditorContent className='mt-3 text-field rounded-lg object-cover shadow-lg border-2'
                                   editor={editorImage}/>
                </div>
            </div>
            <TweetFooter editorTextarea={editorTextarea} tweetOfId={tweetOfId} tweet={tweet}
                         characterCount={characterCount} percentage={percentage} editorImage={editorImage}
                         handleAddNewTweet={handleAddNewTweet}/>
        </div>
    )
}

export default TweetBody