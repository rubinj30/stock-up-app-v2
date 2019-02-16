import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { LogInTabs } from '../../components/molecules/log-in-tabs/log-in-tabs.component';
import { LogInForm } from '../../components/organisms/log-in-form/log-in-form.component';
import './log-in.css';
import '../../App.css';
import axios from 'axios';
import validator from 'validator';
const isPhoneNumber = require('is-phone-number');

type State = {
    id: string;
    emailAddress: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    isLogIn: boolean;
    success: boolean;
    errors: string[] | [];
    errorFromServer: string;
};

export class LogIn extends Component {
    state: State = {
        id: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        isLogIn: true,
        success: false,
        errors: [],
        errorFromServer: 'false'
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        this.setState({ [e.currentTarget.name]: value });
    };

    handleTabClick = (e: React.MouseEvent<any>) => {
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

        // calls function that will update 'errors' in state with the inputs that had errors
        await this.validate();

        // if there are no errors, then will try to create a new user
        if (this.state.errors.length === 0) {
            // if all are validated, then create a user
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
            const { data } = await axios.post('/api/users/signup', payload);
            if (data.error) {
                // TODO: should also add other error indicators
                // if error is e-mail exists, need to say that
                // and should
                console.log(data.error);
                this.setState({ errorFromServer: data.error });
            } else {
                console.log(data);
                localStorage.set({ emailAddress: data.emailAddress });
                this.setState({ id: data._id, success: true });
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
            emailAddress: validator.isEmail(emailAddress),
            phoneNumber: isPhoneNumber(phoneNumber),
            password: validator.isLength(password, 6),
            confirmPassword:
                confirmPassword.length > 0 && password === confirmPassword
        };
        console.log('in validate', validations);
        return this.areAllFieldsValid(validations);
    };

    // checks to make sure all keys have a value of true
    areAllFieldsValid = (validations: any) => {
        const errors = Object.keys(validations).filter(
            key => validations[key] === false
        );
        this.setState({ errors });
        return Object.keys(validations).filter(key => !validations[key]);
    };

    render() {
        const { isLogIn, success, id, errors } = this.state;
        if (success) {
            return <Redirect to={`/users/${id}`} />;
        }
        return (
            <div className="flex justify-center">
                <div className="ma3 w5 bg-green loginContainer border">
                    <LogInTabs
                        handleClick={this.handleTabClick}
                        isLogIn={isLogIn}
                    />
                    <LogInForm
                        errors={errors}
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