/* 4.The first thing the user must experience is a log-in screen if the user is not already logged-in. The form must provide mechanism for entering email and password. It will display a Bulma notification if the credential information is incorrect. This notification must disappear once the user starts entering information into the login form. I would recommend adding in the log-in capabilities after you have most of the main functionality working. I will provide you with more guidance on how best to implement this in Node and react. */

import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            something: []
        }
    }
    render(){
        return(
            <article className="section">
                Login page...
            </article>
        );
    }
}
export default Login;