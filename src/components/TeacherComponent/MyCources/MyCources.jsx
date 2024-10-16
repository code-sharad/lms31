import React from 'react'
import Card from '../../Card/Card'



function MyCources() {
    return (
        <div className='text-white   min-h-screen'>
            <h1 className='text-center text-4xl my-12'>My Courses</h1>
            <div className=' flex transition-all justify-center my-12 items-center gap-12 flex-wrap'>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}

export default MyCources