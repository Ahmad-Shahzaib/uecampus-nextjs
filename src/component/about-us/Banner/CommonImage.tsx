import React from 'react'

interface CommonImageProps {
    imageurls: string;
}

const CommonImage = ({imageUrl}) => {
  return (
   <div className="w-44 h-44 rounded-full overflow-hidden border-8 border-white shadow-xl ring-4 ring-sky-200/50">
            <image src={imageUrl} alt="Common Image" className="w-full h-full object-cover"/>
    </div>
  )
}

export default CommonImage
