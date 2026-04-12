import { User } from 'lucide-react';
import logo from "../../assets/KZB_Galerie-removebg-preview.png";
import { Link } from 'react-router-dom';

function Navbar({Home, isConnected}) {
    return (
        <nav className={`flex justify-between items-center h-[105px] pr-[50px] ${!Home ? "bg-[#EEF0F0] rounded-b-md" : ""}`}>
            <div className="flex items-center">
                <Link to="/" className="bg-transparent border-none"><img className="h-[105px]" src={logo} alt="KZB E-Gallery" /></Link>
                <h1 className="font-[Afrik] text-[18px] text-[#272421]">KZB E-Gallery</h1>
            </div>
            <div className="w-[500px] flex justify-between">
                {!isConnected && (
                    <Link to="/" className="font-[Afrik] text-[18px] text-[#272421] no-underline bg-transparent border-none mx-10 hover:text-[#B07618] hover:underline">Home</Link>
                )}
                <Link to="/gallery" className="font-[Afrik] text-[18px] text-[#272421] no-underline bg-transparent border-none mx-10 hover:text-[#B07618] hover:underline">Gallery</Link>
                <Link to="/actuality" className="font-[Afrik] text-[18px] text-[#272421] no-underline bg-transparent border-none mx-10 hover:text-[#B07618] hover:underline">Actuality</Link>
                {isConnected ? (
                <Link to="/connect" className="font-[Afrik] text-[18px] text-[#272421] no-underline bg-transparent border-none mx-10 hover:text-[#B07618] hover:underline">Connect</Link>
                ) : (
                <Link to="/account" className="rounded-full bg-[#EEF0F0] p-[10px] hover:bg-[#B07618] hover:text-white border-none">
                    <User size={26} color="#272421" />
                </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;