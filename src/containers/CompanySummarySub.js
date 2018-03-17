import React, { Component } from 'react';
import axios from 'axios';
import {BarChart} from 'react-easy-chart';

//a.For the Summary sub-view, the other information for the company. Also display a bar chart of the average close price for each month. You are free to use any react-friendly JS charting library.

//TODO: IMPLEMENT THE HISTORICAL DATA 
//TODO: CSS
class CompanySummarySub extends Component {
    constructor(props){
        super(props);
        this.state ={
            company : {symbol: props.symbol, name:props.name, sector: props.sector, subindustry: props.subindustry, address: props.address, date_added: props.date_added, CIK: props.CIK, frequency: props.frequency}
        }
    }
    
    componentDidMount(){
        
        //GET THE HISTORICAL DATA FOR THE AVERAGE CLOSE PRICE FOR EACH MONTH 
        
        /*axios.get().then(response => {
            this.setState({companies:response.data.sort((a,b)=>{ let result  =0; if(a.name>b.name){result=1;}else if(b.name>a.name){result=-1;} return result;})});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });*/
    }
    
    render(){
        
        if (!this.state.company) {return null;}
            else return (
                <div>
                    <div>{this.state.company.symbol}</div>
                    <div>{this.state.company.name}</div>
                    <div>{this.state.company.sector}</div>
                    <div>{this.state.company.subindustry}</div>
                    <div>{this.state.company.address}</div>
                    <div>{this.state.company.date_added}</div>
                    <div>{this.state.company.CIK}</div>
                    <div>{this.state.company.frequency}</div>
                    <BarChart
                        colorBars
                        axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
                        axes
                        data={[
                          {x: 'A', y: 20},
                          {x: 'B', y: 30},
                          {x: 'C', y: 40},
                          {x: 'D', y: 20},
                          {x: 'E', y: 40},
                          {x: 'F', y: 25},
                          {x: 'G', y: 5}
                        ]}
                      />
                    
                </div>
            );
           
    }
}
export default CompanySummarySub;