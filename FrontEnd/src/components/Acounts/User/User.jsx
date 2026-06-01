import { use, useEffect, useRef, useState } from 'react';
import { Cadre } from '../../Global/Cadre';
import { Settings } from 'lucide-react';

import wale  from '../../../assets/wale.png'
import bird  from '../../../assets/bird.png'
import person  from '../../../assets/person.png'
import apple from '../../../assets/apple.png'
import Coffee from '../../../assets/coffee.png'
import test from '../../../assets/test.mp4';
import logo from '../../../assets/KZB_Galerie-removebg-preview.png';
import background from '../../../assets/Gemini_Generated_Image_2xskv22xskv22xsk.png';
import { useAsyncError, useNavigate } from 'react-router-dom';

import bg_user from '../../../assets/bg-user.png'

import './User.css'

export function User({setConnetionSate})
{
    const navigate = useNavigate();

    const [user,setUser] = useState(
        {
            UserName: "KWAME ADESOLA",
            Verification: "V É R I F I É",
            NumOfLikes: "1.2K",
            ProfilImg: { IsImage: true, Path: person }
        }
    );

    const [Favoris,setFavoris] = useState(
        [
            { ArtworkName: "Nuit de Dakar",  ArtistName: "Amara Diallo",  Path: bird,   MediaType: "image" },
            { ArtworkName: "Le Griot",       ArtistName: "Fatou Keita",   Path: apple,  MediaType: "image" },
            { ArtworkName: "Bronze Antique", ArtistName: "Kofi Mensah",   Path: Coffee, MediaType: "image" },
            { ArtworkName: "Tam-tam",        ArtistName: "Yasmine Ndour", Path: wale,   MediaType: "image" }
        ]
    );

    const [ArtistSuivis,setArtistSuivis] = useState(
        [
            { ShortName: "AD", ArtistName: "Amara Diallo",  Place:"Sénégal",       NumOfArtswork: 89,  SubscribeSate: true },
            { ShortName: "FK", ArtistName: "Fatou Keita",   Place:"Côte d'Ivoire", NumOfArtswork: 54,  SubscribeSate: true },
            { ShortName: "KM", ArtistName: "Kofi Mensah",   Place:"Ghana",         NumOfArtswork: 121, SubscribeSate: true },
            { ShortName: "YM", ArtistName: "Yasmine Ndour", Place:"Cameroun",      NumOfArtswork: 36,  SubscribeSate: false }
        ]
    );

    const Stats = ({value,text}) =>
    {
        return (
            <>
                <div className = {` border border-[#695c34] bg-[#0A0806] h-fit pl-[7%] pr-[7%] pt-[1%] pb-[3%] mt-[1%]`}>
                    <p className = {` text-[#c2a659] text-center text-[24px] `}> {value} </p>
                    <p className = {` text-[#9B8E75] text-center text-[13px] `}> {text} </p>
                </div>
            </>
        );
    }

    const Buttons = ({Page,Navto}) =>
    {
        const Onclick = () =>
        {
            navigate(Navto);
        }

        return(
            <>
                <div className={`flex w-full border mb-[3px]  border-[#F5EDD6] pt-[6px] pb-[8px] pl-[12px] pr-[15px] rounded-[7px] hover:cursor-pointer hover:bg-[rgba(43,104,248,0.1)] cursor-pointer  active:w-[98%] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`} 
                    onClick={Onclick} >
                    <p className={` text-white ml-[5px] text-[18px] font-bold`}>{Page}</p>
                </div>
            </>
        );
    }

    const SubSectionArtistSuivis = ({ArtistSuivis}) =>
    {
        
        const CadreArtistSuivis = ({Components,Color},) =>
        {
            const SNbgbr = () =>
            {
                if(Color === 'blue')
                    { return "bg-[#1A1A4A] border pl-[15px] pr-[15px] p-[10px] border-[#282880] text-[#5DADE2]"}
                else if(Color === 'red') 
                    {return "bg-[#4A1A1A] border pl-[11px] pr-[11px] p-[10px]  border-[#602424] text-[#E74C3C]"}
                else if(Color === 'green') 
                    {return "bg-[#1A4A2A] border pl-[11px] pr-[11px]  p-[10px] border-[#1f6c3a] text-[#58D68D]"}
                else
                    {return " bg-[#8B6914]  border pl-[11px] pr-[11px] p-[8px]   border-[rgba(201,168,76,0.35)]"}
            }

            const IsSub = (isSubcribed) =>
            {
                if(isSubcribed) return "ABONNÉ";
                else return "PAS ABONNÉ";
            }

            return(
                <>
                    <div className = {` flex-1 h-[80%]  justify-items-center  rounded-[8px] bg-[#211f1a] border border-[rgba(201,168,76,0.12)] hover:mb-[1%] hover:border-amber-300 cursor-pointer translation-all duration-300`}>
                        <p className = {` p-[5px] text-[30px] rounded-full ${SNbgbr()} mb-[5%] mt-[5%]`}> {Components.ShortName} </p>
                        <p className = {` text-[#f2eee3] `}> {Components.ArtistName} </p>
                        <p className = {` text-[#9B8E75] text-[13px] mb-[3%] `}> {Components.Place + " · " + Components.NumOfArtswork + " oeuvres"} </p>
                        <p className = {` text-[#e8c25a] border-[#e6ae14] border text-[14px] p-[2px] pr-[18px] pl-[18px] rounded-[10px]`}> {IsSub(Components.SubscribeSate)} </p>
                    </div>
                </>
            );
        }

        return (
            <>
                <div className = {` w-[96%] h-[350px] `}>
                    <div className = {`flex  mt-[30px] hover:cursor-pointer `}>
                        <p className = {`text-[#ddb546] pr-[1%]  border-b-3 border-[#8B6914] text-[22px] pb-[8px] `}>MES</p>
                        <p className = {`text-[#F5EDD6] border-b-3 pb-[8px] pr-[1%] border-[#8B6914] text-[22px]`}>ARTISTES</p>
                    </div>
                    <div className = {`rounded-[3px] flex justify-center   bg-[#0e0c0a] w-full rounded-[8px] border border-[rgba(201,168,76,0.12)] h-[71%] mt-[2%]`}>
                        <div className = {` h-full w-[97%] gap-3 border flex items-center`}>  
                            <CadreArtistSuivis Color={""}      Components={ArtistSuivis[0]}/>
                            <CadreArtistSuivis Color={"blue"}  Components={ArtistSuivis[1]}/>
                            <CadreArtistSuivis Color={"red"}   Components={ArtistSuivis[2]}/>
                            <CadreArtistSuivis Color={"green"} Components={ArtistSuivis[3]}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const SubSectionFavoris = ({Favoris}) =>
    {
        
        const CadreFavoris = ({Components}) =>
        {
            const contentRef = useRef(null);
            const onHover = ()=>
            {
                if(Components.MediaType === "video") 
                { { contentRef.current && contentRef.current.play()} }
            }

            const onLeave = ()=>
            {
                if(Components.MediaType === "video" && contentRef.current) 
                { 
                    contentRef.current.currentTime = 0;
                    contentRef.current.pause(); 
                }
            }

            const Media = () =>
            {
                if(Components.MediaType === 'video') 
                {
                    return(
                        <video 
                            ref={contentRef}
                            src={Components.Path} 
                            className='w-full h-full object-cover rounded-t-[8px]'
                            muted
                            loop
                        />
                    );
                }
                else
                {
                    return (
                        <img 
                            ref={contentRef}
                            src={Components.Path} 
                            className='w-full h-full object-cover rounded-t-[8px]'
                        />
                    );
                }
            }

            return(
                <>
                    <div className = {` flex-1 h-[80%] rounded-[8px] bg-[#2d2a25] border border-[rgba(201,168,76,0.12)]  hover:mb-[1%] hover:border-amber-300 cursor-pointer translation-all duration-300 `}>
                        <div className = {` w-full h-[60%] rounded-t-[8px] `} onMouseEnter={onHover}
                        onMouseLeave={onLeave}
                        onClick={(e)=>
                        {
                            e.stopPropagation();
                            OnClick();
                        }} >
                            <Media/>
                        </div>
                        <div className = {` w-full pt-[2%] h-[40%] bg-[#070604] rounded-b-[8px] pl-[4%] `}>
                            <p className = {` text-[#f2eee3] text-[15px] `}> {Components.ArtworkName} </p>
                            <p className = {` text-[#9B8E75] text-[13px] mb-[2%]`}> {"par " +Components.ArtistName} </p>
                            <p className = {` text-[#e8c25a] bg-[rgba(225,173,30,0.1)] border-[#e6ae14] border text-[12px] p-[1px] pr-[14px] pl-[14px] rounded-[10px] w-fit`}> voir </p>
                        </div>
                    </div>
                </>
            );
        }

        return (
            <>
                <div className = {` w-[96%] h-[350px] `}>
                    <div className = {`flex  mt-[30px] hover:cursor-pointer `}>
                        <p className = {`text-[#ddb546] pr-[1%]  border-b-3 border-[#8B6914] text-[22px] pb-[8px] `}>MES</p>
                        <p className = {`text-[#F5EDD6] border-b-3 pb-[8px] pr-[1%] border-[#8B6914] text-[22px]`}>FAVORIS</p>
                    </div>
                    <div className = {`rounded-[3px] flex justify-center   bg-[#0e0c0a] w-full rounded-[8px] border border-[rgba(201,168,76,0.12)] h-[71%] mt-[2%]`}>
                        <div className = {` h-full w-[97%] gap-3  flex items-center`}>  
                            <CadreFavoris Components={Favoris[0]} />
                            <CadreFavoris Components={Favoris[1]} />
                            <CadreFavoris Components={Favoris[2]} />
                            <CadreFavoris Components={Favoris[3]} />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const Discover = () =>
    {
        const Onclick = () =>
        {
            navigate('/gallery');
        }

        return (
            <>
                <div className = {` w-[96%] h-[220px] `}>
                    <div className = {`flex  mt-[30px] hover:cursor-pointer `}>
                        <p className = {`text-[#ddb546] pr-[6px]  border-b-3 border-[#8B6914] text-[22px] pb-[8px] `}>DÉCOUVRIR</p>
                        <p className = {`text-[#F5EDD6] border-b-3 pb-[8px] pr-[1%] border-[#8B6914] text-[22px]`}>DES ARTISTES</p>
                    </div>
                    <div className = {`rounded-[3px]   justify-items-center bg-[#272218] w-full border border-[rgba(201,168,76,0.12)] h-[71%] mt-[2%]`}>
                        <p className={` text-[#9B8E75] text-[27px] mb-[10px] mt-[3%]`}>EXPLOREZ LA GALERIE POUR DÉCOUVRIR DE NOUVEAUX TALENTS</p>                        
                        <p className={` bg-[#8B6914] text-[20px] p-[5px] pl-[40px] pr-[40px] rounded-[10px] font-bold active:p-[4px] active:pl-[38px] active:pr-[38px] cursor-pointer`} onClick={Onclick} >ACCÉDER À LA GALERIE</p>
                    </div>
                </div>
            </>
        );
    }

    const DisplayProfileImage = () =>
    {
        if(user.ProfilImg.IsImage) 
        {
            return (
                <>
                    <img 
                        src={user.ProfilImg.Path} 
                        className='w-full h-full object-cover rounded-full'
                    />
                </>
            );
        }
    }

    return(
        <>

            <div className = {` fixed w-full h-[220px] bg-cover flex border-[#a77c0e] border-b-3`} style={{ backgroundImage: `url(${bg_user}) ` }} >
                <div className = {` h-full w-[10%] `} >
                    <div className = {`bg-[#2d2a25] w-[55%] h-[37%] mt-[60%] rounded-full border-2 border-[#c2a659] ml-[20%]`}>
                        {DisplayProfileImage()}
                    </div>
                </div>
                <div className = {` h-full w-[60%]  `} >
                    <div className = {` mt-[7%] `}>
                        <p className={` text-[#F5EDD6] text-[32px]  `} > {user.UserName} </p>
                        <p className={` text-[#b69742] text-[20px] `} > VISITOR </p>
                    </div>
                    <div className = {`flex gap-3 mt-[2%]`} >
                        <div className = {` flex border-[#C9A84C] border  bg-[rgba(225,173,30,0.1)] rounded-[3px] pr-[18px] pl-[17px] p-[2px] h-fit mt-[8px] `} >
                            <p className={` text-[#b69742]  text-[12px] mr-[10px]`} > ◈ </p>
                            <p className={` text-[#b69742]  text-[12px]   `} > {user.Verification} </p>
                        </div>
                        <p className={` text-white border border-[#F5EDD6] rounded-[5px] text-[17px]  pr-[15px] pl-[15px] pt-[5px] pb-[5px]  bg-[#252424] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer active:pb-[4px] active:pt-[4px] active:pl-[13px] active:pr-[13px] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`} > DÉCONNEXION </p>
                    </div>
                </div>
                <div className = {` pl-[15%] h-full w-[30%] flex gap-4 pt-[8%]`} >
                    <Stats value={47} text={"OEUVRES"} />
                    <Stats value={312} text={"ABONNÉS"} />
                </div>
            </div>

            <div className = {` w-full  h-[100vh] flex`} >
                <div className= {` justify-items-center   bg-[#12100D] border-r border-[rgba(201,168,76,0.12)] w-[13%] h-[calc(100vh-220px)] no-scrollbar overflow-y-scroll mt-[220px] pt-[2%]`} >
                    <Buttons Page={"ACTUALITY"} Navto={'/actuality'}/>
                    <Buttons Page={"GALERIE"} Navto={'/gallery'}/>
                </div>
                <div className= {`justify-items-center border bg-[#0A0806] w-[87%] h-[calc(100vh-220px)] no-scrollbar overflow-y-scroll mt-[220px] `} >
                    <SubSectionFavoris Favoris={Favoris} />
                    <SubSectionArtistSuivis ArtistSuivis={ArtistSuivis}/>      
                    <Discover /> 
                    <div className= {`h-[100px]`} ></div>             
                </div>
            </div>

        </>
    );
}
