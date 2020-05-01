import React from 'react'
import Styled from 'styled-components/macro'
import tw from 'tailwind.macro'

import { Row } from 'antd'

import { Props } from './poverlay.typings'

export default function POverlay ({ 
  children, 
  position,
  mode, 
  className 
}: Props) {
  return (
    <StyledPOverlay 
      justify="center"
      mode={mode}
      position={position}
      className={`p-overlay ${className ? className : ''}`}
    >
      {children}
    </StyledPOverlay>
  )
}

const StyledPOverlay = Styled(Row)`
  ${tw`
    fixed 
    w-full
    left-0 
  `};

  ${props => props.position === 'top' && (
    tw`top-0`
  )}
  
  ${props => props.position === 'bottom' && (
    tw`bottom-0`
  )}

  ${props => props.mode === 'full' && (
    tw`h-full `
  )}
`
