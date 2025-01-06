import React from 'react'
import { assets } from '../../assets/assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <div id="AppDownload">
          <div className='items-center flex flex-col text-center'>
              <h2 className='max-w-[1000px] text-2xl md:text-4xl font-[600] mt-12 mb-4'>For a Better Experience, Download The Mobile App</h2>
              <div className='flex gap-4 md:gap-10 my-4'>
                  <img src={assets.play_store} alt="play store" className="w-[125px] md:w-[200px]"/>
                  <img src={assets.app_store} alt="app store" className="w-[125px] md:w-[200px]" />
              </div>
      </div>
    </div>
  )
}

export default AppDownload
