import { Movie } from '@/typings';
import Image from 'next/image'
import React from 'react';
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '@/atoms/modelAtom'

interface Props {
    movie : Movie
}

const Thumbnail = ({movie}:Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  console.log("movie thumb ", movie)
    return (
        <div
          className="relative h-32 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-40 md:min-w-[280px] md:hover:scale-105"
          
        >
          <div className='h-full flex flex-col'>
            {/* <div className='h-16 w-full '> */}
          <Image
            src={`https://image.tmdb.org/t/p/w500${
              movie.backdrop_path || movie.poster_path
            }`}
            className="rounded-sm object-cover md:rounded h-12"
            layout="fill"
            // width={100}
            // height={150}
            alt="thumnail"
            onClick={() => {
              setCurrentMovie(movie)
              setShowModal(true)
            }}
          />
          </div>
          <div className='h-10 p-2'>
            <h2>{movie.title}</h2>
            <p className='text-xs mt-2'>{movie.overview.slice(0,80)} ...</p>
          </div>
          {/* </div> */}
        </div>
      )
}

export default Thumbnail