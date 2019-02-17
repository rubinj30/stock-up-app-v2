import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine } from 'react-icons/fa';
import '../../../App.css';
import './header.css';

export class Header extends Component {
    render() {
        const firstName = localStorage.getItem('firstName');
        const id = localStorage.getItem('id');
        return (
            <div className="header pa2 bg-green white">
                <div className="w-90 flex items-center justify-between">
                    <Link
                        to="/"
                        className="no-underline white flex items-center f3"
                    >
                        <span className="pr2">StockUp </span>
                        <FaChartLine />
                    </Link>
                    {firstName ? (
                        <Link
                            to={`/users/${id}`}
                            className="no-underline white f5 flex items-center"
                        >
                            <span>{firstName}</span>
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="no-underline white f5 flex items-center"
                        >
                            <span>Log In</span>
                        </Link>
                    )}
                </div>
            </div>
        );
    }
}
