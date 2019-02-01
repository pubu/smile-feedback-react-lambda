import React, { Component } from 'react';
import Footer from '../../organisms/Footer';
import Header from '../../organisms/Header';
import ItemList from '../../organisms/ItemList';
import { Redirect } from 'react-router';
import './index.css';

class FeedbackCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: null,
      labelValue: null, 
      loading: false, 
      redirectUrl: null, 
      qrCode:null };

    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleSubmit = api => e => {
    e.preventDefault();

    let baseUrl = '/.netlify/functions/';

    this.setState({ loading: true });
    /* send to service */
    fetch(baseUrl + api, {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: this.state.emailValue, label: this.state.labelValue})
        }
      )
      .then(response => response.json())
      .then(json => { 
        this.setState({ loading: false, redirectUrl: json.url, qrCode:json.code }); 

        let saveKey = this.state.emailValue + "-" + this.state.labelValue;
        
        // save data
        let feedbackCodeData = localStorage.getItem('fC-data') || "{}";
        feedbackCodeData = JSON.parse(feedbackCodeData);
        feedbackCodeData[json.url] = {
          code:json.code, 
          rUrl:json.url, 
          email:this.state.emailValue,
          label: this.state.labelValue
        }

        localStorage.setItem('fC-data', JSON.stringify(feedbackCodeData));
      });
  };

  handleEmailChange(event){
    this.setState({emailValue: event.target.value});
  }

  handleLabelChange(event){
    this.setState({labelValue: event.target.value});
  }

  render() {
    const { loading, redirectUrl, qrCode } = this.state;

    if(redirectUrl){
      return  <Redirect to={{
          pathname: redirectUrl,
          state: { qrCode: qrCode }
        }}
      />
    }

    if (loading){
      return (
          <p>bitte warten</p>
      );
    }else{
      return (
        <form name="create-feedback-code" onSubmit={this.handleSubmit('service')}>
          <div className="row">
            <div className="input-field col s12 l6">
              <i className="material-icons prefix">label</i>
              <input type="text" name="feedback-name" id="feedback-name" onChange={this.handleLabelChange} required />
              <label htmlFor="feedback-name">Bezeichnung</label>
            </div>
            <div className="input-field col s12 l6">
              <i className="material-icons prefix">email</i>
              <input type="email" name="email" id="email" onChange={this.handleEmailChange} required />
              <label htmlFor="email">E-Mail-Adresse eintragen</label>
            </div>
            <div className="col s12 l6">
              <button className="btn black waves-effect waves-light" type="submit" name="action">Anfordern
                <i className="material-icons right">send</i>
              </button>            
            </div>
          </div>
        </form>
      );
    }
  }
}

class HomePage extends Component {
  render() {
    return (
      <div>
      <Header />
      <div className="HomePage row">
        <header className="HomePage-header col s12 l6 offset-l3">
          <h2 >Und so einfach geht das!</h2>
          <p>
          Jetzt E-Mail-Adresse eintragen und deinen persönlichen Feedback-Code sichern. Den Feedback-Code kannst du überall ganz bequem platzieren und die Bewertung auswerten.
          <br/><br/><strong>Das Angebot ist unverbindlich und kostenfrei!</strong>
          </p>
          <FeedbackCreateForm {...this.props} />
        </header>
        <div className="col s12 l6 offset-l3">
          <ItemList />
        </div>
        <div className="col s12 l6 offset-l3">
          <h4>Was ist ein Feedback-Code?</h4>
          <p>Ein Feedback-Code ist ein QR-Code der von Interessenten gesannt werden kann, um im Anschluss ein Feedback in Form einer Bewertung für Sie zu hinterlassen.</p>

          <h4>Wie kann ich den Feedback-Code nutzen?</h4>
          <p>Mit dem Feedback-Code kann auf einfache Art die Meinung von Besuchern und Benutzern eingesammelt werden. Dabei sind die Einsatzmöglichkeiten unbegrenzt. Ob im Taxi, im Kiosk, einer Veranstaltung, einer Party kann der Feedback-Code den Besuchern und Gästen die anonyme Bewertung ermöglichen. Überall wo eine Dienstleistung angeboten wird und Menschen zusammenkommen kann auf einfachem Wege die Meinung einfangen werden. Im Nachhinein kann die Bewertung auf bequeme Weise ausgewertet werden.</p>
          
          <h4>Wer kann den Feedback-Code verwenden?</h4>
          <p>Das Angebot steht allen frei zur Verfügung und jeder kann den Feedback-Code einsetzen. Für die Verwendung wird ein Handy benötigt. Auch kann der Feedback-Code über ein Widget auf einer Website oder in einer App eingebunden werden. Versuche es einfach aus, es ist ganz leicht.</p>
        </div>
      </div>
      <Footer />
      </div>
    );
  }
}

export default HomePage