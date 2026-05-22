import { useState } from 'react';
import Navbar from '../Global_Component/Navbar.jsx';
import SearchBar from '../Global_Component/searchBar.jsx';
import background from "../../assets/fond_galery.png" ;
import arrow from "../../assets/Arrow.png" ;

function Gallery() {
  const [forward, setForward] = useState(false);
  const [backward, setBackward] = useState(false);

  return (
    <div>
      <Navbar Home={false} isConnected={false} />
      <SearchBar />
      <div className={`absolute inset-0 w-full h-full z-[-1]`} style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}>
      </div>
      <div className="">
        <div>
          <img src="" alt="" />
        </div>
      </div>
      <div className="relative top-[550px] left-[49%] w-[90px] h-[50px] flex items-center justify-center rounded-lg cursor-pointer
                transition-all duration-300 hover:bg-[#9a999980] hover:scale-105"
          style={{ background: "#6a696900", perspective: "800px" }}>
        <img 
          style={{ transform: "rotateY(70deg)" }} 
          className="absolute rotate-[-90deg] w-[150px]" 
          src={arrow} 
          alt="forward"
        />
      </div>
      <div className="relative top-[560px] left-[49%] w-[90px] h-[50px] flex items-center justify-center rounded-lg cursor-pointer
                      transition-all duration-300 hover:bg-[#9a999980] hover:scale-105"
          style={{ background: "#6a696907", perspective: "800px" }}>
        <img 
          style={{ transform: "rotateY(250deg)" }} 
          className="absolute rotate-[-90deg] w-[150px]" 
          src={arrow} 
          alt="forward"
        />
      </div>

    </div>
  );
}

export default Gallery;
