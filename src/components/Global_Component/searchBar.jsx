import 'react';
import { Search } from 'lucide-react';

function SearchBar() {
  return (
    <div className="fixed top-[99px] left-[87%] right-0 flex items-center gap-2 justify-center">
      <p style={{position : "absolute", margin : "0", left : "5px"}}><Search size={20} color="#272421" /></p>
      <input
        type="text"
        placeholder="Search......"
        className="searchBar pl-[27px] px-[20px] py-[10px] rounded-b-[20px] border-[2px] border-[#151316] bg-[#818181]/65 text-[10px] font-[Afrik] placeholder-[#272421]"
      />
    </div>
  );
}
 
export default SearchBar;