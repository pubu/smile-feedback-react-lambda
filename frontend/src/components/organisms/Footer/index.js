import React from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'

import { Paragraph, Link } from 'components'

const Wrapper = styled.div`
  background-color: ${palette('grayscale', 1, true)};
  padding: 2rem;
`

const Links = styled.div`
  float:right;
`

const Copy = styled(Paragraph)`
  width:300px;
  float:left;
  margin-top:0;
`

const Footer = (props) => {
  return (
    <Wrapper {...props}>
        <Copy>© 2018 www.smile-feedback.de</Copy>
        <Links>
          <Link href="/datenschutz">Datenschutz</Link>
          {" "}
          <Link href="/impressum">Impressum</Link>
        </Links>
    </Wrapper>
  )
}

export default Footer
