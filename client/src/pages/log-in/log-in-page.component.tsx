import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/atoms/input/input.component';
import { Button } from '../../components/atoms/button/button.component';
import './log-in.css';
import axios from 'axios';

type TabsProps = {
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    isLogIn: boolean;
};

export const LogInTabs = ({ handleClick, isLogIn }: TabsProps) => (
    <div className="f4 flex">
        <div
            onClick={handleClick}
            className={`w-50 pv1 tc ${!isLogIn ? 'bg-white bb br' : 'white'}`}
        >
            Log In
        </div>
        <div
            onClick={handleClick}
            className={`w-50 pv1 tc ${isLogIn ? 'bg-white bb bl' : 'white'}`}
        >
            Sign Up
        </div>
    </div>
);

export class LogIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        isLogIn: true
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        this.setState({ [e.currentTarget.name]: value });
    };

    handleClick = (e: React.MouseEvent<any>) => {
        const innerText = e.currentTarget.innerText;
        if (innerText === 'Log In') {
            this.setState({ isLogIn: true });
        } else {
            this.setState({ isLogIn: false });
        }
    };

    login = async (e: React.MouseEvent<any>) => {
        e.preventDefault();
        const { emailAddress, password } = this.state;
        const { data } = await axios.post('/api/users/login', {
            emailAddress,
            password
        });
        if(password === data[0].password) {
            console.log('password matched')
        }
    };

    signup = (e: React.MouseEvent<any>) => {
        console.log('signing up', e);
    };

    render() {
        const { isLogIn } = this.state;
        return (
            <div className="flex justify-center">
                <div className="ba ma3 w5 bg-green loginContainer">
                    <LogInTabs
                        handleClick={this.handleClick}
                        isLogIn={isLogIn}
                    />
                    <form>
                        <div className="flex flex-column pa3">
                            {!isLogIn && (
                                <>
                                    <Input
                                        className="pa1 ma2"
                                        onChange={this.handleChange}
                                        placeholder="First Name"
                                        name="firstName"
                                        required={true}
                                    />
                                    <Input
                                        className="pa1 ma2"
                                        onChange={this.handleChange}
                                        placeholder="Last Name"
                                        name="lastName"
                                        required={true}
                                    />
                                    <Input
                                        className="pa1 ma2"
                                        onChange={this.handleChange}
                                        placeholder="Phone Number"
                                        name="phoneNumber"
                                        required={true}
                                    />
                                </>
                            )}
                            <Input
                                className="pa1 ma2"
                                onChange={this.handleChange}
                                placeholder="E-mail Address"
                                name="emailAddress"
                                required={true}
                            />
                            <Input
                                className="pa1 ma2"
                                onChange={this.handleChange}
                                placeholder="Password"
                                name="password"
                                required={true}
                            />
                            {!isLogIn && (
                                <Input
                                    className="pa1 ma2"
                                    onChange={this.handleChange}
                                    placeholder="Password"
                                    name="password"
                                    required={true}
                                />
                            )}
                            <div className="flex flex-column items-center">
                                <Button
                                    label={`${isLogIn ? 'Log In' : 'Sign Up'}`}
                                    className="w-70 ba b--black bg-white hover-green mv1"
                                    onClick={isLogIn ? this.login : this.signup}
                                />
                                <Link
                                    to={'/'}
                                    className={
                                        'w-70 flex justify-center no-underline'
                                    }
                                >
                                    <Button
                                        label={'Back Home'}
                                        type={'button'}
                                        className={
                                            'w-100 ba b--black bg-white hover-green mv1'
                                        }
                                    />
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
