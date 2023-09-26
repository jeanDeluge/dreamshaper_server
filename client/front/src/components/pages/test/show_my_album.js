import React from 'react'
import { Card, Button } from 'flowbite-react'
import artist from "../../../data/artist_song.json"
import { Link } from 'react-router-dom'

function Main(){
 
    const music = sessionStorage.getItem("music")
    const image = sessionStorage.getItem("gen_image_file")

    return(
        <>
        <div className='inline-flex h-full'>
            <div>
                <img src={image} />
            </div>
            <div>
                <audio controls>
                    <source src={music} />
                </audio>
            </div>
        </div>
        </>
    )
}

export default Main