import React from 'react'

const MenuBar = ({editor}: any) => {
    if (!editor) {
        return null
    }

    return (
        <div className='mb-2 flex'>
            <div className='mr-2'>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={`${editor.isActive('bold') ? 'is-active bg-black text-white' : 'border-solid border border-black'} rounded-md

 p-1`}
                >
                    bold
                </button>
            </div>
            <div className='mr-2'>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    className={`${editor.isActive('italic') ? 'is-active bg-black text-white' : 'border-solid border border-black'} rounded-md

 p-1`}
                >
                    italic
                </button>
            </div>
            <div className='mr-2'>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`${editor.isActive('bulletList') ? 'is-active bg-black text-white' : 'border-solid border border-black'} rounded-md

 p-1`}
                >
                    bullet list
                </button>
            </div>
            <div className={`mr-2`}>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`${editor.isActive('orderedList') ? 'is-active bg-black text-white' : 'border-solid border border-black'} rounded-md

 p-1`}
                >
                    ordered list
                </button>
            </div>
        </div>
    )
}

export default MenuBar