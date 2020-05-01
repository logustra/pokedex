import React from 'react'
import Styled from 'styled-components/macro'
import tw from 'tailwind.macro'

import { Props } from './pcard.typings'

import { Card } from 'antd'

export default function PCard ({ 
  children, 
  cover,
  bodyStyle,
  className 
}: Props) {
  return (
    <StyledPCard
      bordered={false}
      size="small"
      bodyStyle={bodyStyle}
      className={`p-card flex flex-col justify-center items-center rounded p-4 ${className ? className : ''}`}
      cover={cover}
    >
      <div className="text-center">
        {children}
      </div>
    </StyledPCard>
  )
}

const StyledPCard = Styled(Card)`
  .title {
    ${tw`
      text-base 
      font-bold 
      tracking-wide 
    `}
  }
`
