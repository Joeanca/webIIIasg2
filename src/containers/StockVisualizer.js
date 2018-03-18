/* 9.Stock Visualizer. For this view, display a line chart of the close values for a single month for up to three stocks. That is, the x-axis will contain the days, while the y-axis will be money. There should be four drop-down lists: one to select month, the others to select stocks. The drop-down should display symbol and name. Be sure to use different colors for each line. */

import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Chart } from 'react-google-charts';


import jsondata from '../jsonFiles/prices.json';


class StockVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            months:[{num:"01",mon:"January"},{num:"02",mon:"February"}, {num:"03",mon:"March"},{num:"04",mon:"April"},{num:"05",mon:"May"},{num:"06",mon:"June"},{num:"07",mon:"July"},{num:"08",mon:"August"},{num:"09",mon:"September"}, {num:"10" ,mon:"October"}, {num:"11", mon:"November"}, {num:"12", mon:"December"}],
            month:'',
            userPortfolio:[],
            options: {
                title: 'Age vs. Weight comparison',
                hAxis: { title: 'Age', minValue: 0, maxValue: 15 },
                vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
                legend: 'none',
              },
              data: [
                ['Age', 'Weight'],
                [8, 12],
                [4, 5.5],
                [11, 14],
                [4, 5],
                [3, 3.5],
                [6.5, 7],
              ]
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
        this.setState({userPortfolio:userPortfolio});
    }
    
    
    toggleDropdown = (dropMe)=>{
        let drop = document.querySelector("#"+dropMe);
        let expanded = false;
        if (drop.classList.contains('is-active')){
            console.log("tried");
            expanded= true;
        } 
        this.pullUpDropdown();
        if (!expanded)drop.classList.add('is-active');
    }
    
    pullUpDropdown = ()=>{
        let active = document.querySelectorAll('.dropdown.is-active');
        (function (){
            for (var i = 0; i < active.length; i++) {
                active[i].classList.remove('is-active');
            }
        })();
    }
    
    filterList = (currentmonth)=>{
        this.setState({month:currentmonth.element.month.mon });
        let options = this.state.options;
        options.title = "Monthly Stock History for " + currentmonth.element.month.mon;
        this.setState({options: options});
        let filteredStocks = this.state.userPortfolio.filter((data)=>{if(data.date >= "2017-"+currentmonth.element.month.num+"-01" && data.date <= "2017-"+currentmonth.element.month.num+"-31")return data;});
        this.setState({filteredStocks: filteredStocks});
        console.log(filteredStocks);
        var uniqueStocks = [ ...new Set(filteredStocks.map(name => {
                return name.name;
            }))];
        this.setState({uniqueStocks: uniqueStocks});
        this.pullUpDropdown();
    }
    render(){
        return(
            <div className="section" id="dropdown_container">
                <div className="dropdown" id="drop1" onClick={()=>this.toggleDropdown("drop1")}>
                    <div className="dropdown-trigger">
                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu1">
                          <span>{this.state.month?this.state.month:"Choose a month"}</span>
                          <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                          </span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu1" role="menu">
                        <div className="dropdown-content">
                        {
                            this.state.months.map((month, ind) => {
                                let element = {month: month, drop: "drop1", num: month.num};
                                return(
                                    <div className="dropdown-item" key={ind} onClick={()=>this.filterList({element})}>{month.mon}
                                    </div>
                                );
                            })
                        }
                        </div>
                    </div>
                </div>
                <div className="dropdown" id="drop2" onClick={()=>this.toggleDropdown("drop2")}>
                    <div className="dropdown-trigger">
                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu2">
                          <span>{this.state.drop2? this.state.drop2:"Choose a stock"}</span>
                          <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                          </span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                        <div className="dropdown-content">
                        {this.state.uniqueStocks?
                            this.state.uniqueStocks.map((stock, ind) => {
                                let thisDropVars = {drop:"drop2",stock: stock};
                                return(
                                   <div className="dropdown-item" key={ind} onClick={()=>{this.setState({drop2:stock});this.pullUpDropdown()}}>{stock}
                                    </div>
                                );
                            }):null
                        }
                        </div>
                    </div>
                </div>
                <div className="dropdown" id="drop3" onClick={()=>this.toggleDropdown("drop3")}>
                    <div className="dropdown-trigger">
                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                          <span>{this.state.drop3?this.state.drop3:"Choose a stock"}</span>
                          <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                          </span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                        <div className="dropdown-content">
                        {this.state.uniqueStocks?
                            this.state.uniqueStocks.map((stock, ind) => {
                                let thisDropVars = {drop:"drop3",stock: stock};
                                return(
                                   <div className="dropdown-item" key={ind} onClick={()=>{this.setState({drop3:stock});this.pullUpDropdown()}}>{stock}
                                    </div>
                                );
                            }):null
                        }
                        </div>
                    </div>
                </div>
                <div className="dropdown" id="drop4" onClick={()=>this.toggleDropdown("drop4")}>
                    <div className="dropdown-trigger">
                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                          <span>{this.state.drop4?this.state.drop4:"Choose a stock"}</span>
                          <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                          </span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                        <div className="dropdown-content">
                        {this.state.uniqueStocks?
                            this.state.uniqueStocks.map((stock, ind) => {
                                let thisDropVars = {drop:"drop4",stock: stock};
                                return(
                                   <div className="dropdown-item" key={ind} onClick={()=>{this.setState({drop4:stock});this.pullUpDropdown()}}>{stock}
                                    </div>
                                );
                            }):null
                        }
                        </div>
                    </div>
                </div>
                <div>
                    <Chart
                        chartType="ScatterChart"
                        data={this.state.data}
                        options={this.state.options}
                        graph_id="ScatterChart"
                        width="100%"
                        height="400px"
                        legend_toggle
                      />
                </div>
            </div>
        );
    }
}
export default StockVisualizer;