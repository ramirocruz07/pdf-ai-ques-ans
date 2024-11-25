import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DragandDrop from './components/DragandDrop'
import Homepage from './components/homepage'

function App() {


  return (
    // <div className=" bg-gradient-to-r from-slate-500 to-slate-800 w-full h-screen"></div>
  <div className="flex justify-center absolute inset-0 -z-10 h-full w-full items-center  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
    <DragandDrop></DragandDrop>
    {/* <Homepage></Homepage> */}
 </div> 

 


    
  )
}

export default App
