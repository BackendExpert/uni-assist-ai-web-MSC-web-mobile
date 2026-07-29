import React, { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from '../component/Nav/Nav'
import Footer from '../component/Nav/Footer'
import PagesFooter from '../component/Nav/PagesFooter'
import LoginFooter from '../component/Nav/LoginFooter'

const WebSite = () => {
    const location = useLocation();
    return (
        <div className="relative">
            <div className="">
                {
                    location.pathname === '/login' ||
                        location.pathname === '/verify-backupcodes' ||
                        location.pathname === '/verify-otp' ||
                        location.pathname === '/update-password' ||
                        location.pathname === '/forget-password' ?
                        <div className=""></div>
                        :
                        <Nav />
                }
            </div>
            <div className={`
                ${location.pathname === '/login' ||
                    location.pathname === '/verify-backupcodes' ||
                    location.pathname === '/verify-otp' ||
                    location.pathname === '/update-password' ||
                    location.pathname === '/forget-password' ? '' : 'pt-20'}            
            `}>
                <Outlet />
            </div>
            <div className="">
                {location.pathname === "/" ? (
                    <Footer />
                ) : location.pathname === "/login" ? (
                    <LoginFooter />
                ) : (
                    <PagesFooter />
                )}
            </div>
        </div>
    )
}

export default WebSite
