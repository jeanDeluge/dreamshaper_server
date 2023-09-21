import React from 'react'
import { useParams } from 'react-router-dom'
import artist from "../../../data/artist_song.json"

function Main(){
    const artist_list = artist.artists
    const id = useParams()["id"]
    const filename = useParams()["song_id"]
    
    const url = `http://127.0.0.1:8000/singer/${id}/${filename}`
    return(
        <>
            <img src={artist_list[id-1].image} width={"300px"} className='m-auto'/>
            <div className='max-w-screen w-5/6 m-10 m-auto'>
                <audio controls>
                    <source src={url} type="audio/mp3"/>
                </audio>
            </div>
        </>
    )
}

export default Main