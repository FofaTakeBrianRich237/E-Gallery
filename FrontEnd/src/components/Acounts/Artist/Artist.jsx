import { useRef, useState } from 'react';

import wale  from '../../../assets/wale.png'
import bird  from '../../../assets/bird.png'
import apple from '../../../assets/apple.png'
import Coffee from '../../../assets/coffee.png'
import person  from '../../../assets/person.png'
import bg_user from '../../../assets/bg-user.png'
import { useNavigate } from 'react-router-dom';


export function Artist({setConnetionSate})
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

    const [Works,setWorks] = useState(
        [
            { ArtworkName: "Nuit de Dakar",  Date: "10/05/2026", Path: apple,   MediaType: "image" },
            { ArtworkName: "Le Griot",       Date: "10/05/2026", Path: Coffee,   MediaType: "image" },
            { ArtworkName: "Bronze Antique", Date: "10/05/2026", Path: bird,   MediaType: "image" },
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
    // className = {``}
    // setConnetionSate(true);

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

    const Buttons = ({Page,Navto,Nav}) =>
    {
        const Onclick = () =>
        {
            if(Nav) {navigate(Navto);}
        }

        return(
            <>
                <div className={`flex w-full border mb-[3px]  border-[#f3f0e9] pt-[6px] pb-[8px] pl-[12px] pr-[15px] rounded-[7px] hover:cursor-pointer hover:bg-[rgba(43,104,248,0.1)] cursor-pointer  active:w-[98%] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`}
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
                        <p className = {`text-[#F5EDD6] border-b-3 pb-[8px] pr-[1%] border-[#8B6914] text-[22px]`}>ARTISTS SUIVIS</p>
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
                            className='w-full h-full object-cover '
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
                            className='w-full h-full object-cover'
                        />
                    );
                }
            }

            return(
                <>
                    <div className = {` flex-1 h-[80%] rounded-[8px] bg-[#2d2a25] border border-[rgba(201,168,76,0.12)]  hover:mb-[1%] hover:border-amber-300 cursor-pointer translation-all duration-300 `}>
                        <div className = {` w-full h-[66%] rounded-t-[8px] `} onMouseEnter={onHover}
                        onMouseLeave={onLeave}
                        onClick={(e)=>
                        {
                            e.stopPropagation();
                            OnClick();
                        }} >
                            <Media/>
                        </div>
                        <div className = {` w-full pt-[4%] h-[34%] bg-[#070604] rounded-b-[8px] pl-[4%] `}>
                            <p className = {` text-[#f2eee3] text-[15px] `}> {Components.ArtworkName} </p>
                            <p className = {` text-[#9B8E75] text-[13px] `}> {"par " +Components.ArtistName} </p>
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

    const SubSectionMyWorks = ({Works}) =>
    {
        const CadreAddWorks = () =>
        {
            return(
                <>
                    <div className = {` flex-1 h-[80%] rounded-[8px] justify-items-center  bg-[#2d2a25] border-dashed border-2 border-[rgba(201,168,76,0.12)]  hover:mb-[1%] hover:border-amber-300 cursor-pointer translation-all duration-300 `}>
                        <p className = {`border-3 border-[#c2a659] text-[#c2a659] rounded-full mb-[2%] p-[7px] pl-[20px] pr-[20px] text-[27px] mt-[15%]`}>+</p>
                        <p className = {`text-[#b6963f] text-[12px]`}>AJOUT D'OEUVRE</p>
                    </div>
                </>
            );
        }

        const CadreWorks = ({Components}) =>
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
                            className='w-full h-full object-cover '
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
                            className='w-full h-full object-cover'
                        />
                    );
                }
            }

            return(
                <>
                    <div className = {` flex-1 h-[80%] rounded-[8px] bg-[#2d2a25] border border-[rgba(201,168,76,0.12)]  hover:mb-[1%] hover:border-amber-300 cursor-pointer translation-all duration-300 `}>
                        <div className = {` w-full h-[66%] rounded-t-[8px] `} onMouseEnter={onHover}
                        onMouseLeave={onLeave}
                        onClick={(e)=>
                        {
                            e.stopPropagation();
                            OnClick();
                        }}>
                            <Media/>
                        </div>
                        <div className = {` w-full pt-[4%] h-[34%] bg-[#070604] rounded-b-[8px] pl-[4%] `}>
                            <p className = {` text-[#f2eee3] text-[15px] `}> {Components.ArtworkName} </p>
                            <p className = {` text-[#9B8E75] text-[13px] `}> {Components.Date} </p>
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
                        <p className = {`text-[#F5EDD6] border-b-3 pb-[8px] pr-[1%] border-[#8B6914] text-[22px]`}>OEUVRES</p>
                    </div>
                    <div className = {`rounded-[3px] flex justify-center   bg-[#0e0c0a] w-full rounded-[8px] border border-[rgba(201,168,76,0.12)] h-[71%] mt-[2%]`}>
                        <div className = {` h-full w-[97%] gap-3  flex items-center`}>  
                            <CadreAddWorks/>
                            <CadreWorks Components={Works[0]}/>
                            <CadreWorks Components={Works[1]}/>
                            <CadreWorks Components={Works[2]}/>
                        </div>
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

            <div className = {` fixed w-full h-[250px] bg-cover flex`} style={{ backgroundImage: `url(${bg_user})` }} >
                <div className = {` h-full w-[10%]  `} >
                    <div className = {`bg-[#2d2a25] w-[60%] h-[37%] mt-[75%] rounded-full border-2 border-[#c2a659] ml-[20%]`}>
                        {DisplayProfileImage()}
                    </div>
                </div>
                <div className = {` h-full w-[60%]  `} >
                    <div className = {` mt-[10%] `}>
                        <p className={` text-[#F5EDD6] text-[32px]  `} > {user.UserName} </p>
                        <p className={` text-[#b69742] text-[20px] `} > ARTISTE </p>
                    </div>
                    <div className = {`flex gap-3 mt-[2%]`} >
                        <div className = {` flex border-[#C9A84C] border  bg-[rgba(225,173,30,0.1)] rounded-[3px] pr-[18px] pl-[17px] p-[2px] h-fit mt-[8px] `} >
                            <p className={` text-[#b69742]  text-[12px] mr-[10px]`} > ◈ </p>
                            <p className={` text-[#b69742]  text-[12px]   `} > {user.Verification} </p>
                        </div>
                        <p className={` text-white border border-white rounded-[5px] text-[17px]  pr-[15px] pl-[15px] pt-[5px] pb-[5px]  bg-[#252424] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer active:pb-[4px] active:pt-[4px] active:pl-[13px] active:pr-[13px] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`} > DÉCONNEXION </p>
                    </div>
                </div>
                <div className = {` pl-[5%] h-full w-[30%] flex gap-4 pt-[10%]`} >
                    <Stats value={47} text={"OEUVRES"} />
                    <Stats value={312} text={"ABONNÉS"} />

                    <div className = {` border-3 border-[#c2a659] h-fit bg-[#0A0806] pl-[5%] pr-[5%] pt-[2%] pb-[1%] `}>
                        <p className = {` text-[#ad8411] text-center text-[13px] `}>LIKES</p>
                        <p className = {` text-[#c2a659] text-center text-[27px]`}> {user.NumOfLikes} </p>
                    </div>
                </div>
            </div>

            <div className = {` w-full  h-[100vh] flex`} >
                <div className= {` justify-items-center   bg-[#12100D] border-r border-[rgba(201,168,76,0.12)] w-[13%] h-[calc(100vh-250px)] no-scrollbar overflow-y-scroll mt-[250px] pt-[2%]`} >
                    <Buttons Page={"ACTUALITY"} Navto={'/actuality'} Nav={true}/>
                    <Buttons Page={"GALERIE"} Navto={'/gallery'} Nav={true}/>
                    <Buttons Page={"STATISTIQUE"} Nav={false}/>
                    <Buttons Page={"PARAMÈTRES"} Nav={false}/>
                    <div className={`flex-col mt-[15%] w-[88%] border mb-[3px]  border-[#f3f0e9] pt-[10px] pb-[12px] pl-[12px] pr-[15px] rounded-[7px] hover:cursor-pointer hover:bg-[rgba(43,104,248,0.1)]   active:pt-[8px] active:pb-[10px] active:w-[85%] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`}>
                        <p className={` text-white ml-[5px] text-[18px] text-center font-bold`}>UPDATE</p>
                        <p className={` text-white ml-[5px] text-[18px] text-center font-bold`}>ACTUALITY</p>
                    </div>
                </div>
                <div className= {`justify-items-center border bg-[#0A0806] w-[87%] h-[calc(100vh-250px)] no-scrollbar overflow-y-scroll mt-[250px] `} >
                    <SubSectionMyWorks Works={Works}/>
                    <SubSectionFavoris Favoris={Favoris} />
                    <SubSectionArtistSuivis ArtistSuivis={ArtistSuivis}/>                    
                </div>
            </div>

        </>
    );
}


