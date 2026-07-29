import React from 'react'
import Hero from './Hero'
import Aboutus from './Aboutus'
import ScrollingSection from './ScrollingSection'

const Home = () => {
    return (
        <div>
            <div className="">
                <Hero />
            </div>
            <div className="">
                <Aboutus />
            </div>
            <div className="">
                <ScrollingSection />
            </div>
        </div>
    )
}

export default Home