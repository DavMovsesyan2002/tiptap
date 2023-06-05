import React, {ReactElement} from 'react';

interface TooltipButtonProps {
    children: ReactElement;
    tooltipTitle: string
}

const TooltipButton = ({children, tooltipTitle}: TooltipButtonProps) => {

    return <div className='group/item flex relative duration-300'>
        <span
            className="group/edit group-hover/item:flex absolute hidden  w-max absolute bottom-1/4
            left-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-y-full w-auto
            px-2 py-1  rounded-lg text-center text-sm after:content-['']
            after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2
            after:border-8 after:border-x-transparent after:border-b-transparent
            after:border-t-white bg-white
            shadow-lg after:arrow-tooltip">
            {tooltipTitle}
        </span>
        {children}
    </div>
};

export default TooltipButton;