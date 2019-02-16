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
    // if the name prop is included in the error list OR the name prop is email and 'userExists' is in the errors
    const isError =
        errors.includes(name) ||
        (name === 'emailAddress' && errors.includes('existingUser'));
    console.log('error', isError);
    return (
        <div className={`ma2 flex justify-center`}>
            <Input
                className={`w-100 pa2 ${className} ${
                    isError ? 'errorBorder' : 'ba b--green'
                }`}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                required={required}
            />
        </div>
    );
};
