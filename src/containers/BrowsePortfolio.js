/*  8.Browse Portfolio. For this view, use tabs that allow the user to view either the Summary sub-view or the List sub-view. 

    a.For the List sub-view, display the user’s portfolio information (i.e., the stock symbol, the company name, the number owned, and the current value) in a list. Just like in the first assignment, the user should be able to change the sort order by clicking on the column headings; repeated clicking will toggle between ascending and descending. The symbol and the name will be link/routes to Single Company view. For the current value, it is latest price * number owned.

    b.For the Summary sub-view (which should be the default), display the following information: total number of companies in portfolio, the total number of stocks in portfolio, and the current $ worth of the portfolio. Also display a pie chart displaying a percentage summary of the portfolio information for that user (see 2a in Back-End Requirements). */
    
import React, { Component } from 'react';
// import axios from 'axios';
import { NavLink } from 'react-router-dom';

class BrowsePortfolio extends Component {
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
export default BrowsePortfolio;