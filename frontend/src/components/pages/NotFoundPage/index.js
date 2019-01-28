import React, { Component } from 'react';
import './index.css';
class NotFoundPage extends Component {
    render() {
      return (
        <div className="NotFoundPage">
          <header className="NotFoundPage-header">
            <p>
              Die Seite konnte nicht gefunden werden.
            </p>
          </header>
        </div>
      );
    }
  }
  
  export default NotFoundPage;