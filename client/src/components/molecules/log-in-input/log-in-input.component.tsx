import React from 'react';
import { Input } from '../../atoms/input/input.component';
import './log-in-input.css';

type Props = {
    name: string;
    placeholder: string;
    className?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: string[];
    required: boolean;
    type?: string;
};
export const LogInInput = ({
    errors,
    name,
    placeholder,
    onChange,
    className,
    required
}: Props) => {
    return (
        <div className={`ma2 flex justify-center`}>
            <Input
                className={`w-100 pa2 ${className} ${
                    errors.includes(name) ? 'errorBorder' : 'ba b--green'
                }`}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                required={required}
            />
        </div>
    );
};
