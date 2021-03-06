import React from 'react'
import img from './rocket-chicken.jpg'
import pid from './pid.pdf'
import data from './data.json'
import asyncFib from '../../workers/asyncFib.js'
import { Button } from '../App'

const fireFib = async () => {
  console.log('calculating fib...')

  let result = await asyncFib(7)
  console.log('fib calculated:', result)
}

export const AsyncDetails = () => {
  return (
    <>
      <h2>More Details <small><a href={pid}>External PDF</a></small></h2>

      <Button onClick={fireFib}>Fire Fib Worker</Button>

      <img src={img} />
      <p>Donec risus risus, feugiat at ultricies vitae, mollis et ex. Nam bibendum eros vitae eros imperdiet hendrerit. Suspendisse varius dui eu tempor vestibulum. Phasellus vehicula massa eget rutrum semper. Fusce augue ante, porttitor in porttitor sit amet, egestas quis mauris. Aenean vestibulum urna odio, vitae porta urna ultrices nec. Duis eu ullamcorper mi, eget accumsan orci. Ut tempor, quam malesuada lobortis accumsan, lacus nisi pulvinar tellus, nec volutpat diam diam in nunc. Quisque scelerisque aliquet velit, pharetra posuere massa tincidunt in. Cras non est bibendum, congue felis rutrum, lobortis turpis. Etiam feugiat accumsan pharetra. Vestibulum quis condimentum elit. Nulla vitae posuere lorem. Nulla sit amet metus tortor. Praesent molestie augue at sem feugiat dapibus. Nunc efficitur risus venenatis porttitor mollis.</p>
      <p>Phasellus volutpat, urna at mattis suscipit, urna mi dignissim neque, sit amet luctus lacus augue ac tortor. Donec ac nibh leo. Nunc convallis diam vulputate tincidunt finibus. Praesent pulvinar luctus nibh vel commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec dolor ante, ultricies non risus dictum, pulvinar eleifend diam. Duis at sem ut tortor rhoncus egestas quis a mi. Mauris ut neque iaculis, finibus arcu id, accumsan libero. Suspendisse faucibus leo eget tellus ullamcorper auctor. In a pretium diam, gravida malesuada leo. Pellentesque eget tincidunt metus, eleifend aliquet tortor. Duis vestibulum risus ut sem porta, sit amet elementum est vehicula. Nulla urna nisi, rutrum eu dui vitae, lacinia consequat urna. Phasellus quis risus tellus. Nunc lobortis suscipit ipsum vitae viverra.</p>

      {
        data.map(d => <li key={d.hash}>{ d.name }</li>)
      }
    </>
  )
}

export default AsyncDetails