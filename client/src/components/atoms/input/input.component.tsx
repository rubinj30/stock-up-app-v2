import React from 'react';
import './input.css';

type Props = {
    placeholder?: string;
    className?: string;
    onChange?: (data: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number;
    required?: boolean;
    name?: string;
};

export const Input = ({
    value,
    required,
    onChange,
    placeholder,
    className,
    name
}: Props) => {
    const style = `inputStyle border-box mh0 ba ${className}`;
    return (
        <input
            value={value}
            required={required}
            onChange={onChange}
            className={style}
            placeholder={placeholder}
            name={name}
        />
    );
};
