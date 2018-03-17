import React, { Component } from 'react';
// import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            something: []
        }
    }
    render(){
        return(
            <article className="section">
                If you build it they will come
            </article>
        );
    }
}
export default Home;