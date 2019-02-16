import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { FaFolderOpenO } from 'react-icons/lib/fa'
import { Header } from '../../components/molecules/header/header.component';
import axios from 'axios';
import '../../App.css';

type Props = {
    match: {
        params: {
            userId: string;
        };
    };
};

type State = {
    user: User;

    pageReady: boolean;
};

export type User = {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    stocks: string[];
};

export class UserProfile extends Component<Props, State> {
    state = {
        user: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            stocks: []
        },
        pageReady: false
    };

    componentWillMount = async () => {
        this.getUser();
    };

    getUser = async () => {
        const response = await axios.get(
            `/api/users/${this.props.match.params.userId}/`
        );
        this.setState({
            user: response.data,
            pageReady: true
        });
    };

    getNews = () => {};

    render() {
        const { user } = this.state;
        return (
            <div>
                <div className="border ma3 pa3">
                    <h4 className="mt0">User Dashboard</h4>
                    <div>{user.firstName}</div>
                    <div>{user.emailAddress}</div>
                </div>
            </div>
        );
    }
}
