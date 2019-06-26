import React, { Component } from 'react';
import CookieConsent from "react-cookie-consent";
import './index.css';

class Footer extends Component {
  render() {
    return (
      <CookieConsent
          location="bottom"
          buttonText="Verstanden"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={150}
      >
        Diese Internetseite verwendet Cookies, um die Nutzererfahrung zu verbessern und den Benutzern bestimmte Dienste und Funktionen bereitzustellen.
      </CookieConsent>
    );
  }
}

export default Footer