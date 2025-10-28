import React from 'react'
import { HeroSection } from './section'

const JoinUs = () => {
  return (
       <main className="min-h-screen"  style={{
        backgroundImage: `
          url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-2.png'),
           linear-gradient(135deg, #6A1B9A 0%, #8E24AA 50%, #AB47BC 100%))
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
