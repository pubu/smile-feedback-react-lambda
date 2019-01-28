import React, { Component } from 'react';
import './index.css';

class DashboardPage extends Component {
  render() {
    return (
      <div className="DashboardPage row">
        Dashboard
        <img src={"data:image/png;base64," + this.props.qrCode} />
      </div>
    );
  }
}

export default DashboardPage