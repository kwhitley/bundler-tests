import * as React from 'react'
import './App.scss'

import { Details } from './misc/Details'

export const App = () => {
  return (
    <div className="app">
      <div className="welcome">FuseBox ❤️ JSX/TSX </div>

      <Details />
    </div>
  )
}

export default App