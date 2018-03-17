/*Browse Companies. For this view, display a list of companies (and their logos) sorted by name. Each company name will be a link/route to a Single Company view. */

import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class BrowseCompanies extends Component {
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
export default BrowseCompanies;