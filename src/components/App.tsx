import React, { useState, useEffect, Suspense } from 'react'
import './App.scss'
import styled from 'styled-components'

// import { Details } from './misc/Details'

const Details = React.lazy(() => import('./misc/Details'))

const Welcome = styled.div`
  font-size: 2em;
  font-weight: lighter;
`

const Button = styled.button`
  font-size: 2rem;
  padding: 0.15em 0.4em 0.25rem;
  background-color: rgba(0,0,0,0.2);
  border: none;
  border-radius: 0.3rem;
  color: white;
  cursor: pointer;

  &:focus {
    box-shadow: none;
    outline: none;
  }

  &:not(:disabled):hover {
    background-color: rgba(0,0,0,0.3);
  }

  &:disabled {
    cursor: pointer;
    opacity: 0.5;
  }
`

const Loading = () => {
  return (
    <>Loading...</>
  )
}

export const App = () => {
  const [counter, setCounter] = useState(0)
  const increment = () => setCounter(counter + 1)

  return (
    <div className="app">
      <Welcome>FuseBox ❤️ JSX/TSX </Welcome>

      Counter is on { counter }

      <Button onClick={increment} disabled={counter > 5}>Tick</Button>

      {
        counter > 4
        ? <Suspense fallback={<Loading />}>
            <Details />
          </Suspense>
        : null
      }
      
      
    </div>
  )
}

export default App