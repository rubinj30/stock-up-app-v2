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
    const style = `inputStyle mh0 ${className}`;
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
