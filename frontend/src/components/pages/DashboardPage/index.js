import React, { Component } from 'react';
import './index.css';

class DashboardPage extends Component {
  render() {
    let dataKey = window.location.pathname;
    let storedData = localStorage.getItem('fC-data');
    let storedObj = JSON.parse(storedData);
    let config = storedObj[dataKey];
    let qrCodeImage = '';
    
    if(config){
      qrCodeImage = config['code'];
    }else{
      qrCodeImage = this.props.location.state.qrCode;
    }

    return (
      <div className="DashboardPage row">
        <div className="col s6 offset-s3">
          <h1>Dashboard</h1>
        </div>
        <div className="col s4 offset-s4">
            <img className="feedback-code" src={"data:image/png;base64," + qrCodeImage} />
        </div>
      </div>
    );
  }
}

export default DashboardPage