import { useState, useEffect, useRef } from 'react'
import './App.css'
import {withDevCycleProvider, useIsDevCycleInitialized, useDevCycleClient, useVariableValue} from '@devcycle/react-client-sdk'; 
import {motion} from 'framer-motion'; 
import * as THREE from 'three'; 
import $ from 'jquery'

function Loading(){
  return(
    <div className="fixed w-[100%] h-[100vh] m-auto p-[0] flex flex-col align-middle justify-center text-center ">
      <div className="flex flex-row align-middle justify-center text-center w-[100%] h-[fit-content] m-0 p-[0] relative ">
        <h1 className="text-3xl text-white">Devcycle still loading...</h1>
      </div>
    </div>
  )
}
function AddWhack(){ 
  const items = document.getElementsByClassName("items"); 
  
  const client = useDevCycleClient()
  let start_game = client?.variable("start-game", false).value
  let counter = client?.variable("counter", 0).value
  let random = client?.variable("random", Math.floor(Math.random() * items.length + 0)).value

  useEffect(() => {
    document.getElementById("points").innerText = counter
    document.getElementById("start").addEventListener("click", (e) => {
      start_game = client?.variable("start-game", true).value; 
      if(start_game === true){
        const obj = setInterval(() => {
          items[random].removeAttribute("id")
          random = client?.variable("random", Math.floor(Math.random() * items.length + 0)).value
          items[random].setAttribute("id", "mole"); 
          let target = false
          document.getElementById("mole").addEventListener("click", (e) => {
            if(target === false){
              counter += 1;
              document.getElementById("points").innerText = counter
              target = true; 
            }
          })
        }, 1000)
      }
    })
  })
  return(
    <div className="fixed w-[100%] h-[100%] m-auto p-[0] flex flex-col align-middle justify-center text-center ">
      <div className="relative w-[100%] h-[90%] m-auto p-[0] grid grid-cols-5 grid-rows-5 gap-[10px] ">
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
        <div className="items"></div>
      </div>
      <motion.nav className="relative w-[100%] h-[10%] m-auto p-[0] bg-transparent flex flex-row align-middle justify-center ">
        <ul className="flex flex-row align-middle justify-evenly text-center min-h-[100%] min-w-[100%] ">
          <div className="w-[15em] h-[100%] m-auto p-[0] relative flex flex-col align-middle justify-center text-center ">
            <h1 className="text-3xl text-white" id="points"></h1>
          </div>
          <motion.button id="start" initial={{scale: 1}} whileHover={{scale: 0.9}} whileTap={{scale: 1.1}} className="w-[15em] m-auto p-[0] h-[100%] text-3xl text-white relative flex flex-row align-middle justify-center text-center ">
            <div className="flex flex-row align-middle justify-center text-center w-[100%] h-[fit-content] m-auto p-[0] ">
              <h1 className="text-3xl text-white cursor-pointer underline">Start Whack-a-mole</h1>
            </div>
          </motion.button>
        </ul>
      </motion.nav> 
  </div>
  )
}
function App(){
  const dev = useIsDevCycleInitialized(); 
  const value = useDevCycleClient()
  if(!dev){
    return <Loading></Loading>
  }else{
    return(
      <div className="flex flex-col align-middle justify-center text-center w-[100%] h-[100%] m-auto p-[0] fixed ">
        <AddWhack></AddWhack>
      </div>
    ) 
  }
}
export default withDevCycleProvider({sdkKey: ''})(App)