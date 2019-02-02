import React, { Component } from 'react';
import Footer from '../../organisms/Footer';
import Header from '../../organisms/Header';
import './index.css';

class DashboardPage extends Component {
  render() {
    let dataKey = window.location.pathname;
    let storedData = localStorage.getItem('fC-data');
    let storedObj = JSON.parse(storedData);
    let config = null;
    let label = null;
    if (storedData){
      config = storedObj[dataKey];
    }

    let qrCodeImage = '';

    if(config){
      qrCodeImage = config['code'];
      label = config['label'];
    }else{
      qrCodeImage = this.props.location.state.qrCode;
    }

    return (
      <div>
        <Header />
        <div className="DashboardPage row">
          <div className="col s6 offset-s3">
            <h2>Dashboard: {label}</h2>
          </div>
          <div className="col s3 offset-s3">
              <img alt="no-code" className="feedback-code" src={"data:image/png;base64," + qrCodeImage} />
          </div>
          <div className="col s3">
              <h5>Zusammenfassung</h5>
              <ul>
                <li><i className="medium material-icons left">sentiment_very_satisfied</i><div className="bar w3"></div></li>
                <li><i className="medium material-icons left">sentiment_satisfied</i><div className="bar w1"></div></li>
                <li><i className="medium material-icons left">sentiment_neutral</i><div className="bar w3"></div></li>
                <li><i className="medium material-icons left">sentiment_dissatisfied</i><div className="bar w2"></div></li>
                <li><i className="medium material-icons left">sentiment_very_dissatisfied</i><div className="bar w1"></div></li>
              </ul>
          </div>
          <div className="col s6 offset-s3 actions black">
            <a href="/html-widget" className="waves-effect waves-light btn white black-text left">Widget anzeigen</a>
            <a href="/aufkleber-drucken" className="waves-effect waves-light btn white black-text left">Aufkleber drucken</a>
            <a href="/flyer-drucken" className="waves-effect waves-light btn white black-text left">Flyer drucken</a>
            <a href="/share" className="waves-effect waves-light btn white black-text right"><i className="material-icons right">share</i>Einladen</a>
            <a href="/vote-url-copy" className="waves-effect waves-light btn white black-text right">Vote Link kopieren</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default DashboardPage