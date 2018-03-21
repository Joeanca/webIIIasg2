/* 9.Stock Visualizer. For this view, display a line chart of the close values for a single month for up to three stocks. That is, the x-axis will contain the days, while the y-axis will be money. There should be four drop-down lists: one to select month, the others to select stocks. The drop-down should display symbol and name. Be sure to use different colors for each line. */

import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import {LineChart, Legend} from 'react-easy-chart';
import { Chart } from 'react-google-charts';

//http://recharts.org/#/en-US/examples/LineChartConnectNulls?????
import jsondata from '../jsonFiles/prices.json';


class StockVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            months:[{num:"01",mon:"January"},{num:"02",mon:"February"}, {num:"03",mon:"March"},{num:"04",mon:"April"},{num:"05",mon:"May"},{num:"06",mon:"June"},{num:"07",mon:"July"},{num:"08",mon:"August"},{num:"09",mon:"September"}, {num:"10" ,mon:"October"}, {num:"11", mon:"November"}, {num:"12", mon:"December"}],
            month:'',
            userPortfolio:[],
            options: {
                title: 'Stock close per day of month',
                interpolateNulls: true,
            },
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
        this.setState({userPortfolio:userPortfolio});
    }
    populateGraphDate= ()=>{
        this.setState({data:null});
        console.log(this.state.drop2 + this.state.drop3 + this.state.drop4);
        if (this.state.drop2 && this.state.drop3 && this.state.drop4){
            let getDaysInMonth = (month,year) =>new Date(year, month, 0).getDate();
            let daysInMonth = getDaysInMonth(this.state.monthNum, 2017);
            let dates = [];
            let data = [];
            for (let i = 1; i<=daysInMonth; i++){
                let currentDay = "2017-"+ this.state.monthNum+"-"+('0' + i).slice(-2);
                dates.push(currentDay);
                
            }
            let filteredStocks = this.state.filteredStocks;
            // for (let date of dates ){
            //     filteredStocks.find((data)=>{if(data.name === "AAPL" && data.date.trim() == date){console.log(data)}});
            // }
            
            //each data check if the stock exists and if it doesnt add a null
            let data1, data2, data3;
            // data.push(['date',this.state.drop2, this.state.drop3, this.state.drop4])
            data.push([{"label":"date","type":"string"},{"label":this.state.drop2,"type":"number"},{"label":this.state.drop3,"type":"number"},{"label":this.state.drop4,"type":"number"}]);
            for (let date of dates ){
                data1 = filteredStocks.find((data)=>{if(data.name ===  this.state.drop2 && data.date.trim() == date){return data}else return null});
                data2 = filteredStocks.find((data)=>{if(data.name ===  this.state.drop3 && data.date.trim() == date){return data}else return null});                
                data3 = filteredStocks.find((data)=>{if(data.name ===  this.state.drop4 && data.date.trim() == date){return data}else return null});
                data.push([date,(()=>{if(data1)return data1.close; else return null})(),(()=>{if(data2)return data2.close; else return null})(),(()=>{if(data3)return data3.close; else return null})()]);
            }
            console.log(data);
            this.setState({data:data});
        }
    }
    
    toggleDropdown = (dropMe)=>{
        let drop = document.querySelector("#"+dropMe);
        let expanded = false;
        if (drop.classList.contains('is-active')){
            expanded= true;
        } 
        this.pullUpDropdown();
        if (!expanded)drop.classList.add('is-active');
    }
    
    pullUpDropdown = ()=>{
        [].map.call(document.querySelectorAll('.is-active'), function(el) {
            el.classList.remove('is-active');
        });
        this.populateGraphDate();
    }
    
    filterList = (currentmonth)=>{
        this.setState({month:currentmonth.element.month.mon });
        this.setState({monthNum: currentmonth.element.month.num});
        let options = this.state.options;
        this.setState({options: options});
        let filteredStocks = this.state.userPortfolio.filter((data)=>{if(data.date >= "2017-"+currentmonth.element.month.num+"-01" && data.date <= "2017-"+currentmonth.element.month.num+"-31")return data;});
        this.setState({filteredStocks: filteredStocks});
        console.log(filteredStocks);
        var uniqueStocks = [ ...new Set(filteredStocks.map(name => {
                return name.name;
            }))];
        this.setState({uniqueStocks: uniqueStocks,drop2:'',drop3:'',drop4:''});
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
                                   <div className="dropdown-item" key={ind} onClick={()=>{this.populateGraphDate();this.setState({drop2:stock})}}>{"["+stock+"]" + "stockNameHolder"}
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
                                   <div className="dropdown-item" key={ind} onClick={()=>{this.setState({drop3:stock})}}>{"["+stock+"]" + "stockNameHolder"}
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
                                   <div className="dropdown-item" key={ind} onClick={()=>{this.setState({drop4:stock})}}>{"["+stock+"]" + "stockNameHolder"}
                                    </div>
                                );
                            }):null
                        }
                        </div>
                    </div>
                </div>
                <div>
                    {this.state.data?
                    <Chart
                          chartType="LineChart"
                          data={this.state.data}
                          options={this.state.options}
                          graph_id="PieChart"
                          width="100%"
                          height="400px"
                          legend_toggle
                        />: null
                    }
                </div>
            </div>
        );
    }
}
export default StockVisualizer;