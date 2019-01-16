import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Homepage } from './pages/homepage/homepage.component';
import { Header } from './components/molecules/header/header.component';
import { LogIn } from './pages/log-in/log-in-page.component';
import { UserProfile } from './pages/user-profile/user-profile.component';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Homepage} />
                        <Route exact path="/users/:userId" component={UserProfile} />
                        <Route exact path="/login" component={LogIn} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
