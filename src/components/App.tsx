import { useState, useEffect, useRef } from 'preact/hooks'
import { Suspense } from 'preact/compat'
import { h, Fragment } from 'preact'
import { 
  BrowserRouter as Router, 
  Link, 
  NavLink, 
  Route, 
  Switch, 
  useHistory,
  useParams, 
} from 'react-router-dom'
import './App.scss'
import styled from 'styled-components'
import { lazy } from '../utils/lazy'

const AsyncDetails = lazy(() => import('./misc/AsyncDetails'))

const PAGE_TRANSITIONS = 400
const PADDING = '3em'

const Welcome = styled.div`
  font-size: 2em;
  font-weight: lighter;
`

const Loading = () => {
  return (
    <Fragment>Loading...</Fragment>
  )
}

// export const App = () => {
//   const [counter, setCounter] = useState(0)
//   const increment = () => setCounter(counter + 1)

//   return (
//     <div className="app">
//       <Welcome>FuseBox ❤️ JSX/TSX </Welcome>

//       Counter is on { counter }

//       <Button onClick={increment} disabled={counter > 5}>Tick</Button>

//       {
//         counter > 4
//         ? <Suspense fallback={<Loading />}>
//             <AsyncDetails />
//           </Suspense>
//         : null
//       }
//     </div>
//   )
// }

const StyledPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: ${PADDING};
  overflow-y: ${props => props.visible ? 'auto' : 'hidden'};
  overflow-x: hidden;
  // opacity: ${props => props.visible ? 1 : 0};
  transition: all ${PAGE_TRANSITIONS / 1000}s ease;
  transform: translate3D(${props => props.visible ? 0 : '-100%'},0,0);
`

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7em, 1fr));
  grid-gap: 0.2rem;
`

const StyledGridItem = styled.div`
  display: flex;
  background-color: #eee;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: black;
  text-decoration: none;
  font-size: 3em;

  &:hover {
    background-color: #ddd;
  }
  
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
    
    background-color: #eee;
  }
`

const BigNumber = styled.span`
  font-size: 2em;
  margin-left: 0.2em;
`

export const GridItem = ({ collection, id }) => {
  return (
    <StyledGridItem as={Link} to={`/${collection}/${id}`}>
      { id }
    </StyledGridItem>
  )
}

export const Index = ({ collection, id }) => {
  let items = new Array(40).fill(null).map((c, i) => i + 1)

  return (
    <StyledPage visible={!id}>
      <StyledGrid>
        {
          items.map((item, i) =>
            <GridItem key={i} collection={collection} id={item} />
          )
        }
      </StyledGrid>
    </StyledPage>
  )
}

const StyledDetails = styled(StyledPage)`
  transform: translate3D(${props => props.visible ? 0 : '100%'},0,0);
`

const Button = styled.div`
  flex: 1;
  display: block;
  border: 0;
  padding: 0.5em;
  font-size: 2em;
  background-color: #f3f3f3;
  color: ${({ secondary }) => secondary ? '#888' : '#000'};
  text-decoration: none;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #e5e5e5;
  }
`

const FlexBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: stretch;
`

 // pass in id to only trigger scroll top when new id loaded
const useScrollTop = (scroll) => {
  let ref = useRef(null)

  useEffect(() => {
    if (ref.current && scroll) {
      ref.current.scrollTop = 0
    }
  }, [scroll])

  return ref
}

const movements = {
  PREV: 0,
  STATIC: 1,
  NEXT: 2,
}
const translations = [`calc(100% + ${PADDING})`, 0, `calc(-100% - ${PADDING})`]

const StyledPageStack = styled(FlexBox)`
  pointer-events: ${({ movement }) => movement === movements.STATIC ? 'auto' : 'none'};
  transition: all ${({ movement }) => movement === movements.STATIC ? 0 : (PAGE_TRANSITIONS / 1000)}s ease;
  transform: translate3D(${({ movement }) => translations[movement]},0,0);
`

export const PageStack = ({ id }) => {
  let [useId, setUseId] = useState(id)
  let [movement, setMovement] = useState(movements.STATIC)

  useEffect(() => {
    console.log('route id changed', id)

    if (id > useId) {
      setMovement(movements.NEXT)
    }

    if (id < useId) {
      setMovement(movements.PREV)
    }

    if (!useId && id || !id) {
      console.log('setting id to', id)
      setMovement(movements.STATIC)
      setUseId(id)
    }

    if (id && useId && id !== useId) {
      setTimeout(() => {
        setMovement(movements.STATIC)
        console.log('setting id after animation to', id)
        setUseId(id)
      }, PAGE_TRANSITIONS)
    }
  }, [id])

  return (
    <StyledPageStack movement={movement}>
      <PageItem id={useId-1} prev />
      <PageItem id={useId} />
      <PageItem id={useId+1} next />
    </StyledPageStack>
  )
}

const StyledPageItem = styled.div`
  flex: 1;
  position: absolute;
  left: 0;
  right: 0;
  padding-bottom: ${PADDING};
  transform: translate3D(${({ next, prev }) => next ? ('calc(100% + ' + PADDING + ')') : (prev ? ('calc(-100% - ' + PADDING + ')') : 0)},0,0);
`

export const PageItem = ({ id, ...props }) => {
  let [showDetails, setShowDetails] = useState(false)

  return (
    <StyledPageItem {...props}>
      <h2>item { id }</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nunc libero, venenatis id diam imperdiet, sollicitudin porttitor neque. Quisque a sapien sit amet felis laoreet molestie nec vel est. Integer porttitor elit odio, in facilisis libero dictum eu. Cras at eros nec velit maximus ornare. Phasellus sit amet pellentesque ligula, vel rutrum nunc. Donec vestibulum in eros ac ultrices. Nulla blandit mauris ligula, et porttitor tellus mollis sit amet. Mauris tincidunt sollicitudin iaculis. Aenean blandit justo sit amet tellus imperdiet, accumsan porta erat aliquam. In enim felis, feugiat in consequat at, dictum ut lectus. Integer tincidunt blandit elementum. Maecenas blandit congue sem varius volutpat. Duis a auctor orci. Nunc blandit condimentum elit. Aliquam molestie, nibh molestie consectetur commodo, orci eros vehicula urna, vel dignissim ante tellus eu ante. Nam in lacus nibh.</p>
      <p>Donec risus risus, feugiat at ultricies vitae, mollis et ex. Nam bibendum eros vitae eros imperdiet hendrerit. Suspendisse varius dui eu tempor vestibulum. Phasellus vehicula massa eget rutrum semper. Fusce augue ante, porttitor in porttitor sit amet, egestas quis mauris. Aenean vestibulum urna odio, vitae porta urna ultrices nec. Duis eu ullamcorper mi, eget accumsan orci. Ut tempor, quam malesuada lobortis accumsan, lacus nisi pulvinar tellus, nec volutpat diam diam in nunc. Quisque scelerisque aliquet velit, pharetra posuere massa tincidunt in. Cras non est bibendum, congue felis rutrum, lobortis turpis. Etiam feugiat accumsan pharetra. Vestibulum quis condimentum elit. Nulla vitae posuere lorem. Nulla sit amet metus tortor. Praesent molestie augue at sem feugiat dapibus. Nunc efficitur risus venenatis porttitor mollis.</p>
      <p>Phasellus volutpat, urna at mattis suscipit, urna mi dignissim neque, sit amet luctus lacus augue ac tortor. Donec ac nibh leo. Nunc convallis diam vulputate tincidunt finibus. Praesent pulvinar luctus nibh vel commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec dolor ante, ultricies non risus dictum, pulvinar eleifend diam. Duis at sem ut tortor rhoncus egestas quis a mi. Mauris ut neque iaculis, finibus arcu id, accumsan libero. Suspendisse faucibus leo eget tellus ullamcorper auctor. In a pretium diam, gravida malesuada leo. Pellentesque eget tincidunt metus, eleifend aliquet tortor. Duis vestibulum risus ut sem porta, sit amet elementum est vehicula. Nulla urna nisi, rutrum eu dui vitae, lacinia consequat urna. Phasellus quis risus tellus. Nunc lobortis suscipit ipsum vitae viverra.</p>
      <p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi blandit purus mi, vel blandit metus condimentum vel. Donec a egestas dolor, ut facilisis dui. Quisque ante turpis, ullamcorper sed molestie vitae, pretium vitae metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla dapibus hendrerit ex ut maximus. Morbi euismod nunc et erat faucibus, sit amet lobortis mauris consequat. Aliquam aliquet velit id orci dictum, quis varius velit tristique. Donec vitae cursus erat. Nunc ante quam, vestibulum sit amet nisi a, accumsan varius erat. Fusce faucibus dolor mi, quis semper massa facilisis a. Maecenas in aliquam quam, eget tincidunt augue. Nullam ac tellus est.</p>
      <p>Ut semper vitae augue sed euismod. Ut auctor venenatis dolor, ut efficitur tellus. Duis purus leo, accumsan a consectetur id, semper vel lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce quis varius lorem, eget posuere ligula. Nam ac lorem vehicula, dapibus purus et, pellentesque nibh. Nam laoreet rhoncus ante vel interdum. Mauris vitae dolor nisl. Etiam pharetra iaculis lorem non blandit. Nulla eget iaculis dolor, a blandit tellus. Vestibulum tincidunt enim quam, iaculis consectetur nisl posuere vel. Ut efficitur massa sit amet dui pharetra dapibus. Donec at velit vel risus lacinia pellentesque. Etiam vulputate placerat arcu in viverra. Phasellus pharetra justo massa, quis rhoncus enim luctus in. Nullam accumsan justo a diam consectetur faucibus.</p>

      <Button secondary="true" onClick={() => setShowDetails(true)}>Show Details</Button>
      {
        showDetails
        ? <Suspense fallback={<Loading />}>
            <AsyncDetails />
          </Suspense>
        : null
      }
    </StyledPageItem>
  )
}

export const ItemView = ({ collection, visible, id }) => {
  let history = useHistory()
  let el = useScrollTop(id)

  return (
    <StyledDetails ref={el} visible={visible}>
      <Button onClick={() => history.push(`/${collection}`)}>Return to Index</Button>
      <FlexBox>
        <Button secondary="true" as={Link} to={`/${collection}/${Number(id)-1}`}>Prev</Button>
        <Button secondary="true" as={Link} to={`/${collection}/${Number(id)+1}`}>Next</Button>
      </FlexBox>
      
      <PageStack id={id} />
    </StyledDetails>
  )
}

const StyledMultiPage = styled.div`
  overflow-x: hidden;
`

export const MultiPage = () => {
  let { collection, id } = useParams()
  let [lastId, setLastId] = useState(id)
  id = Number(id)

  useEffect(() => {
    if (id) {
      setLastId(id)
    } else {
      setTimeout(() => {
        setLastId(undefined)
      }, PAGE_TRANSITIONS)
    }
  }, [id])

  console.log('MultiPage rendered')

  return (
    <StyledMultiPage>
      <Index collection={collection} id={id} />
      <ItemView collection={collection} visible={id} id={lastId} />
    </StyledMultiPage>
  )
}

export const MultiPageApp = () => {
  console.log('rendering MultiPageApp (includes router)')
  return (
    <div>
      <Router className="main">
        <Switch>
          <Route path="/:collection/:id?" component={MultiPage} />
        </Switch>
      </Router>
    </div>
  )
}

console.log({
  h, 
  Fragment,
  Suspense,
  useState,
  useRef,
  useEffect,
})

export const TestRoute1 = () => {
  return (
    <Fragment>
      Route 1
    </Fragment>
  )
}


export const TestRoute2 = () => {
  let { collection } = useParams()
  return (
    <Fragment>
      Route 2: { collection }
    </Fragment>
  )
}

export const PreactTest = () => {
  return (
    <Fragment>
      <h2>Preact Test</h2>

      <Router className="main">
        <Switch>
          <Route path="/collections/:collection" component={TestRoute2} />
          <Route path="/" component={TestRoute1} />
        </Switch>
      </Router>

      <p>footer</p>
    </Fragment>
  )
}

const StyledTest = styled.div`
  font-size: 5em;
  color: red;
`

const StyledTestComponent = () => {
  console.log('rendering StyledTestComponent', { StyledTest })
  return (
    <StyledTest>foo</StyledTest>
  )
}

// export default MultiPageApp
export default MultiPageApp