import React, { Component } from 'react';
import './index.css';

class ItemList extends Component {
  render() {
    let data = localStorage.getItem("fC-data");
    let dataObj = JSON.parse(data);
    let items = null;
    console.log(dataObj);
    if(dataObj){
        items = Object.keys(dataObj).map((keyName, i) => (
            <li className="" key={i}>
                <span className="">key: {i} Name: {dataObj[keyName]}</span>
            </li>
        ));
    }
    return (
        <ul>
            {items}
        </ul>
    );
  }
}

export default ItemList