import React from 'react';
import { Input } from '../../atoms/input/input.component';
import { Button } from '../../atoms/button/button.component';
import { Link } from 'react-router-dom';
import '../../../App.css';

type Props = {
    isLogIn: boolean;
    handleChange: any;
    login: (e: React.MouseEvent<any>) => void;
    signup: (e: React.MouseEvent<any>) => void;
};

export const LogInForm = ({ isLogIn, handleChange, login, signup }: Props) => {
    return (
        <form>
            <div className="flex flex-column pa3">
                {!isLogIn && (
                    <>
                        <Input
                            className="pa1 ma2"
                            onChange={handleChange}
                            placeholder="First Name"
                            name="firstName"
                            required={true}
                        />
                        <Input
                            className="pa1 ma2"
                            onChange={handleChange}
                            placeholder="Last Name"
                            name="lastName"
                            required={true}
                        />
                        <Input
                            className="pa1 ma2"
                            onChange={handleChange}
                            placeholder="Phone Number"
                            name="phoneNumber"
                            required={true}
                        />
                    </>
                )}
                <Input
                    className="pa1 ma2"
                    onChange={handleChange}
                    placeholder="E-mail Address"
                    name="emailAddress"
                    required={true}
                />
                <Input
                    className="pa1 ma2"
                    onChange={handleChange}
                    placeholder="Password"
                    name="password"
                    required={true}
                />
                {!isLogIn && (
                    <Input
                        className="pa1 ma2"
                        onChange={handleChange}
                        placeholder="Password"
                        name="password"
                        required={true}
                    />
                )}
                <div className="flex flex-column items-center">
                    <Button
                        label={`${isLogIn ? 'Log In' : 'Sign Up'}`}
                        className="w-70 bg-white hover-green mv1"
                        onClick={isLogIn ? login : signup}
                    />
                    <Link
                        to={'/'}
                        className={'w-70 flex justify-center no-underline'}
                    >
                        <Button
                            label={'Back Home'}
                            type={'button'}
                            className={
                                'w-100 bg-white hover-green mv1'
                            }
                        />
                    </Link>
                </div>
            </div>
        </form>
    );
};
