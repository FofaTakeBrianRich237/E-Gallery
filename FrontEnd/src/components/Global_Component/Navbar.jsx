import { useState } from 'react';
import { User, Menu, X, Store } from 'lucide-react';
import logo from "../../assets/KZB_Galerie-removebg-preview.png";
import { Link } from 'react-router-dom';

function Navbar({Home, isConnected}) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div style={{position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100}}>
            <nav className={`flex justify-between items-center h-[70px] md:h-[105px] px-4 md:pr-[50px] ${!Home ? "bg-[#EEF0F0] rounded-b-md" : ""}`}>
                {/* Logo + Titre */}
                <div className="flex items-center">
                    <Link to="/" className="bg-transparent border-none">
                        <img className="h-[70px] md:h-[105px]" src={logo} alt="KZB E-Gallery" />
                    </Link>
                    <h1 className="font-[Afrik] text-[15px] md:text-[18px] text-[#272421]">KZB E-Gallery</h1>
                </div>

                <div className='flex'>
                    {/* Menu desktop */}
                    <div className="hidden md:flex items-center gap-2">
                        {!isConnected && (
                            <Link to="/" className="font-[Afrik] text-[18px] text-[#272421] no-underline bg-transparent border-none mx-4 hover:text-[#B07618] hover:underline">Home</Link>
                        )}
                        <Link to="/gallery" className="font-[Afrik] text-[18px] text-[#272421] no-underline bg-transparent border-none mx-4 hover:text-[#B07618] hover:underline">Gallery</Link>
                        <Link to="/actuality" className="font-[Afrik] text-[18px] text-[#272421] no-underline bg-transparent border-none mx-4 hover:text-[#B07618] hover:underline">Actuality</Link>
                        {!isConnected && (
                            <Link to="/connect" className="font-[Afrik] text-[18px] text-[#272421] no-underline bg-transparent border-none mx-4 hover:text-[#B07618] hover:underline">Connect</Link>
                        )}                 
                    </div>
                    
                    {isConnected && (
                        <div className='flex'>
                            <Link to="/account" className="rounded-full bg-[#EEF0F0] p-[10px] hover:bg-[#B07618] hover:text-white border-none">
                                <User size={26} color="#272421" />
                            </Link>
                            <Link to="" className="rounded-full bg-[#EEF0F0] p-[10px] ml-2 hover:bg-[#B07618] hover:text-white border-none">
                                <Store size={26} color="#272421" />
                            </Link>
                        </div>
                    )}

                    {/* Bouton hamburger mobile */}
                    <button className="md:hidden bg-transparent border-none p-2" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={28} color="#272421" /> : <Menu size={28} color="#272421" />}
                    </button>
                </div>  
            </nav>

            {/* Menu mobile déroulant */}
            {menuOpen && (
                <div className={`md:hidden flex flex-col items-start px-6 pb-4 gap-4 ${!Home ? "bg-[#EEF0F0]" : "bg-white"}`}>
                    {!isConnected && (
                        <Link to="/" onClick={() => setMenuOpen(false)} className="font-[Afrik] text-[16px] text-[#272421] no-underline hover:text-[#B07618]">Home</Link>
                    )}
                    <Link to="/gallery" onClick={() => setMenuOpen(false)} className="font-[Afrik] text-[16px] text-[#272421] no-underline hover:text-[#B07618]">Gallery</Link>
                    <Link to="/actuality" onClick={() => setMenuOpen(false)} className="font-[Afrik] text-[16px] text-[#272421] no-underline hover:text-[#B07618]">Actuality</Link>
                    {!isConnected && (
                        <Link to="/connect" onClick={() => setMenuOpen(false)} className="font-[Afrik] text-[16px] text-[#272421] no-underline hover:text-[#B07618]">Connect</Link>
                    )}
                </div>
            )}  
        </div>
    );
}

export default Navbar;