import React from 'react'
import img from './rocket-chicken.jpg'
import pid from './pid.pdf'
import data from './data.json'

export const AsyncDetails = ({ item }) => {
  return (
    <>
      <h2>Detail Content for Item { item }</h2>
      <p>Donec risus risus, feugiat at ultricies vitae, mollis et ex. Nam bibendum eros vitae eros imperdiet hendrerit. Suspendisse varius dui eu tempor vestibulum. Phasellus vehicula massa eget rutrum semper. Fusce augue ante, porttitor in porttitor sit amet, egestas quis mauris. Aenean vestibulum urna odio, vitae porta urna ultrices nec. Duis eu ullamcorper mi, eget accumsan orci. Ut tempor, quam malesuada lobortis accumsan, lacus nisi pulvinar tellus, nec volutpat diam diam in nunc. Quisque scelerisque aliquet velit, pharetra posuere massa tincidunt in. Cras non est bibendum, congue felis rutrum, lobortis turpis. Etiam feugiat accumsan pharetra. Vestibulum quis condimentum elit. Nulla vitae posuere lorem. Nulla sit amet metus tortor. Praesent molestie augue at sem feugiat dapibus. Nunc efficitur risus venenatis porttitor mollis.</p>
      <p>Phasellus volutpat, urna at mattis suscipit, urna mi dignissim neque, sit amet luctus lacus augue ac tortor. Donec ac nibh leo. Nunc convallis diam vulputate tincidunt finibus. Praesent pulvinar luctus nibh vel commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec dolor ante, ultricies non risus dictum, pulvinar eleifend diam. Duis at sem ut tortor rhoncus egestas quis a mi. Mauris ut neque iaculis, finibus arcu id, accumsan libero. Suspendisse faucibus leo eget tellus ullamcorper auctor. In a pretium diam, gravida malesuada leo. Pellentesque eget tincidunt metus, eleifend aliquet tortor. Duis vestibulum risus ut sem porta, sit amet elementum est vehicula. Nulla urna nisi, rutrum eu dui vitae, lacinia consequat urna. Phasellus quis risus tellus. Nunc lobortis suscipit ipsum vitae viverra.</p>

      <h4>External Links</h4>
      <p><a href={pid}>External PDF</a></p>

      <h4>Image Loading</h4>
      <img src={img} />

      <h4>JSON import</h4>
      {
        data.map(item => <li key={item.hash}>{ item.name }</li>)
      }
    </>
  )
}

export default AsyncDetails