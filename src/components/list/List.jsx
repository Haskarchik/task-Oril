import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ListStyle.css";

export default function List() {
  const urlList = "https://oril-coins-test.herokuapp.com/list";

  const [item, setItems] = useState([]);
  const [itemForTable, setItemForTable] = useState();
  const [inputValue, setInputValue] = useState();

  let items = [];
  
  const sortByName = () => {
    let sortItems;
    
    if (item[0].name.localeCompare(item[1].name)  === 1) {
      sortItems = item.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sortItems = item.sort((a, b) => b.name.localeCompare(a.name));
    }

    items = [];

    sortItems.forEach((el) => {
      drawChart(el);
    });
    setItemForTable(items);
  }

  const sortByDate = () => {
    let sortItems;

    if (item[0].date.localeCompare(item[1].date) === 1) {
      sortItems = item.sort( (a, b) => {
        if (a.date < b.date) {
          return -1;
        }
      });
    } else {
      sortItems = item.sort( (a, b) => {
        if (a.date > b.date) {
          return -1;
        }
      });
    }

    items = [];

    sortItems.forEach((el) => {
      drawChart(el)
    });

    setItemForTable(items);
  }
  const sortByStatus = () => {
    let sortItems;

    if (!item[0].isActive) {
      sortItems = item.sort( (a, b) => {
        if (a.isActive > b.isActive) {
          return -1;
        }
      });
    } else {
      sortItems = item.sort( (a, b) => {
        if (a.isActive < b.isActive) {
          return -1;
        }
      });
    }

    items = [];

    sortItems.forEach((el) => {
      drawChart(el);
    });
    setItemForTable(items);
  }

  const inputChange = (event) => {
    setInputValue(event);
    let sortItems = [];

    sortItems = item.filter((value) =>
      value.name.toLowerCase().includes(event.toLowerCase())
    );

    items = [];
    sortItems.forEach((el) => {
      drawChart(el);
    });
    setItemForTable(items);
  }
  const drawChart = (el) => {
    const status = () =>{
      if (el.isActive) {
        return <span className="active">Active</span>;
      } else {
        return <span className="disable">Disable</span>;
      }
    }

    items.push(
      <Link to={"/chart/" + el.id}>
         
        <div className="table-row">
          <div className="main-info">
            <div className="name"> {el.name}</div>
            <div className="date">
               
              {new Date(el.date).toLocaleDateString()}
            </div>
          </div>
          <div className="status">{status()} </div>
        </div>
      </Link>
    );
  }

  useEffect(() => {
    axios.get(urlList).then((response) => {
      setItems(response.data);

      response.data.forEach((el) => {
        drawChart(el)
      });

      setItemForTable(items);
    });
  }, []);

  return (
    <div className="content">
      <div className="input-box">
        <input
          className="input"
          type="text"
          value={inputValue}
          onChange={(event) => inputChange(event.target.value)}
          placeholder="Search"
        />
      </div>
      <div className="table">
        <div className="table-row main-row">
          <div className="main-info-row">
            <div className="name main" onClick={sortByName}>
              NAME
            </div>
            <div className="date main" onClick={sortByDate}>
              DATE
            </div>
          </div>
          <div className="status main" onClick={sortByStatus}>
            STATUS 
          </div>
        </div>
        {itemForTable}
      </div>
    </div>
  );
}
