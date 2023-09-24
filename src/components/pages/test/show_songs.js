import React from 'react'
import { useParams } from 'react-router-dom'
import artist from "../../../data/artist_song.json"

function Main(){
    const artist_list = artist.artists
    const id = useParams()["id"]
    const song_id = useParams()["song_id"]
    
    const url = `${process.env.REACT_APP_AWS_API}/${id}/${song_id}.wav`

    console.log(url)
    
    return(
        <>
            <img src={artist_list[id-1].image} width={"300px"} className='m-auto'/>
            <div className='max-w-screen w-5/6 m-10 m-auto'>
                <audio controls className='m-auto'>
                    <source src={url} type="audio/mp3"/>
                </audio>
            </div>
        </>
    )
}

export default Main