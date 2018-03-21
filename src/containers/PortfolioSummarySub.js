//b.For the Summary sub-view (which should be the default), display the following information: total number of companies in portfolio, the total number of stocks in portfolio, and the current $ worth of the portfolio. Also display a pie chart displaying a percentage summary of the portfolio information for that user (see 2a in Back-End Requirements). */

//TODO total amount of money
//TODO check chart
//TODO CSS

import React, { Component } from 'react';
// import axios from 'axios';
// import {PieChart, Legend} from 'react-easy-chart';
import { Chart } from 'react-google-charts';


import jsondata from '../jsonFiles/portfolio.json';


class PortfolioSummarySub extends Component {
    constructor(props){
        super(props);
        this.state={
            company: "hello",
            userid: this.props.userid,
            options: {
                title: 'Portfolio summary',
                animation:{
                    duration: 1000,
                    easing: 'inAndOut',
                    startup: true,
                    
                },
                is3D: true,
            }
        };
    }
    
    componentDidMount(){
        
        /*axios.get().then(response => {
            this.setState({companies:response.data.sort((a,b)=>{ let result  =0; if(a.name>b.name){result=1;}else if(b.name>a.name){result=-1;} return result;})});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });*/
        
        let userPortfolio = jsondata.filter((element)=> element.user === this.state.userid);
        console.log(userPortfolio);
        this.setState({owned:userPortfolio.length});
        let totalStockOwned = 0;
        let pieData =[["smtg","smtgelse"]];
        for (let singlestock of userPortfolio){
            pieData.push([singlestock.symbol, singlestock.owned]); 
            totalStockOwned+=singlestock.owned;
        }
        console.log(totalStockOwned);
        this.setState({pieData:pieData});
    }
        
    render(){
        
        if (!this.state.pieData) {return null;}
            else return (
                <div className="section">
                    <div>Total number of companies owned: {this.state.owned}</div>
                    <div>
                        <Chart
                          chartType="PieChart"
                          data={this.state.pieData}
                          options={this.state.options}
                          graph_id="PieChart"
                          width="100%"
                          height="400px"
                          legend_toggle
                        />
                    </div>
                    <div>{this.props.params}</div>

                </div>
            );
           
    }
}
export default PortfolioSummarySub;
