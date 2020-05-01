import React from 'react'
import Styled from 'styled-components/macro'
import tw from 'tailwind.macro'

import { Props } from './playout.typings'

import { setOffline } from '@/stores'

import { useGlobalStore } from '@/libs'

import PContainer from '../PContainer/pcontainer'

import { Row } from 'antd'

export default function PLayout ({ children }: Props) {
  const { 
    commonState, 
    commonDispatch 
  } = useGlobalStore()

  function handleOffline () {
    setOffline(commonDispatch, !window.navigator.onLine)
  }

  React.useEffect(() => {
    window.addEventListener('online', handleOffline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOffline)
      window.removeEventListener('offline', handleOffline)
    }
  }, []) // eslint-disable-line

  return (
    <StyledPLayout 
      justify="center"
      className="p-layout"
    >
      {commonState.isOffline && (
        <div className="offline">
          {'You\'re Offline'}
        </div>
      )}

      <PContainer>
        {children}
      </PContainer>
    </StyledPLayout>
  )
}

const StyledPLayout = Styled(Row)`
  > .offline {
    ${tw`
      fixed 
      bg-red-500 
      text-white 
      text-center 
      p-1 
      w-screen 
      left-0 
      z-20
      mt-12
    `};
  }
`
