import React from 'react'
import { useParams } from 'react-router-dom'
import artist from "../../../data/artist_song.json"


function Main(){
    const artist_list = artist.artists
    const id = useParams()["id"]

    const song_list = artist_list[id-1].song_list
    
    return(
        <>
            {song_list}
        </>
    )
}

export default Main