import React from 'react';
import './log-in-tabs.css';

type TabsProps = {
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    isLogIn: boolean;
};

export const LogInTabs = ({ handleClick, isLogIn }: TabsProps) => (
    <div className="f4 flex">
        <div
            onClick={handleClick}
            className={`w-50 pv1 tc bottomBorder ${
                !isLogIn ? 'bg-white green leftTabBorderRadius pointer' : 'white'
            }`}
        >
            Log In
        </div>
        <div
            onClick={handleClick}
            className={`w-50 pv1 tc bottomBorder ${
                isLogIn ? 'bg-white green rightTabBorderRadius pointer' : 'white'
            }`}
        >
            Sign Up
        </div>
    </div>
);
