import React from 'react';

const DefaultButton = ({
    label = "Click the Button",
    onClick,
    type = "button",
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-full py-2 px-8 rounded-xl font-semibold text-white
                transition-all duration-200 shadow-md hover:shadow-lg
                ${disabled
                    ? 'bg-gray-400 cursor-not-allowed'
                    : `bg-gradient-to-r from-[#0052CC] via-[#0052CC] to-[#0047B3]
                       hover:from-[#0047B3] hover:via-[#003D99] hover:to-[#003380]
                       focus:outline-none focus:ring-2 focus:ring-[#0052CC]/40`}
                transform hover:-translate-y-0.5`}
        >
            {label}
        </button>
    );
};

export default DefaultButton;