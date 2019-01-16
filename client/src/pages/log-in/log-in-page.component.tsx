import React, { Component } from 'react';
import { LogInForm } from '../../components/organisms/log-in-form/log-in-form.component';
import './log-in.css';
import '../../App.css';
import axios from 'axios';
import validator from 'validator';

type TabsProps = {
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    isLogIn: boolean;
};

export const LogInTabs = ({ handleClick, isLogIn }: TabsProps) => (
    <div className="f4 flex">
        <div
            onClick={handleClick}
            className={`w-50 pv1 tc bottomBorder ${
                !isLogIn ? 'bg-white borderBottomRight' : 'white'
            }`}
        >
            Log In
        </div>
        <div
            onClick={handleClick}
            className={`w-50 pv1 tc bottomBorder ${
                isLogIn ? 'bg-white borderBottomLeft' : 'white'
            }`}
        >
            Sign Up
        </div>
    </div>
);

export class LogIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        firstName: '',
        lastName: '',
        isLogIn: true,
        redirect: false,
        error: false
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
        if (validator.isEmail(emailAddress)) {
            console.log('valid email');
        } else {
            console.log('not valid email');
        }
        // TODO: setup two-way hashing
        if (!data[0]) {
            console.log('user not found');
        } else if (password === data[0].password) {
            console.log('password matched');
        } else if (data.error) {
            console.log('ERROR');
        } else {
            console.log('password not matched and no error');
        }
        // TODO: if successful, should redirect to users portfolio page
        // else show error and keep on page
    };

    signup = (e: React.MouseEvent<any>) => {
        console.log('signing up', e);
    };

    render() {
        const { isLogIn } = this.state;
        return (
            <div className="flex justify-center">
                <div className="ma3 w5 bg-green loginContainer boxShadow">
                    <LogInTabs
                        handleClick={this.handleClick}
                        isLogIn={isLogIn}
                    />
                    <LogInForm
                        handleChange={this.handleChange}
                        isLogIn={isLogIn}
                        login={this.login}
                        signup={this.signup}
                    />
                </div>
            </div>
        );
    }
}
