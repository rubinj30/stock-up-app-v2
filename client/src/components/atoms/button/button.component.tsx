import React from 'react';
import './button.css';

type Props = {
    // TODO: change any type
    onClick?: (e: React.MouseEvent<any>) => void;
    className?: string;
    label?: string;
    size?: Size;
    type?: ButtonType;
};

type Size = 'small' | 'medium' | 'large';
type ButtonType = 'submit' | 'reset' | 'button' | undefined;

export const Button = ({
    onClick,
    className,
    label,
    size = 'medium',
    type = 'submit'
}: Props) => {
    return (
        <button
            onClick={onClick}
            className={`button pointer border ${className} ${size}`}
            type={type}
        >
            {label}
        </button>
    );
};
