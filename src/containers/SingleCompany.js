/*Single Company. For this view, display the logo and the company name. As well, display two tabs that allow the user to view either the Summary sub-view or the List sub-view. 

    a.For the Summary sub-view, the other information for the company. Also display a bar chart of the average close price for each month. You are free to use any react-friendly JS charting library.
    
    b.For the List sub-view, display a drop-down list with the months of the year. When the user selects a month, display a table with the price information (date, low, high, close) for each day of the month that has data. */

import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class SingleCompany extends Component {
    constructor(props){
        super(props);
        this.state = {
            something: []
        }
    }
    render(){
        return(
            <article className="section">
                Single Company...
            </article>
        );
    }
}
export default SingleCompany;