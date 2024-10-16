import React from 'react'
import { Link } from 'react-router-dom'

function Card({ title, author, description }) {
    return (
        <Link to={`#`} className='w-[320px] text-white border border-[#1d1b22]  bg-black hover:scale-[103%] transition-all  font-inter  overflow-hidden mt-2   rounded-xl'>
            <img className='w-full h-full' alt='course' src={`https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/41/4d3d7c05fb42729c9d90352e072ca3/1060x596_GCC-photos_Karrim.png?auto=format%2Ccompress%2C%20enhance&dpr=1&w=320&h=180&fit=crop&q=50&crop=faces `} />
            <section className='flex my-2 flex-col gap-2 p-4'>
                <h1 className='font-bold text-lg  '>Full Stack Web Development</h1>
                <p className='text-gray-400  text-md font-semibold'>Vivek Shejole</p>
                <p className='tracking-wide'>Ready to rule the digital world. Learn to build powerfull fullstack
                    software easily.</p>
                <section className='flex flex-wrap gap-3'>
                    <span className='bg-[#71b1ff] text-white p-[1px] text-sm px-3 rounded-xl'>react</span>
                    <span className='bg-[#1d1b22] text-white p-[1px] text-sm px-3 rounded-xl'>express</span>
                    <span className='bg-[#66ff80] text-black p-[1px] text-sm px-3 rounded-xl'>nodejs</span>
                </section>
                {/* <span className='font-bold bg-blue- 400 p-2 w-fit rounded-lg'>₹2,000</span> */}
            </section>

            {/* <button className='bg-gray-900 active:bg-gray-900 tracking-wider text-white w-full p-4'>Continue</button> */}
        </Link>
    )
}

export default Card