import React from 'react'
import {Outlet} from "react-router-dom"
import Header from './Header'

const LayOut = () => {
  return (
    <>
    <Header/>
    <section className='app'>
        <Outlet/>
    </section>
    </>
  )
}

export default LayOut