import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { Title } from "chart.js";

const BarChart = (props) => {
  const [userDatas, setuserDatas] = useState();
  const [state, setState] = useState(0);
  const [maxCount, setMaxCount] = useState(620000);
  const [minCount, setMinCount] = useState(538000);
  const [totalGlobal, setTotalGlobal] = useState(0);
  const [maxCurency, setMaxCurency] = useState(0);
  const [minCurency, setMinCurency] = useState(0);
  const [medCurency, setMedCurency] = useState(0);
  const [boldClass1, setBoldClass1] = useState("bold");
  const [boldClass2, setBoldClass2] = useState();
  const [boldClass3, setBoldClass3] = useState();

  let max = maxCount;
  let min = minCount;
  let total = 0;
  let minWeektime = 538000;
  let maxWeektime = 620000;
  let minMounthtime = 2590000;
  let maxMounthtime = 2820000;
  let minYeartime = 31428656;
  let maxYeartime = 31670559;
  let chartWidth = 1050;
  let chartHeight = 230;

  const getData = (id) =>{
    return `https://oril-coins-test.herokuapp.com/item/${id}`;
  }
  const setCountTime = (countmin, countmax) => {
    setState(countmax);
    setMaxCount(countmax);
    setMinCount(countmin);
  }

  const sortByDate = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else if (a.date > b.date) {
      return -1;
    } else {
      return 0;
    }
  }
  const buttonTodo = (min, max, who) => {
    setCountTime(min, max);
    who = "bold"
    if (min == minWeektime) {
      setBoldClass1(who);
      setBoldClass2(' ');
      setBoldClass3(' ');
    } else if (min === minMounthtime) {
      setBoldClass1(' ');
      setBoldClass2(who);
      setBoldClass3(' ');
    } else if (min === minYeartime) {
      setBoldClass1(' ');
      setBoldClass2(' ');
      setBoldClass3(who);
    }
  }
    
  useEffect(() => {
    axios.get(getData(props.dataId)).then((response) => {
      let data = response.data.data.sort(sortByDate);

      let elementData = Object.values(data);
      let dates = [];
      let curences = [];
      let counts = 4;

      for (let i = 0; i < elementData.length; i++) {
        if (
          (new Date(elementData[0].date).getTime() -
            new Date(elementData[i].date).getTime()) * 0.001 > min
            &&
          (new Date(elementData[0].date).getTime() -
            new Date(elementData[i].date).getTime()) * 0.001 < max) {
          counts = i;
          break;
        }
      }
      for (let i = 0; i <= counts; i++) {
        dates.push(new Date(elementData[i].date).toLocaleDateString());
        if (elementData[i].curency === "null") {
          curences.push(0);
        } else {
          curences.push(Math.round(elementData[i].curency));
        }
      }
      for (let i = 0; i < counts; i++) {
        if (elementData[i].curency === "null") {
          total += 0;
        } else {
          total += Number(elementData[i].curency);
        }
      }
      setTotalGlobal(Math.round(total));
      setMedCurency(Math.round(total / counts));
      
      let elements = [];
      for (let i = 0; i < counts; i++) {
        if (elementData[i].curency == "null") {
          elements.push(0);
        } else {
          elements.push(Number(elementData[i].curency));
        }
      }
      setMaxCurency(Math.max(...elements));
      setMinCurency(Math.min(...elements));
      const userData = (
        <Chart
          className="chart"
          type="area"
          width={chartWidth}
          height={chartHeight}
          
          series={[{ name: "Curency ", data: ( curences) }]}
          options={{
            chart: {
              foreColor: '#9C9C9C',
              toolbar: {
                show: false},
          },
            xaxis: {
              categories: dates,
            },
            yaxis: {
              labels:{
                
              formatter: function(val, index) {
                return ('$ ' + val.toFixed(2) + 'k' );
              }
            }},
            dataLabels: {
              enabled: false,
            },
            
          }}
        ></Chart>
      );

      setuserDatas(userData);
    });
  }, [state]);

  




  return (
    <>
      <div className="revenue">Revenue</div>
      <div className="filter-buttons">
        <button
          className={"filter-button " + boldClass1}
          onClick={(ev) => buttonTodo(minWeektime, maxWeektime, ev.target.className)}>
          Week
        </button>
        <button
          className={"filter-button " + boldClass2}
          onClick={(ev) => buttonTodo(minMounthtime, maxMounthtime, ev.target.className)}>
          Month
        </button>
        <button
          className={"filter-button " + boldClass3}
          onClick={(ev) => buttonTodo(minYeartime, maxYeartime, ev.target.className)}>
          Year
        </button>
      </div>
      {userDatas}
      <div className="total">
        <span> Total</span>$ {totalGlobal}
      </div>
      <div className="min-max-block">
        <div className="min column">
          <span>Min</span>$ {minCurency}
        </div>
        <div className="med column">
          <span>Medium</span>$ {medCurency}
        </div>
        <div className="max column">
          <span>Max</span>$ {maxCurency}
        </div>
      </div>
    </>
  );
};

export default BarChart;
