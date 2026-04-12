import 'react';
import { Search } from 'lucide-react';

function SearchBar() {
  return (
    <div className="fixed top-[99px] left-[87%] right-0 flex items-center gap-2 justify-center">
      <p style={{position : "absolute", margin : "0", left : "3px"}}><Search size={20} color="#272421" /></p>
      <input
        type="text"
        placeholder=" Search......"
        className="searchBar px-[20px] py-[10px] rounded-b-[20px] border-[2px] border-[#151316] bg-[#818181]/65 text-white placeholder-[#272421] "
      />
    </div>
  );
}
 
export default SearchBar;