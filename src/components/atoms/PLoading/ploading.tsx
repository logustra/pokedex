import React from 'react'
import Styled from 'styled-components/macro'
import tw from 'tailwind.macro'

import { Props } from './ploading.typings'

import { colors } from '@/styles'

export default function PLoading ({ mode }: Props) {
  return (
    <StyledPLoading 
      className="p-loading"
      mode={mode}
    >
      <div className="spinner">
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>
    </StyledPLoading>
  )
}

const StyledPLoading = Styled.div`
  ${tw`
    w-full
    h-full
    flex
    justify-center
    items-center
  `}
  
  ${props => props.mode === 'full' && (
    tw`
      fixed
      left-0
      top-0
    `
  )}

  > .spinner {
    ${tw`
      inline-block
      relative
      w-12
      h-12
    `};

    > .bar {
      ${tw`
        block
        absolute
        w-10
        h-10
        m-3
        border-4
        rounded-full
      `};

      box-sizing: border-box;
      border-color: ${colors.blue[500]} transparent transparent transparent;
      animation: loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

      &:nth-child(1) {
        animation-delay: -0.45s;
      }

      &:nth-child(2) {
        animation-delay: -0.3s;
      }

      &:nth-child(3) {
        animation-delay: -0.15s;
      }
    }
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`
