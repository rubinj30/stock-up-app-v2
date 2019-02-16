import React, { Component } from 'react';
import { FaChartLine } from 'react-icons/fa';
import '../../../App.css';
import './header.css';

export class Header extends Component {
    render() {
        return (
            <div className="header pa2 bg-green white">
                <div className="flex items-center f4">
                    <span className="pr2">StockUp </span>
                    <FaChartLine />
                </div>
            </div>
        );
    }
}
