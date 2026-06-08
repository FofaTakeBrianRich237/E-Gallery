import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useArtistArtworks } from '../../../services/useApi.jsx'; 
import './User.css';

export function User({ setConnetionState }) {
  const navigate = useNavigate();
  const { user, logout, isArtist } = useAuth(); 

  // Si artiste, charge ses œuvres depuis l'API
  const artistId = user?.id_artist || user?.id || null;
  const { artworks: myWorks, loading: worksLoading } = useArtistArtworks(artistId);

  // ─── Sous-composants ───────────────────────────────────────────────────────
  const Stats = ({ value, text }) => (
    <div className="border border-[#695c34] bg-[#0A0806] h-fit pl-[7%] pr-[7%] pt-[1%] pb-[3%] mt-[1%]">
      <p className="text-[#c2a659] text-center text-[24px]">{value}</p>
      <p className="text-[#9B8E75] text-center text-[13px]">{text}</p>
    </div>
  );

  const NavButton = ({ Page, Navto }) => (
    <div className="flex w-full border mb-[3px] border-[#F5EDD6] pt-[6px] pb-[8px] pl-[12px] pr-[15px] rounded-[7px] hover:cursor-pointer hover:bg-[rgba(43,104,248,0.1)] cursor-pointer active:w-[98%] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100"
      onClick={() => navigate(Navto)}>
      <p className="text-white ml-[5px] text-[18px] font-bold">{Page}</p>
    </div>
  );

  // ─── Section Mes Œuvres (données API) ─────────────────────────────────────
  const SubSectionMyWorks = () => {
    if (!isArtist) return null;
    return (
      <div className="w-[96%] h-[350px]">
        <div className="flex mt-[30px]">
          <p className="text-[#ddb546] pr-[1%] border-b-3 border-[#8B6914] text-[22px] pb-[8px]">MES</p>
          <p className="text-[#F5EDD6] border-b-3 pb-[8px] pr-[1%] border-[#8B6914] text-[22px]">OEUVRES</p>
        </div>
        <div className="rounded-[3px] flex justify-center bg-[#0e0c0a] w-full rounded-[8px] border border-[rgba(201,168,76,0.12)] h-[71%] mt-[2%]">
          <div className="h-full w-[97%] gap-3 flex items-center">
            {worksLoading ? (
              <p className="text-[#9B8E75] text-[13px] ml-[10px]">Chargement...</p>
            ) : myWorks.length === 0 ? (
              <p className="text-[#9B8E75] text-[13px] ml-[10px]">Aucune oeuvre publiée.</p>
            ) : (
              myWorks.slice(0, 4).map((work) => (
                <div key={work.id} className="flex-1 h-[80%] rounded-[8px] bg-[#2d2a25] border border-[rgba(201,168,76,0.12)] hover:mb-[1%] hover:border-amber-300 cursor-pointer transition-all duration-300">
                  <div className="w-full h-[66%] rounded-t-[8px]">
                    <img src={work.ImageUrl} alt={work.nameArt} className="w-full h-full object-cover rounded-t-[8px]" />
                  </div>
                  <div className="w-full pt-[4%] h-[34%] bg-[#070604] rounded-b-[8px] pl-[4%]">
                    <p className="text-[#f2eee3] text-[15px]">{work.nameArt}</p>
                    <p className="text-[#9B8E75] text-[13px]">{work.nbr_likes} likes</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  // ─── Découvrir section ─────────────────────────────────────────────────────
  const Discover = () => (
    <div className="w-[96%] h-[220px]">
      <div className="flex mt-[30px]">
        <p className="text-[#ddb546] pr-[6px] border-b-3 border-[#8B6914] text-[22px] pb-[8px]">DÉCOUVRIR</p>
        <p className="text-[#F5EDD6] border-b-3 pb-[8px] pr-[1%] border-[#8B6914] text-[22px]">DES ARTISTES</p>
      </div>
      <div className="rounded-[3px] justify-items-center bg-[#272218] w-full border border-[rgba(201,168,76,0.12)] h-[71%] mt-[2%]">
        <p className="text-[#9B8E75] text-[27px] mb-[10px] mt-[3%]">EXPLOREZ LA GALERIE POUR DÉCOUVRIR DE NOUVEAUX TALENTS</p>
        <p className="bg-[#8B6914] text-[20px] p-[5px] pl-[40px] pr-[40px] rounded-[10px] font-bold cursor-pointer" onClick={() => navigate('/gallery')}>ACCÉDER À LA GALERIE</p>
      </div>
    </div>
  );

  // ─── Header profil ─────────────────────────────────────────────────────────
  const displayName = user ? `${user.nom?.toUpperCase()} ${user.prenom?.toUpperCase()}` : 'VISITEUR';
  const categorie   = user?.categorie?.toUpperCase() || 'VISITEUR';

  return (
    <>
      {/* Header */}
      <div className="fixed w-full h-[220px] bg-cover flex border-[#a77c0e] border-b-3"
        style={{ background: 'linear-gradient(135deg, #1a1205 0%, #2d2215 100%)' }}>
        <div className="h-full w-[10%]">
          <div className="bg-[#2d2a25] w-[55%] h-[37%] mt-[60%] rounded-full border-2 border-[#c2a659] ml-[20%] flex items-center justify-center">
            {user?.profilUrl
              ? <img src={user.profilUrl} className="w-full h-full object-cover rounded-full" alt="profil" />
              : <p className="text-[#c2a659] text-[24px]">{user ? `${user.nom?.[0]}${user.prenom?.[0]}` : '?'}</p>
            }
          </div>
        </div>
        <div className="h-full w-[60%]">
          <div className="mt-[7%]">
            <p className="text-[#F5EDD6] text-[32px]">{displayName}</p>
            <p className="text-[#b69742] text-[20px]">{categorie}</p>
          </div>
          <div className="flex gap-3 mt-[2%]">
            <div className="flex border-[#C9A84C] border bg-[rgba(225,173,30,0.1)] rounded-[3px] pr-[18px] pl-[17px] p-[2px] h-fit mt-[8px]">
              <p className="text-[#b69742] text-[12px] mr-[10px]">◈</p>
              <p className="text-[#b69742] text-[12px]">V É R I F I É</p>
            </div>
            <p className="text-white border border-[#F5EDD6] rounded-[5px] text-[17px] pr-[15px] pl-[15px] pt-[5px] pb-[5px] bg-[#252424] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer transition-all duration-100"
              onClick={() => { logout(); setConnetionState && setConnetionState(false); navigate('/'); }}>
              DÉCONNEXION
            </p>
          </div>
        </div>
        <div className="pl-[15%] h-full w-[30%] flex gap-4 pt-[8%]">
          {/* Données dynamiques si artiste */}
          <Stats value={user?.nbr_oeuvres ?? myWorks.length ?? 0} text="OEUVRES" />
          <Stats value={user?.nbr_followers ?? 0} text="ABONNÉS" />
        </div>
      </div>

      {/* Body */}
      <div className="w-full h-[100vh] flex">
        <div className="justify-items-center bg-[#12100D] border-r border-[rgba(201,168,76,0.12)] w-[13%] h-[calc(100vh-220px)] no-scrollbar overflow-y-scroll mt-[220px] pt-[2%]">
          <NavButton Page="ACTUALITY" Navto="/actuality" />
          <NavButton Page="GALERIE" Navto="/gallery" />
        </div>
        <div className="justify-items-center border bg-[#0A0806] w-[87%] h-[calc(100vh-220px)] no-scrollbar overflow-y-scroll mt-[220px]">
          <SubSectionMyWorks />
          <Discover />
          <div className="h-[100px]" />
        </div>
      </div>
    </>
  );
}
