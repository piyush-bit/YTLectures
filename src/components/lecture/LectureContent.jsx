import React from 'react'
import VideoDescription from './VideoDescription'
import DescriptionSection from './DescriptionSection'

function LectureContent(params) {
    return (
        <div >
            <iframe className='w-full ' style={{ height: '66vh' }} src={params.data.embed_link.replace('watch?v=','embed/')} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <div className='px-9'>
                <div>
                    <h2 className='text-xl font-semibold mt-10 mb-4'>{params.data.title}{params.progress}</h2>
                    
                </div>
                
                <DescriptionSection destext={params.data.description}/>

            </div>


        </div>
    )
}

export default LectureContent