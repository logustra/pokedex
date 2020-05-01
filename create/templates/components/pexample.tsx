import React from 'react'
import Styled from 'styled-components/macro'
import tw from 'tailwind.macro'

import { Props } from './pexample.typings'

export default function PExample ({ children, className }: Props) {
  return (
    <StyledPExample className={`p-example ${className ? className : ''}`}>
      {children}
    </StyledPExample>
  )
}

const StyledPExample = Styled.div`

`
