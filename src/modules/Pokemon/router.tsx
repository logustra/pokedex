import React from 'react'

export default [
  {
    exact: true,
    path: '/',
    component: React.lazy(() => import('./views/pokemonIndex'))
  }
]
