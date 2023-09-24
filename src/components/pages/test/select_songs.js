import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../../spinner/Spinner'
import axios from 'axios';
import artist from "../../../data/artist_song.json";

function Main() {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [artistResult, setArtistResult] = useState([]);
  const [music, setMusic] = useState(null);
  const artist_list = artist.artists;
  const id = useParams()["id"];

  const song_list = artist_list[id - 1].song_list;
  const song_id = song_list.length;

  const handleFileChange = (e) => {
    setMusic(e.target.files[0]);
  };

  const sendSong = async () => {

    try {
      if (!music) {
        alert("음악 파일을 선택하세요.");
        return;
      }
      setTimeout(()=>{
        setUploading(true)
      },300)
      

      const formData = new FormData();
      formData.append('music', music);
      formData.append('singer', id)
      await axios.post("http://localhost:8000/get_music", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        const filename = response.data["result"]
        navigate(`/service/${id}/result/${filename}`);
      });
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <div className='relative'>
        <div className={uploading === true ? 'opacity-20' :"" }>
        <img src={artist_list[id - 1].image} width={"300px"} className='m-auto' />
        <ul className="max-w-screen w-5/6 m-10 m-auto my-10 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">

            {song_list.map(e => {
            return (
                <li className="w-full flex justify-between px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className='font-semibold test-lg m-3'>
                    {e.name}
                </div>
                <div>
                    <audio controls className='w-96'>
                    <source src={e.path} type="audio/mp3" />
                    </audio>
                </div>
                </li>
            )
            })}
            <li className="w-full flex justify-between px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className='font-semibold test-lg m-3'>
                새로 음성 입히기
            </div>
            <div>
                <input onChange={handleFileChange} className="block w-96 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept='audio/*' />
            </div>
            <button type="button" onClick={sendSong} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </li>
        </ul>
        </div>
        {
            uploading === true ? <Spinner /> : <></>
        }
        
      </div>

    </>
  )
}

export default Main;
