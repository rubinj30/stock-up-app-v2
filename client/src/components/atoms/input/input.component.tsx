import React from 'react';
import './input.css';

type Props = {
    placeholder?: string;
    className?: string;
    onChange?: (data: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number;
    required?: boolean;
    name?: string;
    size?: Size;
};

type Size = 'small' | 'medium' | 'large';

export const Input = ({
    value,
    required,
    onChange,
    placeholder,
    className,
    name,
    size = 'medium'
}: Props) => {

    // default is medium
    let style = 'mediumInput';
    if (size === 'small') {
        style = 'smallInput';
    } else if (size === 'large') {
        style = 'largeInput';
    }

    // adding className passed sizing option
    style += ` mh0 ${className}`;

    let type = 'text';
    if (name && name.toLowerCase().includes('password')) {
        type = 'password';
    }
    if (name && name.toLowerCase().includes('phone')) {
        type = 'tel';
    }
    return (
        <input
            value={value}
            required={required}
            onChange={onChange}
            className={style}
            placeholder={placeholder}
            name={name}
            type={type}
        />
    );
};
