import React from 'react'
import './App.css'
// import Calendar from './components/calendar'
import routes from './routes'
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {routes.map((route, i) => {
        const { path, exact, routes } = route
        return (
          <Route
            key={i}
            path={path}
            exact={exact}
            render={routeProps => (
              <route.component routes={routes} {...routeProps} />
            )}
          />
        )
      })}
    </div>
  )
}

export default App
