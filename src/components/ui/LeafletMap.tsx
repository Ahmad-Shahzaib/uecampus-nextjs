import React from 'react'
import dynamic from 'next/dynamic'

const GlobeWithLabels = dynamic(() => import('./GlobeWithLabels'), {
  ssr: false,
  loading: () => <div />,
})

const LeafletMap = () => {
  return (
    <div className="">
      <GlobeWithLabels />
    </div>
  )
}

export default LeafletMap