import Navbar from '../Global_Component/Navbar.jsx';
import SearchBar from '../Global_Component/searchBar.jsx';
import background from "../../assets/fond_galery.png" ;
import arrow from "../../assets/Arrow.png" ;

function Gallery() {
  return (
    <div>
      <Navbar Home={false} isConnected={false} />
      <SearchBar />
      <div className={`absolute inset-0 w-full h-full z-[-1]`} style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}>
      </div>
      <div>
        <img style={{ transform: "rotateY(70deg)" }} className="absolute rotate-[-90deg] bottom-[60px] right-[44%] w-[150px] cursor-pointer" src={arrow} alt="forward"/>
      </div>
      <div>
        <img style={{ transform: "rotateY(250deg)" }} className="absolute rotate-[-90deg] bottom-[10px] right-[44%] w-[150px] cursor-pointer" src={arrow} alt="forward"/>
      </div>
    </div>
  );
}

export default Gallery;