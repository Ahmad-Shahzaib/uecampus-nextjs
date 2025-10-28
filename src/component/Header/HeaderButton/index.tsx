import { Button } from '@/components/ui/button'
import React from 'react'

const ButtonSection = () => {
    return (
        <div className='flex gap-4'>
            <Button variant="default">Student Portal
            </Button>
            <Button variant="destructive" >Enquire Now</Button>
        </div >
    )
}

export default ButtonSection