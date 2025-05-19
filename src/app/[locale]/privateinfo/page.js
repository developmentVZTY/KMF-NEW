import React from 'react'
import { Header } from '@/components/Header'
import secretinfoImg from "@/images/Privateinfo-new.png"

function PrivateInfo() {
  return (

   <div className='w-full h-full'>
      
      <div className='w-full h-[98vh] flex justify-center items-center'>
         
         <div className='w-[95%] md:w-[48%] h-auto'>
            <img className='w-full h-full' src={secretinfoImg.src} alt="" />
         </div>
            
      </div>
      
    </div>
  )
}

export default PrivateInfo
