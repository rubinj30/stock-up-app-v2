import React from 'react';
import { LogInInput } from '../../molecules/log-in-input/log-in-input.component';
import { Button } from '../../atoms/button/button.component';
import { Link } from 'react-router-dom';
import '../../../App.css';

type Props = {
    isLogIn: boolean;
    handleChange: any;
    login: (e: React.MouseEvent<any>) => void;
    signup: (e: React.MouseEvent<any>) => void;
    errors: string[] | [];
};

export const LogInForm = ({
    isLogIn,
    handleChange,
    login,
    signup,
    errors
}: Props) => {
    return (
        <form>
            <div className="flex flex-column pa3">
                {!isLogIn && (
                    <>
                        <LogInInput
                            errors={errors}
                            onChange={handleChange}
                            placeholder="First Name"
                            name="firstName"
                            required={true}
                        />
                        <LogInInput
                            errors={errors}
                            onChange={handleChange}
                            placeholder="Last Name"
                            name="lastName"
                            required={true}
                        />
                        <LogInInput
                            errors={errors}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            name="phoneNumber"
                            required={true}
                        />
                    </>
                )}
                <LogInInput
                    errors={errors}
                    onChange={handleChange}
                    placeholder="E-mail Address"
                    name="emailAddress"
                    required={true}
                />
                <LogInInput
                    errors={errors}
                    onChange={handleChange}
                    placeholder="Password"
                    name="password"
                    required={true}
                />
                {!isLogIn && (
                    <LogInInput
                        errors={errors}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required={true}
                    />
                )}
                <div className="flex flex-column items-center pa2">
                    <Button
                        label={`${isLogIn ? 'Log In' : 'Sign Up'}`}
                        className="w-70 bg-white mv1 green hover-dark-green"
                        onClick={isLogIn ? login : signup}
                    />
                    <Link
                        to={'/'}
                        className={'w-70 flex justify-center no-underline'}
                    >
                        <Button
                            label={'Back Home'}
                            type={'button'}
                            className={'w-100 bg-white hover-green mv1 green'}
                        />
                    </Link>
                </div>
            </div>
        </form>
    );
};
