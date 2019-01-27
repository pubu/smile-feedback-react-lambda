import React from 'react'
import styled from 'styled-components'
import { palette, size } from 'styled-theme'

import {
  Block,
  Paragraph,
  Heading,
  Input,
  Button
} from 'components'

const Wrapper = styled(Block)`
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: ${palette('primary', 0, true)};
  box-sizing: border-box;
  @media screen and (max-width: 640px) {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
`

const InnerWrapper = styled.div`
  width: 100%;
  max-width: ${size('maxWidth')};
  @media screen and (max-width: 640px) {
  }
`

const SmallText = styled(Paragraph)`
  color: ${palette('grayscale', 1, true)};
  font-weight: 300;
  font-size: 1.2rem;
  line-height: 1.4em;
  width: 100%;
  letter-spacing: 0.05em;
  @media screen and (max-width: 640px) {
    text-align: center;
    font-size: 1rem;
  }
`

const HeadingLight = styled(Heading)`
  color: ${palette('grayscale', 1, true)};
  font-size: 3rem;
  line-height: 3.2rem;
`

const SmallInput = styled(Input)`
  width: 400px;
  margin-top:20px;
  float:left;
`
const ButtonC = styled(Button)`
  margin-top:20px;
`

const Hero = (props) => {
  return (
    <Wrapper opaque reverse {...props}>
      <InnerWrapper>
            <HeadingLight reverse>Und so einfach geht das!</HeadingLight>
            <SmallText reverse>
            Jetzt E-Mail-Adresse eintragen und deinen persönlichen Feedback-Code sichern.
            Den Feedback-Code kannst du überall ganz bequem platzieren und die Bewertung auswerten. 
            <br/><br/>
            <strong>Das Angebot ist unverbindlich und kostenfrei!</strong>
            </SmallText>
            <form name="create-feedback-code" method="POST" data-netlify="true">
              <SmallInput type="email" name="email" />
              <ButtonC type="submit">Senden</ButtonC>
              <input type="hidden" name="form-name" value="create-feedback-code" />
            </form>
      </InnerWrapper>
    </Wrapper>
  )
}

export default Hero
