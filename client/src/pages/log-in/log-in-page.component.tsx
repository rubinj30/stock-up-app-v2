import React, { Component } from 'react';
import { User } from '../user-profile/user-profile.component';
import { LogInForm } from '../../components/organisms/log-in-form/log-in-form.component';
import './log-in.css';
import '../../App.css';
import axios from 'axios';
import validator from 'validator';
const isPhoneNumber = require('is-phone-number');

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

type State = {
    user: User;
    isLogIn: boolean;
    redirect: boolean;
    error: any;
};

export class LogIn extends Component {
    state = {
        emailAddress: 'ttttt@test.com',
        password: 'testtest',
        confirmPassword: 'testtest',
        firstName: 'test',
        lastName: 'test',
        phoneNumber: '770-789-3501',
        isLogIn: true,
        redirect: false,
        error: false
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        console.log(e.currentTarget.name);
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

    signup = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const validated = this.validate();
        if (!validated) {
            this.setState({ error: true });
        } else {
            const {
                firstName,
                lastName,
                emailAddress,
                phoneNumber,
                password
            } = this.state;
            const payload = {
                firstName,
                lastName,
                emailAddress,
                phoneNumber,
                password
            };
            console.log('payload', payload);
            const { data } = await axios.post('/api/users/signup', payload);
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data);
            }
        }
    };

    validate = () => {
        const {
            firstName,
            lastName,
            emailAddress,
            phoneNumber,
            password,
            confirmPassword
        } = this.state;
        const validations = {
            firstName: validator.isLength(firstName, 2),
            lastName: validator.isLength(lastName, 2),
            email: validator.isEmail(emailAddress),
            phone: isPhoneNumber(phoneNumber),
            password: validator.isLength(password, 6),
            confirmation: password === confirmPassword
        };
        return this.areAllFieldsValid(validations);
    };

    areAllFieldsValid = (validations: any) =>
        Object.keys(validations).every(key => validations[key]);

    render() {
        const { isLogIn } = this.state;
        return (
            <div className="flex justify-center">
                <div className="ma3 w5 bg-green loginContainer border">
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
