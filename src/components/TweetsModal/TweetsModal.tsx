import React from 'react'
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import DraggableEditorContent from './DraggableEditorContent';

export const TweetsModal = () => {
    return (
        <div className='w-full absolute right-0 bg-white h-full overflow-y-auto write-modal-container'>
            <DndProvider backend={HTML5Backend}>
                <DraggableEditorContent/>
            </DndProvider>
        </div>
    )
}