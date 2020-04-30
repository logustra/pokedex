import React from 'react'

import { StoresContext } from '@/stores'

export function useGlobalStore () {
  const { commonState, commonDispatch } = React.useContext<any>(StoresContext)

  return { commonState, commonDispatch }
}
