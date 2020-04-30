import React from 'react'

export default [
  {
    exact: true,
    path: '/',
    component: React.lazy(() => import('./views/pokemonIndex'))
  },
  {
    exact: true,
    path: '/detail/:id/:name',
    component: React.lazy(() => import('./views/pokemonDetail'))
  }
]
