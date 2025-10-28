import React from 'react'
import { HeroSection } from './section'

const JoinUs = () => {
  return (
    <main className="min-h-screen" style={{
      backgroundImage: `
          url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-2.png'),
          
        `,
      backgroundSize: 'cover, auto',
      backgroundPosition: 'center, center',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundBlendMode: 'overlay, normal',
    }}>
      <HeroSection />
    </main>
  )
}

export default JoinUs
