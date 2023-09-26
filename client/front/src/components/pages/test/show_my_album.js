import React from 'react'
import { Card, Button } from 'flowbite-react'
import artist from "../../../data/artist_song.json"
import { Link } from 'react-router-dom'

function Main(){
 
    const music = sessionStorage.getItem("music")
    const image = sessionStorage.getItem("gen_image_file")

    return(
        <div className='flex flex-col m-auto max-w-screen w-full'>
            <div className='m-auto'>
                <img src={image} className='w-[400px] h-[400px]' />
            </div>
            <div className='m-auto my-2'>
                <audio controls>
                    <source src={music} />
                </audio>
            </div>
        </div>
    )
}

export default Main