import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'


function HeroSection() {
    return (
        <div className='text-center'>
            <div className='flex  flex-col gap-5 my-10'>

                <span className='px-3 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'> No.1 Hunt Website</span>
                <h1 className='text-5xl font-bold'> Search ,Apply & Get Your <br /> <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam, nihil unde beatae quos porro id perferendis! Quibusdam </p>
                <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap- mx-auto'>
                    <input
                        type="text"
                        placeholder='Find Your drems job'
                        className='outline-none border-none w-full text-center'
                    />
                   <Button className='rounded-r-full bg-[#6A38C2]'>
                  <Search className='h-5 w-5'/>
                   </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
