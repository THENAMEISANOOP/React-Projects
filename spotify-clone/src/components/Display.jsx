import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom' 
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { albumsData } from '../assets/assets'

const Display = () => {
  
  const displayref=useRef()
  const location=useLocation();
  // console.log(location)
  const isAlbum=location.pathname.includes("album")
  // console.log(isAlbum)
  const albumId=isAlbum  ? location.pathname.slice(-1) : "" ;
  // console.log(albumId)
  const bgColor=albumsData[Number(albumId)].bgColor;
  console.log(bgColor)

  // bg color added
  useEffect(() => {
    if (displayref.current) {
      displayref.current.style.backgroundImage = isAlbum 
        ? `linear-gradient(${bgColor}, #121212)` 
        : "none"; 
      displayref.current.style.backgroundColor = isAlbum ? "transparent" : "#121212";
    }
  }, [isAlbum, bgColor]);

  return (
    <div ref={displayref} className='w-[100%] m-2  px-6 pt-4  rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
      <Routes>
        <Route path='/' element={<DisplayHome/>}/>
        <Route path='/album/:id' element={<DisplayAlbum/>}/>
      </Routes>
    </div>
  )
}

export default Display
