/*Browse Companies. For this view, display a list of companies (and their logos) sorted by name. Each company name will be a link/route to a Single Company view. */

import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import jsondata from '../../public/jsonFiles/companies.json';

class BrowseCompanies extends Component {
    constructor(props){
        super(props);
        this.state = {
            companies: []
        }
    }
    
    componentDidMount(){
        fetch(jsondata)
          .then((res) => res.json())
          .then((data) => {
            this.setState({companies:data});
            console.log('data:', data);
          })
        /*axios.get('address').then(response => {
            this.setState({companies:response.data.sort((a,b)=>{ let result  =0; if(a.name>b.name){result=1;}else if(b.name>a.name){result=-1;} return result;})});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });*/
    }
    
    
    render(){
        if (! this.state.companies || this.state.companies.length === 0){
            return null;
        }else{
        return(
            <article className="section">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                    <li><NavLink to={"/" }>Home</NavLink></li>
                    <li className="is-active"><span >&nbsp;&nbsp;</span>Companies</li>
                  </ul>
                </nav>
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-narrow-mobile">
                    <tbody>
                {this.state.companies?
                            this.state.companies.map((company, ind) => {
                                return(
                                    <tr key={ind}>
                                    <td>
                                        <NavLink to={"/company/" + company.symbol} company={company} key={ind}>{company.symbol}</NavLink>
                                    </td>
                                    <td><NavLink to={"/company/" + company.symbol} key={ind}>{company.stockName}</NavLink></td>
                                    </tr>
                                );
                            }):null
                        }
                    </tbody>
                </table>
            </article>
        );}
    }
}
export default BrowseCompanies;