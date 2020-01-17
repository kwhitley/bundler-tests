import { h, render } from 'preact'
// import App from 'components/App'
import styled from 'styled-components'

const StyledDiv = styled.div`
  color: red;
  font-size: 5em;
`

console.log({ StyledDiv })
console.log(StyledDiv.toString())

render(<StyledDiv>foo</StyledDiv>, document.getElementById('root'))