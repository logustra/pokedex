import React from 'react'
import Styled from 'styled-components/macro'
import tw from 'tailwind.macro'
import { rem } from 'polished'

import { Props } from './pcontainer.typings'

export default function PExample ({ children, className }: Props) {
  return (
    <StyledPContainer className={`p-container ${className ? className : ''}`}>
      {children}
    </StyledPContainer>
  )
}

const StyledPContainer = Styled.div`
  ${tw`
    p-4
    overflow-y-auto
  `};

  width: ${rem('480px')};
`
