import React from 'react'
import { Card, Button } from 'flowbite-react'
import artist from "../../../data/artist_song.json"
import { Link } from 'react-router-dom'

function Main(){
 
    const music = sessionStorage.getItem("music")
    const image = sessionStorage.getItem("gen_image_file")

    return(
        <>
        <div className='flex m-auto h-full flex-col'>
            <div>
                <img src="https://picsum.photos/200" />
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