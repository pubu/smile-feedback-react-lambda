import React, { Component } from 'react';
import './index.css';

class DashboardPage extends Component {
  render() {
    return (
      <div className="DashboardPage row">
        <div className="col s6 offset-s3">
          <h1>Dashboard</h1>
        </div>
        <div className="col s4 offset-s4">
            <img className="feedback-code" src={"data:image/png;base64," + this.props.location.state.qrCode} />
        </div>
      </div>
    );
  }
}

export default DashboardPage