import React from 'react'
import styled from 'styled-components'
import { palette, size } from 'styled-theme'

import { Icon, Block, Heading } from 'components'

const Wrapper = styled(Block)`
  background-color: ${palette('primary', 0, true)};
  display: flex;
  justify-content: center;
  padding: 1rem;
  @media screen and (max-width: 640px) {
    padding: 0.5rem;
  }
`

const Heading1 = styled(Heading)`
  color:${palette('grayscale', 0, true)};
`

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  max-width: ${size('maxWidth')};
  > :not(:first-child) {
    margin-left: 1rem;
  }
`

const Header = (props) => {
  return (
    <Wrapper opaque reverse {...props}>
      <InnerWrapper>
        <Heading1 reverse>:) Feedback</Heading1>
      </InnerWrapper>
    </Wrapper>
  )
}

export default Header
