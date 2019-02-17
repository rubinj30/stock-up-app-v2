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
        errors: []
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        this.setState({ [e.currentTarget.name]: value });
    };

    handleTabClick = (e: React.MouseEvent<any>) => {
        const innerText = e.currentTarget.innerText;
        if (innerText === 'Log In') {
            this.setState({ isLogIn: true, errors: [] });
        } else {
            this.setState({ isLogIn: false, errors: [] });
        }
    };

    login = async (e: React.MouseEvent<any>) => {
        e.preventDefault();
        const { emailAddress, password } = this.state;
        const { data } = await axios.post('/api/users/login', {
            emailAddress,
            password
        });
        const user = data && data[0];

        if (!validator.isEmail(emailAddress)) {
            this.setState({ errors: ['emailAddress'] });
        } else {
            // TODO: setup two-way hashing
            if (!data[0]) {
                this.setState({ errors: ['User Not Found'] });
            } else if (password === user.password) {
                this.setLocalStorage(user);
                this.setState({ success: true, id: user._id });
            } else if (data.error) {
                console.log('error', data.error);
            } else {
                this.setState({ errors: ['password', 'incorrectPassword'] });
            }
        }
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

            // if no errors make a post request for a new user
            const { data } = await axios.post('/api/users/signup', payload);

            // if the server sends back error saying user already exists, update the errors array in state
            if (data.error === 'user already exists') {
                this.setState({ errors: ['existingUser'] });
            } else {
                this.setLocalStorage(data);
                this.setState({ id: data._id, success: true });
            }
        }
    };

    // sets user first name and email in local storage
    setLocalStorage = (data: any) => {
        const { firstName, emailAddress } = data;
        localStorage.setItem('emailAddress', emailAddress);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('id', data._id);
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
        return this.updateStateWithErrors(validations);
    };

    // if any are not valid, the key will be added to errors in state
    updateStateWithErrors = (validations: any) => {
        const errors = Object.keys(validations).filter(
            key => validations[key] === false
        );
        this.setState({ errors });
    };

    render() {
        const { isLogIn, success, id, errors } = this.state;
        if (success) {
            return <Redirect to={`/users/${id}`} />;
        }
        return (
            <div className="flex justify-center">
                <div className="ma3 bg-green loginContainer border">
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
