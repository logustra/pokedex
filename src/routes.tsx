import React from 'react'

const domainModuleFiles = require.context('./modules', true, /router.tsx/)
const domainModules = domainModuleFiles.keys().reduce((carry: any, item: string) => {
  return [...carry, ...domainModuleFiles(item).default]
}, [])

export default [
  ...domainModules,

  {
    exact: false,
    path: '*',
    component: React.lazy(() => import('./views/notFound'))
  }
]
