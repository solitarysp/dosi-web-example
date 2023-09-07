import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SenDataToApp from "./SendDataToApp.jsx";
import Header from "./Header.jsx";
import './style.css';

function App() {
    return (
        <Router>
            <div>
                <Header></Header>
                <div className="wrapper">
                    <Switch>
                        <Route path={"/"} exact component={SenDataToApp} />
                    </Switch>
                </div>

            </div>
        </Router>
    )
}

export default App
