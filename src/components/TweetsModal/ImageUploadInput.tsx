import React, {FC, ChangeEvent} from 'react';
import ImageIcon from "../../assets/images/ImageIcon";
import {Editor} from "@tiptap/react";
import {dispatch} from "src/redux/hooks";
import {tweetsMiddleware} from "src/redux/slices/tweets";
import {ITweetProps} from "@allTypes/reduxTypes/tweetsStateTypes";

interface ImageUploadInputProps {
    editor: Editor | null,
    tweet: ITweetProps
}

const ImageUploadInput: FC<ImageUploadInputProps> = ({ tweet, editor}) => {

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && editor) {
            const imageUrl = URL.createObjectURL(file);
            editor.chain().focus().setImage({src: imageUrl}).run();

            dispatch(tweetsMiddleware.updateImageOfTweet(imageUrl, tweet.id))

        }
    };

    return (
        <div>
            <label htmlFor="dropzone-file" className="flex cursor-pointer">
                <div
                     className="flex h-5 w-5 text-gray-300 hover:text-blue-400 transition-all transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-110 duration-300 flex-col items-center justify-center">
                    <ImageIcon/>
                </div>
                <input onChange={handleImageChange} id="dropzone-file" type="file" className="hidden"/>
            </label>
        </div>
    );
};

export default ImageUploadInput;