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
                <span className="">{i+1} ) <a href={keyName}>{dataObj[keyName]['label']}</a></span>
            </li>
        ));
    }
    if(items){
        return (
            <div>
                <h5>Verfügbares Feedback</h5>
                <ul>
                    {items}
                </ul>
            </div>
        );
    }else{
        return null
    }

  }
}

export default ItemList