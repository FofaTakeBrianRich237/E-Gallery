import Navbar from '../Global_Component/Navbar.jsx';
import SearchBar from '../Global_Component/searchBar.jsx';

function Gallery() {
  return (
    <div>
      <Navbar Home={false} isConnected={false} />
      <SearchBar />
      {/* ton contenu gallery ici */}
    </div>
  );
}

export default Gallery;