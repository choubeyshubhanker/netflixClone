"use client"
import React, { useEffect, useState } from 'react'
import MuiModal from '@mui/material/Modal'
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '@/atoms/modelAtom'
import { Element, Genre } from '@/typings'
import ReactPlayer from 'react-player/lazy'
//   Icons
  import {
    CheckIcon,
    PlusIcon,
    HandThumbUpIcon,
    SpeakerXMarkIcon,
    XMarkIcon,
  } from '@heroicons/react/24/outline'
  import { SpeakerWaveIcon } from '@heroicons/react/24/solid'
  import { FaPlay } from 'react-icons/fa'

const Modal = () => {

    const [showModal, setShowModal] = useRecoilState(modalState)
    const [movie, setMovie] = useRecoilState(movieState)
    const [trailer, setTrailer] = useState('')
    const [cast, setCast] = useState([])
    const [genres, setGenres] = useState<Genre[]>([])
    const [muted, setMuted] = useState(true)
    const [addedToList, setAddedToList] = useState(false)
    const handleClose=()=>{
        setShowModal(false)
    }
    useEffect(() => {
        if (!movie) return
    
        async function fetchMovie() {
          const data = await fetch(
            `https://api.themoviedb.org/3/${
              movie?.media_type === 'tv' ? 'tv' : 'movie'
            }/${movie?.id}?api_key=${
              process.env.NEXT_PUBLIC_API_KEY
            }&language=en-US&append_to_response=videos`
          )
            .then((response) => response.json())
            .catch((err) => console.log(err.message))
    
          if (data?.videos) {
            const index = data.videos.results.findIndex(
              (element: Element) => element.type === 'Trailer'
            )
            setTrailer(data.videos?.results[index]?.key)
            console.log("movie vide===", data)
          }
          if (data?.genres) {
            setGenres(data.genres)
          }
        }
        async function fetchCast() {
            const data = await fetch(
              `https://api.themoviedb.org/3/movie/${
                movie?.id}/credits?api_key=${
                process.env.NEXT_PUBLIC_API_KEY
              }`
            )
              .then((response) => response.json())
              .catch((err) => console.log(err.message))
              console.log("cast=== ", data.cast)
            if (data?.cast) {
              const cast = data.cast.filter(
                (element:Element) => element.known_for_department == "Acting"
              )
              console.log("cast acting=== ", cast)
              setCast(cast)
            }
            // if (data?.genres) {
            //   setGenres(data.genres)
            // }
          }
    
        fetchMovie()
        fetchCast()
      }, [movie])
      console.log("movie=== ",movie)
    
    if(showModal){
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      closeAfterTransition
      // slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      className="!top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
       <Slide in={showModal} direction='up' >
        <Box>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>

              <button className="modalButton" >
                {addedToList ? (
                  <CheckIcon className="h-7 w-7" />
                ) : (
                  <PlusIcon className="h-7 w-7" />
                )}
              </button>

              <button className="modalButton">
                <HandThumbUpIcon className="h-7 w-7" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <SpeakerXMarkIcon className="h-6 w-6" />
              ) : (
                <SpeakerWaveIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                <div className='w-full'>
              <p className="w-5/6">{movie?.overview}</p>
              <div className='mt-10'>
                  <span className="text-[gray]">Cast: </span>
                  {cast?.map((ele:Element)=> (
                    <small key={ele.id}>
                        {ele.name} as <i>{ele.character}, &nbsp;</i>
                    </small>
                  ))}
                </div>
                </div>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(', ')}
                </div>

                <div>
                  <span className="text-[gray]">Original language: </span>
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
        </Box>
      </Slide>
    </MuiModal>
  )}
  else { return }
}

export default Modal