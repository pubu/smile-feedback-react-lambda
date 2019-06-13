import React, { Component } from 'react';
import './index.css';

class Footer extends Component {
  render() {
    return (
        <footer className="black page-footer">
        <div className="footer-copyright">
            <div className="container">
                © 2019 www.smile-feedback.de
                <a className="grey-text text-lighten-4 right no-print" href="/impressum">Impressum</a>
                <a className="grey-text text-lighten-4 right no-print" href="/datenschutz">Datenschutz</a>
            </div>
        </div>
        </footer>
    );
  }
}

export default Footer