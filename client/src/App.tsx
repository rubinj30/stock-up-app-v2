import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Homepage } from './pages/homepage/homepage.component';
import { Header } from './components/molecules/header/header.component';
import { LogIn } from './pages/log-in/log-in-page.component';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Homepage} />
                        <Route exact path="/login" component={LogIn} />
                        <Route exact path="/register" component={LogIn} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
