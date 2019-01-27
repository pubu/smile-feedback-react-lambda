// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import {
  PageTemplate, Header, Hero, Footer, Heading, Paragraph
} from 'components'

const HomePage = () => {
  return (
    <PageTemplate
      header={<Header />}
      hero={<Hero />}
      footer={<Footer />}
    >
      <Heading level="2">Was ist ein Feedback-Code?</Heading>
      <Paragraph>
      Ein Feedback-Code ist ein QR-Code der von Interessenten gesannt werden kann, 
      um im Anschluss ein Feedback in Form einer Bewertung für Sie zu hinterlassen.
      </Paragraph>
      <Heading level="2">Wie kann ich den Feedback-Code nutzen?</Heading>
      <Paragraph>
      Mit dem Feedback-Code kann auf einfache Art die Meinung von Besuchern und Benutzern eingesammelt werden. 
      Dabei sind die Einsatzmöglichkeiten unbegrenzt. Ob im Taxi, im Kiosk, einer Veranstaltung, einer Party kann der Feedback-Code
      den Besuchern und Gästen die anonyme Bewertung ermöglichen. Überall wo eine Dienstleistung angeboten wird und Menschen zusammenkommen
      kann auf einfachem Wege die Meinung einfangen werden. Im Nachhinein kann die Bewertung auf bequeme Weise ausgewertet werden.
      </Paragraph>
      <Heading level="2">Wer kann den Feedback-Code verwenden?</Heading>
      <Paragraph>
      Das Angebot steht allen frei zur Verfügung und jeder kann den Feedback-Code einsetzen. Für die Verwendung wird ein Handy benötigt. 
      . Auch kann der Feedback-Code über ein Widget auf einer Website oder in einer App eingebunden werden. Versuche es einfach aus, es ist ganz leicht.
      </Paragraph>      
    </PageTemplate>
  )
}

export default HomePage
