import Home from './components/Home/Home.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import { Routes, Route } from 'react-router-dom';
import { useState,useEffect } from 'react'
import { Actualities } from './components/Actualities/Actualities.jsx';




import { Artist } from './components/Acounts/Artist/Artist.jsx';
import { AcountForm } from './components/Acounts/acount/acount.jsx';
import { User } from './components/Acounts/User/User.jsx';
import { Admin } from './components/Acounts/Admin/admin.jsx';


function App() {

  const [ConnetionState,setConnectionState] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/")
      .then(res => res.json())
      .then(data => console.log(data))
  }, []);

  return (
    <>
    <Routes>
      {/* <Route path="/" element={<Home connetionState={ConnetionState}/>} /> */}
      <Route path="/" element={<Admin connetionState={ConnetionState}/>} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/actuality" element={<Actualities connetionState={ConnetionState}/>}/>
      {/* <Route path="/account" element={<Acount/>}/> */}
      <Route path="/connect" element={<AcountForm/>}/>
      <Route path="/artist" element={<Artist setConnetionSate={setConnectionState}/>}/>
      <Route path="/visitor" element={<User setConnetionSate={setConnectionState}/>}/>
    </Routes>
    </>
  );
}


export default App
// 