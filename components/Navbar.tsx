import { useCallback, useEffect, useState, useRef } from "react"
import { BsSearch, BsBell } from "react-icons/bs"
import { FaCaretDown } from 'react-icons/fa';


import NavbarItem from "./NavbarItem"
import MobileMenu from "./MobileMenu"
import AccountMenu from "./AccountMenu";
import { useRouter } from "next/router";

const TOP_OFFSET = 66;

export default function Navbar() {

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const openHover = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsHovered(true);
    }, []);

    const scheduleCloseHover = useCallback(() => {
    closeTimer.current = setTimeout(() => setIsHovered(false), 150);
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, []);
    // const toggleAccountMenu = useCallback(() => {
    //     setShowAccountMenu((current) => !current);
    // }, []);

    const isOpen = showAccountMenu || isHovered;

    return (
       <nav className="w-full fixed z-40">
            <div className={`px-4 md:px-16 py-2 md:py-4 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-100': ''}`}>
                <img className="h-3.5 lg:h-7 cursor-pointer" src="/images/logo.png" alt="Logo" onClick={() => router.push('/')}/>
                <div className="flex-row ml-8 gap-7 hidden lg:flex"> 

                    <NavbarItem label="Home" url="/"/>
                    <NavbarItem label="Shows"/>
                    <NavbarItem label="Movies"/>
                    <NavbarItem label="Games"/>
                    <NavbarItem label="New & Popular"/>
                    <NavbarItem label="My List"/>
                    <NavbarItem label="Browse by languages"/>
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-5 cursor-pointer relative">
                    <p className="text-white text-xs">Browse</p>
                    <FaCaretDown  className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}/>
                    <MobileMenu visible={showMobileMenu}/> 
                </div>

                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch size={24}/>
                    </div>
                    <div className="hidden lg:flex">
                        <NavbarItem label="Kids"/>
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell size={24}/>
                    </div>

                    <div className="flex flex-row items-center gap-2 cursor-pointer relative"
                    onMouseEnter={openHover}
                    onMouseLeave={scheduleCloseHover}
                    // onClick={toggleAccountMenu}
                    >
                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-md overflow-hidden">
                            <img src="/images/default-blue.png" alt="Profile" />
                        </div>
                        <FaCaretDown className={`text-white transition hidden lg:flex ${isOpen  ? 'rotate-180' : 'rotate-0'}`}/>
                        <AccountMenu visible={isOpen}/>
                    </div>

                </div>
            </div>
       </nav>
    )
}
