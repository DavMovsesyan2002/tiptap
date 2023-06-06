import React, {ChangeEvent,FC} from 'react';
import {Editor} from "@tiptap/react";

import ImageIcon from "../../assets/images/ImageIcon";

interface ImageUploadInputProps {
    editor: Editor | null,
}

const ImageUploadInput: FC<ImageUploadInputProps> = ({ editor}) => {
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();

        reader.onload = () => {
            const imageDataURL = reader.result as string;

            if (editor && imageDataURL) {
                editor.chain().focus().setImage({ src: imageDataURL }).run();
            }
        };

        if(file){
            reader.readAsDataURL(file);
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