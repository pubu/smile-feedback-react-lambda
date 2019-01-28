import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './index.css';

class FeedbackCreateForm extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { loading: false, redirectUrl: null, qrCode:null };
  }

  handleSubmit = api => e => {
    e.preventDefault();

    let baseUrl = '/.netlify/functions/';

    this.setState({ loading: true });
    fetch(baseUrl + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, redirectUrl: json.url, qrCode:json.code }));
  };

  render() {
    const { loading, redirectUrl, qrCode } = this.state;

    if(redirectUrl){
      console.log(redirectUrl, qrCode);
      this.props.qrCode = qrCode;
      return  <Redirect to={redirectUrl} />
    }

    if (loading){
      return (
          <p>bitte warten</p>
      );
    }else{
      return (
        <form name="create-feedback-code" onSubmit={this.handleSubmit('service')}>
          <div className="row">
            <div className="input-field col s6">
              <i class="material-icons prefix">email</i>
              <input type="email" name="email" id="email" placeholder="E-Mail-Adresse eintragen" required />
              <label for="email">E-Mail-Adresse</label>
            </div>
            <div className="col s6">
              <button class="btn waves-effect waves-light" type="submit" name="action">Anfordern
                <i class="material-icons right">send</i>
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
      <div className="HomePage row">
        <header className="HomePage-header col s6 offset-s3">
          <h1 className="title t-c">:) Feedback</h1>
          <h2 >Und so einfach geht das!</h2>
          <p>
          Jetzt E-Mail-Adresse eintragen und deinen persönlichen Feedback-Code sichern. Den Feedback-Code kannst du überall ganz bequem platzieren und die Bewertung auswerten.
          <br/><br/><strong>Das Angebot ist unverbindlich und kostenfrei!</strong>
          </p>
          <FeedbackCreateForm {...this.props} />
        </header>
    
        <div className="col s6 offset-s3">
          <h4>Was ist ein Feedback-Code?</h4>
          <p>Ein Feedback-Code ist ein QR-Code der von Interessenten gesannt werden kann, um im Anschluss ein Feedback in Form einer Bewertung für Sie zu hinterlassen.</p>

          <h4>Wie kann ich den Feedback-Code nutzen?</h4>
          <p>Mit dem Feedback-Code kann auf einfache Art die Meinung von Besuchern und Benutzern eingesammelt werden. Dabei sind die Einsatzmöglichkeiten unbegrenzt. Ob im Taxi, im Kiosk, einer Veranstaltung, einer Party kann der Feedback-Code den Besuchern und Gästen die anonyme Bewertung ermöglichen. Überall wo eine Dienstleistung angeboten wird und Menschen zusammenkommen kann auf einfachem Wege die Meinung einfangen werden. Im Nachhinein kann die Bewertung auf bequeme Weise ausgewertet werden.</p>
          
          <h4>Wer kann den Feedback-Code verwenden?</h4>
          <p>Das Angebot steht allen frei zur Verfügung und jeder kann den Feedback-Code einsetzen. Für die Verwendung wird ein Handy benötigt. . Auch kann der Feedback-Code über ein Widget auf einer Website oder in einer App eingebunden werden. Versuche es einfach aus, es ist ganz leicht.</p>
        </div>
      </div>
    );
  }
}

export default HomePage