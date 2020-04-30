import React from 'react'
import Styled from 'styled-components/macro'

import { Props } from './pexample.typings'

export default function PExample ({ children, className }: Props) {
  return (
    <StyledPExample className={`p-example ${className}`}>
      {children}
    </StyledPExample>
  )
}

const StyledPExample = Styled.div`

`
