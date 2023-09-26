import React from 'react'
import { Card, Button } from 'flowbite-react'
import artist from "../../../data/artist_song.json"
import { Link } from 'react-router-dom'

function ArtistList(){
 
    const artist_list = artist.artists

    return(
        <>
        <div className='inline-flex h-full'>
            {artist_list.map((e, index)=> {
                
                return(
                    <Card
                    key={index}
                    imgSrc={e.image}
                    className='w-[320px] m-10 snap-center'
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <p>
                            {e.name}
                            </p>
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            <p>
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                        </p>
                        <Link to={`/service/${e.id}`}>
                            <Button>
                            <p>Select</p>
                            </Button>
                        </Link>

                    </Card>
                )
            })}
            
        </div>
        </>
    )
}

export default ArtistList