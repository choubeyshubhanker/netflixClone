"use client"
import { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import useAuth from '@/hooks/useAuth';

const Header = () => {
  const { logout } = useAuth()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(()=>{
        const handleScroll = () =>{
            if(window.scrollY>0){
                setIsScrolled(true)
            } else{
                setIsScrolled(false)
            }
        }
        window.addEventListener("scroll", handleScroll)

        return () =>{
            window.removeEventListener("scroll", handleScroll)  
        }
    },[])

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
        <div className='flex items-center space-x-2 md:space-x-10'>
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className='hidden space-x-4 md:flex'>
            <li className='headerLink'>Home</li>
            <li className='headerLink'>TV Shows</li>
            <li className='headerLink'>Movies</li>
            <li className='headerLink'>New & Popular</li>
            <li className='headerLink'>My List</li>
        </ul>
        </div>
        <div className="flex items-center space-x-4 text-sm font-light">
            <MagnifyingGlassIcon className='hidden sm:inline w-6 h-6'/>
            <p className='hidden lg:inline'>Kids</p>
            <BellIcon className='hidden sm:inline w-6 h-6'/>
            {/* <Link href="/account"> */}
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
            onClick={logout}
          />
        {/* </Link> */}
        </div>
    </header>
  )
}

export default Header