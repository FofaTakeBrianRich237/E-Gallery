import Home from './components/Home/Home.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import { Routes, Route } from 'react-router-dom';
import { ActualityCadres } from './components/Actualities/Actualities';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/actuality" element={<ActualityCadres/>}/>
    </Routes>
  );
}

export default App
