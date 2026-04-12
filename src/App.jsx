import Home from './components/Home/Home.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import {  Cadre } from './components/Global/Cadre';
import { ActualityCadres } from './components/Actualities/Actualities';


import wale  from './assets/wale.png'
import bird  from './assets/bird.png'
import apple from './assets/apple.png'
import Coffee from './assets/coffee.png'
import test from './assets/test.mp4';



function App() {
  return (
   
    <> 
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/actuality" element={<ActualityCadres/>}/>
    </Routes>
  
         {/**demo Cadres starts*/}
          {/* <div className={`flex border-2 w-full h-[300px] gap-[25px] bg-black`}>

            <Cadre 
              Text={"fdxsdfsdfhsdf "} 
              Path={wale} 
              Position={"first"}
              My={`my-[6px]`}
              ContentType={"image"}
              arrowButton={{direction: "left", 
                visibility: false,
                func: ()=>{}}}
            />

            <Cadre 
              Text={"fhsdfhsd"} 
              Path={Coffee}
              My={`my-[6px]`}
              ContentType={"image"}
              arrowButton={{direction: "middle", 
                visibility: false,
                func: ()=>{}}}
            />

            <Cadre 
              Text={"fdxsdfsdfdddddsdf "} 
              Path={bird} 
              My={`my-[6px]`}
              ContentType={"image"}
              arrowButton={{direction: "middle", 
                visibility: false,
                func: ()=>{}}}
            />

            <Cadre 
              Text={"fdxsdfsdfhsdf "} 
              Path={test} 
              My={`my-[6px]`}
              ContentType={"video"}
              arrowButton={{direction: "middle", 
                visibility: false,
                func: ()=>{}}}
            />

            <Cadre 
              Text={"fdxsdfsdfhsdf "} 
              Path={wale} 
              My={`my-[6px]`}
              ContentType={"image"}
              arrowButton={{direction: "middle", 
                visibility: false,
                func: ()=>{}}}
            />

            <Cadre 
              Text={"fhsdfhsd"} 
              Path={Coffee}
              Position={"last"}
              My={`my-[6px]`}
              ContentType={"image"}
              arrowButton={{direction: "right", 
                visibility: false,
                func: ()=>{}}}
            />


          </div> */}

          {/**demo ends*/}

          {/* demo actuality page(not completed))*/}
            <ActualityCadres Artist_type={null}/>
          {/*demo ends */}


    </>
  );
}

export default App
