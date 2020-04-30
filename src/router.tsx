import React from 'react'
import { Switch, Route } from 'react-router-dom'

import routes from './routes'

import { RoutesModel } from '@/typings/routerTypings'

import { PLoading } from 'atoms'
import { PPreloader } from 'templates'

function PPreloaderRoute ({ component: Component, ...props }) {
  return (
    <Route
      {...props}
      render={routeProps => (
        <PPreloader>
          <Component {...routeProps} />
        </PPreloader>
      )}
    />
  )
}

export default function Router () {  
  return (
    <React.Suspense fallback={<PLoading />}>
      <Switch>
        {routes.map((item: RoutesModel, index: number) => (
          <PPreloaderRoute
            key={`route-${index}`}
            exact={item.exact}
            path={item.path}
            component={item.component}
          />
        ))}
      </Switch>
    </React.Suspense>
  )
}
