import {ITweetProps} from "@allTypes/reduxTypes/tweetsStateTypes";
import {Color} from '@tiptap/extension-color'
import Document from "@tiptap/extension-document";
import ListItem from '@tiptap/extension-list-item'
import Paragraph from '@tiptap/extension-paragraph'
import Text from "@tiptap/extension-text";
import {TextStyle} from '@tiptap/extension-text-style';
import {useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {dispatch} from "src/redux/hooks";
import {tweetsMiddleware} from "src/redux/slices/tweets";

const useEditorTextarea = ({tweet} : {tweet: ITweetProps}) => {
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

    return editorTextarea;
};

export default useEditorTextarea;