import React, { Component } from 'react';
import './index.css';

class Header extends Component {
  render() {
    return (
        <div className="navbar-fixed no-print">
            <nav>
                <div className="nav-wrapper black">
                <a href="/" className="brand-logo center">:) Feedback</a>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                </ul>
                </div>
            </nav>
        </div>
    );
  }
}

export default Header
