import React from 'react'
import Styled from 'styled-components/macro'
import tw from 'tailwind.macro'
import { rem } from 'polished'

import { Props } from './ppageHeader.typings'

import { PageHeader } from 'antd'

import { colors } from '@/styles'

export default function PPageHeader ({ title, onBack, className }: Props) {
  return (
    <StyledPPageHeader 
      title={title}
      onBack={onBack}
      className={`p-page-header fixed px-0 py-1 ${className ? className : ''}`} 
    />
  )
}

const StyledPPageHeader = Styled(PageHeader)`
  ${tw`
    w-full 
    left-0 
    top-0 
    z-10 
    flex
    justify-center
    items-center
  `}

  background-color: ${colors.blue[500]} !important;

  .ant-page-header {    
    &-back {
      ${tw`mr-6`};
    }

    &-heading {
      ${tw`px-4`};
      width: ${rem('480px')};

      &-title {
        ${tw`text-white`};
      }

      .anticon {
        ${tw`text-white`};
      }
    }
  }  
`
