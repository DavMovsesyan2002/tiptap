import React from 'react'
import DragAndDropList from "src/components/TweetsModal/DragAndDropList";

export const TweetsModal = () => ( 
        <div className='w-full absolute right-0 bg-white h-full overflow-y-auto write-modal-container font-circular'>
            <DragAndDropList/>
        </div>
    )