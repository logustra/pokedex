import React from 'react'
import Styled from 'styled-components/macro'
import tw from 'tailwind.macro'
import { rem } from 'polished'

import { Props } from './playout.typings'

import { setOffline } from '@/stores'

import { useGlobalStore } from '@/libs'

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
    <StyledPLayout className="p-layout">
      {commonState.isOffline && (
        <div className="offline">
          {'You\'re Offline'}
        </div>
      )}

      <div className="container">
        {children}
      </div>
    </StyledPLayout>
  )
}

const StyledPLayout = Styled.div`
  ${tw`
    flex
    justify-center
  `};

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

  > .container {
    width: ${rem('480px')};
    ${tw`p-4`};
  }
`
