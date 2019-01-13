import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/atoms/input/input.component';
import { Button } from '../../components/atoms/button/button.component';

export class LogIn extends Component {
    state = {
        emailAddress: '',
        password: ''
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        this.setState({ [e.currentTarget.name]: value });
    };

    render() {
        return (
            <div className="flex justify-center">
                <div className="ba br3 pa3 ma3 w5">
                    <form>
                        <div className="flex flex-column">
                            <div className="f4">Log In</div>
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
                            <div className="flex justify-around">
                                <Button label={'Log In'} />
                                <Link to={'/'}>
                                    <Button
                                        label={'Back Home'}
                                        type={'button'}
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
