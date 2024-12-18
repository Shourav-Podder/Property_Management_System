"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'


const links = [
    { url: "/login", title: "Home" },
    { url: "/login", title: "Type of House" },
    { url: "/login", title: "About" },
    { url: "/my-profile", title: "My Profile" },
    { url: "/login", title: "Contact" },
    { url: "/login", title: "Login" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);

    useEffect(() => {
        const value = localStorage.getItem('legalEstateUser');
        if (value !== null) {
            setIsAuthenticatedUser(true)
        } else {
            setIsAuthenticatedUser(false)
        }
    }, [])

    return (<div className="h-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 2xl:px-36 text-xl">
        <div className="md:hidden lg:flex xl:justify-center">
            <Link href="/" className="text-sm rounded-md font-semibold flex items-center justify-around" >
                <span className="flex justify-center w-full text-white text-2xl">Dream</span>
                <span className="text-white text-xl">.Property</span>
            </Link>
        </div>

        <div className="flex items-center gap-16">
            <div className={`text-white rounded-md px-4 py-1 flex gap-16`}>
                <Link href='/about'>
                    About
                </Link>

                <Link href='/contact'>
                    Contact
                </Link>



                {
                    isAuthenticatedUser && <Link href='/dashboard'>Dashboard</Link>
                }

                {
                    isAuthenticatedUser ? <p className="hover:cursor-pointer" onClick={() => {
                        localStorage.removeItem('legalEstateUser');
                        router.push('/login')
                        window.location.reload();
                    }}>Logout</p> : <Link href='/login'>
                        Login
                    </Link>
                }

                {
                    isAuthenticatedUser ? <Link href='/my-profile'>
                        My profile
                    </Link> : ''
                }





            </div>


        </div>

        <div className="md:hidden lg:hidden sm:hidden flex">
            <button onClick={() => setOpen(!open)} className="w-10 h-8 flex flex-col justify-between z-50 relative">
                <div className="w-10 h-1 bg-white rounde origin-left"></div>
                <div className="w-10 h-1 bg-white rounded"></div>
                <div className="w-10 h-1 bg-white rounded origin-left"></div>
            </button>

            {
                open && (
                    <div className="absolute top-0 left-0 w-screen h-screen bg-black text-white flex flex-col items-center justify-center gap-8 text-4xl z-40">
                        {
                            links.map((link, index) => {
                                return (
                                    <div key={index}>
                                        {
                                            isAuthenticatedUser ? <p className="hover:cursor-pointer" onClick={() => {
                                                localStorage.removeItem('legalEstateUser');
                                                router.push('/login')
                                            }}>Logout</p> : <Link href={link.url} key={index}>
                                                {link.title}
                                            </Link>
                                        }

                                    </div>
                                )
                            })
                        }

                        {
                            isAuthenticatedUser && <Link href='/dashboard'>Dashboard</Link>
                        }
                    </div>
                )
            }

        </div>

    </div>)
}

export default Navbar;