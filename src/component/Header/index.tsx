import React from 'react'
import LogoSection from './Logo'
import NavigationSection from './Navbar'
import ButtonSection from './HeaderButton'


const HeaderSection = () => {
    return (
        <div className='flex items-center justify-between px-4 py-2'>
            <LogoSection />
            <NavigationSection />
            <ButtonSection />

        </div>
    )
}

export default HeaderSection