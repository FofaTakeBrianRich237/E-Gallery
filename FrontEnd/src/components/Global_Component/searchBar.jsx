import 'react';
import { Search } from 'lucide-react';

function SearchBar() {
  return (
    <div className="fixed top-[70px] md:top-[99px] right-[-20px] left-0 md:left-auto md:w-[220px] flex items-center justify-center md:justify-end px-4 md:pr-4">
      <div className="relative w-full md:w-auto">
        <span className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search size={20} color="#272421" />
        </span>
        <input type="text" placeholder="Search......" className="searchBar w-full md:w-[200px] pl-[36px] pr-[16px] py-[10px] rounded-b-[20px] border-[2px] border-[#151316] bg-[#818181]/65 text-[10px] font-[Afrik] placeholder-[#272421]"/>
      </div>
    </div>
  );
}
 
export default SearchBar;