import React, { Component } from 'react';
import Footer from '../../organisms/Footer';
import Header from '../../organisms/Header';
import './index.css';

class DashboardPage extends Component {

  state = {
    record: false,
    summary: false
  }

  componentDidMount() {
    let baseUrl = "https://vps11954.alfahosting-vps.de/";
    let url = new URL(baseUrl + "get-feedback-code-summary");

    const {token} = this.props.match.params;
    let params = {token: token};

    url.search = new URLSearchParams(params);

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ record:data.record, summary:data.summary }));
  }

  handleCopyUrlToClipboard(){
      var copyInput = document.querySelector('.copy-input');
      var textArea = document.createElement("textarea");

      // Place in top-left corner of screen regardless of scroll position.
      textArea.style.position = 'fixed';
      textArea.style.top = 0;
      textArea.style.left = 0;
    
      // Ensure it has a small width and height. Setting to 1px / 1em
      // doesn't work as this gives a negative w/h on some browsers.
      textArea.style.width = '2em';
      textArea.style.height = '2em';
    
      // We don't need padding, reducing the size if it does flash render.
      textArea.style.padding = 0;
    
      // Clean up any borders.
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
    
      // Avoid flash of white box if rendered for any reason.
      textArea.style.background = 'transparent';
      textArea.value = copyInput.value;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
    
      try {
        document.execCommand('copy');
      } catch (err) {
        console.log('Oops, unable to copy');
      }
    
      document.body.removeChild(textArea);
    }


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
    
    }else if(this.state.record){
      qrCodeImage = this.state.record.hits[0]._source.qrcode;
      
    }else if (this.props.location.state){
      qrCodeImage = this.props.location.state.qrCode;
    }

    const {token} = this.props.match.params;
    let shareUrl = "https://" + window.location.host + "/vote/" + token;

    let result = [0,0,0,0,0];
    let tmpResults = [0,0,0,0,0];
    if(this.state.summary && this.state.summary.total > 0){
      this.state.summary.hits.forEach(el => {
        let v_ = el._source.vote;
        tmpResults[v_-1]++;
      });
  
      tmpResults.forEach((el, idx) => {
        result[idx] = el / this.state.summary.total * 100;
      });
    }

    return (
      <div>
        <Header />
        <div className="DashboardPage row">
          <div className="col s12 l8 offset-l2">
            <h2 className="bb-4">Dashboard: {label}</h2>
          </div>

          {this.state.summary.total > 0 && (
            <>
              <div className="col s12 m5 offset-m1 l4 offset-l2">
                <img alt="no-code" className="feedback-code" src={"data:image/png;base64," + qrCodeImage} />
              </div>
              <div className="col s12 m5 l4 md-mt-2">
                  <h5>Bewertung</h5>
                  <ul>
                    <li><i className="medium material-icons left">sentiment_very_satisfied</i><div className="bar" style={{width: result[4] + '%'}}></div></li>
                    <li><i className="medium material-icons left">sentiment_satisfied</i><div className="bar" style={{width: result[3] + '%'}}></div></li>
                    <li><i className="medium material-icons left">sentiment_neutral</i><div className="bar" style={{width: result[2] + '%'}}></div></li>
                    <li><i className="medium material-icons left">sentiment_dissatisfied</i><div className="bar" style={{width: result[1] + '%'}}></div></li>
                    <li><i className="medium material-icons left">sentiment_very_dissatisfied</i><div className="bar" style={{width: result[0] + '%'}}></div></li>
                  </ul>
              </div>
            </>
          )}

          {this.state.summary.total === 0 && (
              <div className="col s12 m6 offset-m3 l4 offset-l4">
                <img alt="no-code" className="feedback-code" src={"data:image/png;base64," + qrCodeImage} />
              </div>
          )}

          <div className="col s12 l8 offset-l2 actions black">
            <a href="/html-widget" className="waves-effect waves-light btn white black-text left">Widget anzeigen</a>
            <button onClick={window.print} className="waves-effect waves-light btn white black-text left">Flyer drucken</button>
            <a href={"whatsapp://send?text=Hey! Deine Meinung ist gefragt. "+ shareUrl} data-action="share/whatsapp/share" className="waves-effect waves-light btn white black-text float-right"><i className="material-icons right">share</i>Einladen</a>
            <input className="copy-input" type="text" style={{display:"none"}} defaultValue={shareUrl} />
            <button onClick={this.handleCopyUrlToClipboard.bind(this)} className="waves-effect waves-light btn white black-text float-right">Vote Link kopieren</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default DashboardPage