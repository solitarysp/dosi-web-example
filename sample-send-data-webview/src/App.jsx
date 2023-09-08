import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import SenDataToApp from "./SendDataToApp.jsx";
import Header from "./Header.jsx";
import './style.css';
import Footer from "./Footer.jsx";

function App() {
    return (
        <Router>
            <div>
                <Header></Header>
                <div className="wrapper">
                    <Switch>
                        <Route path={"/"} exact component={SenDataToApp}/>
                        <Route path={"/send_data_to_app"} exact component={SenDataToApp}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        </Router>
    )
}

export default App
