import { useEffect, useRef, useState } from 'react';
import { Share } from 'lucide-react';
import { MessageCircleMore } from 'lucide-react';
import { HeartPlus } from 'lucide-react';

import Navbar from '../Global_Component/Navbar';

import wale  from '../../assets/wale.png'
import bird  from '../../assets/bird.png'
import apple from '../../assets/apple.png'
import Coffee from '../../assets/coffee.png'
import test from '../../assets/test.mp4';

import './Actualities.css'

function CadreExpo({ShortName, Name,Time,Place,ExpoDate,Description,ExpoName,LikesNum,CommentsNum,PathAndType}) 
{
    //className={``}
    const contentRef = useRef(null);
    const onHover = ()=>
    {
        if(PathAndType.type === "video") 
        { { contentRef.current && contentRef.current.play()} }
    }

    const onLeave = ()=>
    {
        if(PathAndType.type === "video" && contentRef.current) 
        { 
            contentRef.current.currentTime = 0;
            contentRef.current.pause(); 
        }
    }

    const Media = () =>
    {
        if(PathAndType.type === 'video') 
        {
            return(
                <video 
                    ref={contentRef}
                    src={PathAndType.path} 
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
                    src={PathAndType.path} 
                    className='w-full h-full object-cover'
                />
            );
        }
    }
    return (
        <>
            <div className={`border border-[#4e4836] w-[95%]  aspect-[15/6] mb-[10px] mt-[20px] hover:border-[#786a43] transition-all duration-100`} >
                <div className={`  w-full h-[20%] bg-[#2E2820] flex`}>
                    <div className={` justify-items-center w-[7%]`}>
                        <p className={` border mt-[20%] border-[rgba(201,168,76,0.35)] p-[5px] pl-[7px] pr-[7px]  rounded-full text-[27px] text-[#8B6914]`}>{ShortName}</p>
                    </div>
                    <div className={` w-[78%]`}>
                        <p className={`text-[#F5EDD6] text-[20px] mt-[2%]`}>{Name}</p>
                        <p className={`text-[#9B8E75] text-[15px]`}>{Time+ " · " + Place}</p>
                    </div>
                    <div className={`  w-[15%] justify-items-center `}>
                        <p className={`border text-[#5DADE2] text-[15px] pr-[10px] pl-[10px] mt-[18%] `}>EXPOSITION</p>
                    </div>
                </div>
                <div className={`  h-[68%]`}>
                    <div className={` w-full h-[75%]`} onMouseEnter={onHover}
                        onMouseLeave={onLeave}
                        onClick={(e)=>
                        {
                            e.stopPropagation();
                            OnClick();
                        }}>
                        <Media/>
                    </div>
                    <div className={`w-full h-[25%] bg-[#2E2820] pl-[20px] pt-[18px]`}>
                        <p className={`text-[#E8D9B5] text-[16px]  `}>{"Exposition : << " + ExpoName+"  >> --- "+ExpoDate}</p>
                        <p className={`text-[#9B8E75] text-[14px]`}>{Description}</p>
                    </div>
                </div>
                <div className={` border-t border-[rgba(201,168,76,0.12)] w-full h-[12%] bg-[#2E2820] flex`}>
                    <div className={` h-full  w-[85%] flex items-center`} >
                        <div className={`flex border border-white ml-[20px] mr-[20px] pt-[5px] pb-[5px] pl-[15px] pr-[15px] rounded-[7px] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer active:pb-[4px] active:pt-[4px] active:pl-[13px] active:pr-[13px] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`} >
                            <HeartPlus color='white'/>
                            <p className={`text-white ml-[5px]`}>{LikesNum + ' Likes'}</p>
                        </div>
                        <div className={`flex border border-white mr-[20px] pt-[5px] pb-[5px] pl-[15px] pr-[15px] rounded-[7px] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer active:pb-[4px] active:pt-[4px] active:pl-[13px] active:pr-[13px] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`}>
                            <MessageCircleMore color='white'/>
                            <p className={`text-white ml-[5px]`}>{CommentsNum + ' Commentaires'}</p>
                        </div>
                        <div className={`flex border border-white pt-[5px] pb-[5px] pl-[15px] pr-[15px] rounded-[7px] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer active:pb-[4px] active:pt-[4px] active:pl-[13px] active:pr-[13px] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`}>
                            <Share color='white'/>
                            <p className={`text-white ml-[5px]`}>Partager</p>
                        </div>
                    </div>
                    <div className={` h-full w-[15%] flex items-center justify-center hover:cursor-pointer`}>
                            <p className={`bg-[#8B6914] text-[13px] pt-[4px] rounded-[15px] pb-[4px] pl-[20px] pr-[20px] active:pl-[18px] active:pr-[18px] active:pt-[3px] active:pb-[3px] `}>Voir L'Exposition</p>
                    </div>
                </div>
            </div>
        </>
    );
}

function CadreActu({ShortName, Name,Time,Place,ActuName,Description,LikesNum,CommentsNum})
{
    return(
        <>
            <div className={`border border-[#4e4836] w-[95%]  aspect-[15/3] mb-[10px] mt-[20px] hover:border-[#786a43] transition-all duration-100`}>
                <div className={`  w-full h-[35%] bg-[#2E2820] flex border-b border-b-[rgba(201,168,76,0.12)]`}>
                    <div className={` justify-items-center w-[7%]`}>
                        <p className={` mt-[20%] p-[5px] pl-[7px] pr-[7px]  rounded-full text-[27px] bg-[#1A1A4A] border border-[#282880] text-[#5DADE2]`}>{ShortName}</p>
                    </div>
                    <div className={` w-[78%]`}>
                        <p className={`text-[#F5EDD6] text-[20px] mt-[2%]`}>{Name}</p>
                        <p className={`text-[#9B8E75] text-[15px]`}>{Time+ " · " + Place}</p>
                    </div>
                    <div className={`  w-[15%] justify-items-center `}>
                        <p className={`border text-[#58D68D] text-[15px] pr-[10px] pl-[10px] mt-[18%] `}>ACTUALITÉ</p>
                    </div>
                </div>
                <div className={`w-full h-[35%] bg-[#2E2820] pl-[20px] pt-[18px]`}>
                    <p className={`text-[#E8D9B5] text-[16px]  `}>{ActuName}</p>
                    <p className={`text-[#9B8E75] text-[14px]`}>{Description}</p>
                </div>
                <div className={` border-t border-[rgba(201,168,76,0.12)] w-full h-[30%] bg-[#2E2820] flex`}>
                    <div className={` h-full  w-[85%] flex items-center`} >
                        <div className={`flex border border-white ml-[20px] mr-[20px] pt-[5px] pb-[5px] pl-[15px] pr-[15px] rounded-[7px] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer active:pb-[4px] active:pt-[4px] active:pl-[13px] active:pr-[13px] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`} >
                            <HeartPlus color='white'/>
                            <p className={`text-white ml-[5px]`}>{LikesNum + ' Likes'}</p>
                        </div>
                        <div className={`flex border border-white mr-[20px] pt-[5px] pb-[5px] pl-[15px] pr-[15px] rounded-[7px] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer active:pb-[4px] active:pt-[4px] active:pl-[13px] active:pr-[13px] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`}>
                            <MessageCircleMore color='white'/>
                            <p className={`text-white ml-[5px]`}>{CommentsNum + ' Commentaires'}</p>
                        </div>
                        <div className={`flex border border-white pt-[5px] pb-[5px] pl-[15px] pr-[15px] rounded-[7px] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer active:pb-[4px] active:pt-[4px] active:pl-[13px] active:pr-[13px] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`}>
                            <Share color='white'/>
                            <p className={`text-white ml-[5px]`}>Partager</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function CadreVente({ShortName, Name,Time,Place,Description,ArtWorkName,LikesNum,CommentsNum,PathAndType,Prices})
{
    //className={``}
    const contentRef = useRef(null);
    const onHover = ()=>
    {
        if(PathAndType.type === "video") 
        { { contentRef.current && contentRef.current.play()} }
    }

    const onLeave = ()=>
    {
        if(PathAndType.type === "video" && contentRef.current) 
        { 
            contentRef.current.currentTime = 0;
            contentRef.current.pause(); 
        }
    }

    const Media = () =>
    {
        if(PathAndType.type === 'video') 
        {
            return(
                <video 
                    ref={contentRef}
                    src={PathAndType.path} 
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
                    src={PathAndType.path} 
                    className='w-full h-full object-cover'
                />
            );
        }
    }

    return (
        <>
            <div className={`border border-[#4e4836] w-[95%]  aspect-[15/5.5] mb-[10px] mt-[20px] hover:border-[#786a43] transition-all duration-100`} >
                <div className={`  w-full h-[19%] bg-[#2E2820] flex border-b border-b-[rgba(201,168,76,0.12)]`}>
                    <div className={` justify-items-center w-[7%]`}>
                        <p className={` mt-[15%]  p-[5px] pl-[7px] pr-[7px] bg-[#1A4A2A] border border-[#1f6c3a]  rounded-full text-[27px]   text-[#58D68D]`}>{ShortName}</p>
                    </div>
                    <div className={` w-[78%]`}>
                        <p className={`text-[#F5EDD6] text-[20px] mt-[1%]`}>{Name}</p>
                        <p className={`text-[#9B8E75] text-[15px]`}>{Time+ " · " + Place}</p>
                    </div>
                    <div className={`  w-[15%] justify-items-center `}>
                        <p className={`border text-[#C9A84C] text-[15px] pr-[10px] pl-[10px] ml-[10%] mt-[15%] `}>VENTE</p>
                    </div>
                </div>
                <div className={`  h-[64%] flex-col `}>
                    <div className={`w-full h-[25%] bg-[#2E2820] pl-[20px] pt-[10px]`}>
                        <p className={`text-[#E8D9B5] text-[16px]  `}>{"Nouvelle œuvre disponible : << " + ArtWorkName+"  >>"}</p>
                        <p className={`text-[#9B8E75] text-[14px]`}>{Description}</p>
                    </div>
                    <div className={`w-full h-full flex items-center  bg-[#221E17] `}>
                        <div className={` w-[97%] mb-[6%] bg-[#1C1914] gap-5 mx-auto border border-[rgba(201,168,76,0.12)] h-[68%] flex`} >
                            <div className={`bg-[#2E2820] ml-[1%] my-auto flex-1 h-[90%]`} onMouseEnter={onHover}
                            onMouseLeave={onLeave}
                            onClick={(e)=>
                            {
                                e.stopPropagation();
                                OnClick();
                            }}>
                                <Media/>
                            </div>
                            <div className={`flex-5 h-full flex items-center `}>
                                <div className={``}>
                                    <p className={`text-[#E8D9B5] mb-[5%] `}>{ArtWorkName}</p>
                                    <p className={`text-[#C9A84C] text-[25px]`}>{Prices + ' FCFA'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={` border-t border-[rgba(201,168,76,0.12)] w-full h-[18%] bg-[#2E2820] flex`}>
                    <div className={` h-full  w-[85%] flex items-center`} >
                        <div className={`flex border border-white ml-[20px] mr-[20px] pt-[5px] pb-[5px] pl-[15px] pr-[15px] rounded-[7px] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer active:pb-[4px] active:pt-[4px] active:pl-[13px] active:pr-[13px] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`} >
                            <HeartPlus color='white'/>
                            <p className={`text-white ml-[5px]`}>{LikesNum + ' Likes'}</p>
                        </div>
                        <div className={`flex border border-white mr-[20px] pt-[5px] pb-[5px] pl-[15px] pr-[15px] rounded-[7px] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer active:pb-[4px] active:pt-[4px] active:pl-[13px] active:pr-[13px] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`}>
                            <MessageCircleMore color='white'/>
                            <p className={`text-white ml-[5px]`}>{CommentsNum + ' Commentaires'}</p>
                        </div>
                    </div>
                    <div className={` h-full w-[15%] flex items-center justify-center`}>
                        <p className={`border border-[#C9A84C] text-[#C9A84C] text-[13px] pt-[4px] rounded-[12px] pb-[4px] pl-[20px] pr-[20px] active:pr-[18px] active:pl-[18px] active:pt-[3px] hover:cursor-pointer`}>CONTACTER</p>
                    </div>
                </div>
            </div>
        </>
    );
}


function TopArtist({Name,ShortName,ArtworksNum,SubscribersNum,Color})
{

    const SNbgbr = () =>
    {
        if(Color === 'blue')
            { return "bg-[#1A1A4A] border-[#282880] text-[#5DADE2]"}
        else if(Color === 'red') 
            {return "bg-[#4A1A1A] border-[#602424] text-[#E74C3C]"}
        else if(Color === 'green') 
            {return "bg-[#1A4A2A] border-[#1f6c3a] text-[#58D68D]"}
        else
            {return "text-[#8B6914] border-[rgba(201,168,76,0.35)]"}
    }

    return(
        <>
            <div className={`w-[90%] h-[25%] border-b  border-[rgba(201,168,76,0.12)] flex`}>
                <div className={` h-full justify-items-center   w-[25%]`}>
                    <p className={`border text-[13px] ${SNbgbr()} p-[17%] pl-[19%] pr-[19%] rounded-full mt-[22%]`}>{ShortName}</p>
                </div>
                <div className={` h-full  w-[75%]`}>
                    <p className={`text-[#F5EDD6] text-[14px] mt-[7%] hover:text-[#C9A84C] cursor-pointer`}>{Name}</p>
                    <p className={`text-[#9B8E75] text-[12px] `}>{ArtworksNum +" oeuvres" + ' · ' + SubscribersNum + " abonnés"}</p>
                </div>
            </div>
        </>
    );
}

function TopExpo({ExpoName,Duration,State,ArtworksNum})
{
    const Bg = () =>
    {
        if(State === 'À VENIR')
            { return 'border-[#C9A84C] bg-[#8B6914] text-[#C9A84C]'; }
        else 
            { return 'bg-[#1A4A2A] border-[#1f6c3a] text-[#58D68D]'; }
    }

    return (
        <>
            <div className={`  mb-[4%] border border-[rgba(201,168,76,0.12)] pl-[5%] bg-[#1C1914]  w-[90%] h-[30%]`}>
                <div className={`w-full h-[55%] pt-[3%]`}>
                    <p className={`text-[#F5EDD6] text-[14px]`}> {ExpoName} </p>
                    <p className={`text-[#9B8E75] text-[12px]`}> {Duration} </p>
                </div>
                <div className={` w-full h-[45%] flex pt-[3%]`}>
                    <div className={`   w-[60%] `}> 
                        <p className={`border ${Bg()} inline text-[12px] p-[2%] pl-[7%] pr-[7%]`}> {State} </p>
                    </div>
                    <div className={` w-[40%] `}> 
                        <p className={`text-[#C9A84C] text-[13px]`}>{ArtworksNum + ' oeuvres'}</p> 
                    </div>
                </div>
            </div>
        </>
    );
}

function FilterButton({Criterial})
{
    return(
        <>
            <div className={`flex w-full border mb-[4%]   border-[#f3f0e9] pt-[5px] pb-[7px] pl-[12px] pr-[15px] rounded-[7px] hover:cursor-pointer bg-[rgba(43,104,248,0.1)] cursor-pointer active:pb-[6px] active:pt-[4px] active:pl-[10px] active:pr-[13px] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`}>
                <p className={` text-white ml-[5px]`}>{Criterial}</p>
            </div>
        </>
    );
}

export function Actualities({connetionState})
{
    const [isArtist,SetisArtit] = useState(true);

    const CanPublish = () =>
    {
        if(isArtist)
        {
            return (
                <p className={`text-white mt-[10%] rounded-[8px] border text-[20px] pt-[5px] pb-[5px] pl-[15px] pr-[15px] cursor-pointer active:pb-[4px] active:pt-[4px] active:pl-[13px] active:pr-[13px] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`} >+ PUBLIER</p>
            );
        }
    }

    return (
        <>
            <div>
                <Navbar isConnected={connetionState}/>
                <div className={` fixed  w-full  `}>
                    <div className={` mt-[105px] bg-[#12100D] w-full h-[100px] flex`}>
                        <div className={`flex-6  pl-[30px] pt-[5px]`}>
                            <p className={` text-[#C9A84C] text-[32px] `}>FIL D'ACTUALITÉ</p>
                            <p className={` text-[#9B8E75] mt-0`}>Les dernières nouvelles de la scène artistique africaine</p>
                        </div>
                        <div className={ ` flex-1 flex-col justify-items-center `}>
                            {CanPublish()}
                        </div>
                    </div>
                    <div className={`  w-full flex h-[100vh] `}>
                        <div className={`  w-full no-scrollbar overflow-y-scroll bg-[#0A0806] border-2 justify-items-center  border-[rgba(201,168,76,0.12)]  flex-5 h-[calc(100vh-205px)]`}>
                            <CadreExpo 
                                ShortName={'AD'} 
                                Name={'Amara Diallo'} 
                                Time={'Il y a 2 heures'} 
                                Place={'Dakar, Sénégal'} 
                                ExpoDate={'15 Mai 2025'}
                                ExpoName={'Racines & Modernité'}
                                LikesNum={12}
                                CommentsNum={40}
                                PathAndType={{type: 'image', path: bird}}
                                Description={"Je vous invite au vernissage de ma nouvelle exposition qui explore le dialogue entre les traditions ancestrales et l'urbanité contemporaine africaine. Dix-huit toiles inédites"}
                            />

                            <CadreVente
                                ShortName={'AD'} 
                                Name={'Amara Diallo'} 
                                Time={'Il y a 2 heures'} 
                                Place={'Dakar, Sénégal'} 
                                ExpoDate={'15 Mai 2025'}
                                ArtWorkName={'Racines & Modernité'}
                                LikesNum={12}
                                Prices={250000}
                                CommentsNum={40}
                                PathAndType={{type: 'image', path: apple}}
                                Description={"Je vous invite au vernissage de ma nouvelle exposition qui explore le dialogue entre les traditions ancestrales et l'urbanité contemporaine africaine. Dix-huit toiles inédites"}
                            />

                            <CadreActu
                                ShortName={'AD'} 
                                Name={'Amara Diallo'} 
                                Time={'Il y a 2 heures'} 
                                Place={'Dakar, Sénégal'} 
                                LikesNum={12}
                                CommentsNum={40}
                                ActuName={'Sélectionné pour la Biennale de Venise 2026'}
                                Description={"C'est avec une immense fierté que je vous annonce ma sélection pour représenter le Ghana à la prochaine Biennale di Venezia. Mon installation « Anansi Reborn »"}
                            />
                            <CadreExpo 
                                ShortName={'AD'} 
                                Name={'Amara Diallo'} 
                                Time={'Il y a 2 heures'} 
                                Place={'Dakar, Sénégal'} 
                                ExpoDate={'15 Mai 2025'}
                                ExpoName={'Racines & Modernité'}
                                LikesNum={12}
                                CommentsNum={40}
                                PathAndType={{type: 'image', path: bird}}
                                Description={"Je vous invite au vernissage de ma nouvelle exposition qui explore le dialogue entre les traditions ancestrales et l'urbanité contemporaine africaine. Dix-huit toiles inédites"}
                            />

                            <CadreVente
                                ShortName={'AD'} 
                                Name={'Amara Diallo'} 
                                Time={'Il y a 2 heures'} 
                                Place={'Dakar, Sénégal'} 
                                ExpoDate={'15 Mai 2025'}
                                ArtWorkName={'Racines & Modernité'}
                                LikesNum={12}
                                Prices={250000}
                                CommentsNum={40}
                                PathAndType={{type: 'image', path: apple}}
                                Description={"Je vous invite au vernissage de ma nouvelle exposition qui explore le dialogue entre les traditions ancestrales et l'urbanité contemporaine africaine. Dix-huit toiles inédites"}
                            />

                            <CadreActu
                                ShortName={'AD'} 
                                Name={'Amara Diallo'} 
                                Time={'Il y a 2 heures'} 
                                Place={'Dakar, Sénégal'} 
                                LikesNum={12}
                                CommentsNum={40}
                                ActuName={'Sélectionné pour la Biennale de Venise 2026'}
                                Description={"C'est avec une immense fierté que je vous annonce ma sélection pour représenter le Ghana à la prochaine Biennale di Venezia. Mon installation « Anansi Reborn »"}
                            />
                            <CadreExpo 
                                ShortName={'AD'} 
                                Name={'Amara Diallo'} 
                                Time={'Il y a 2 heures'} 
                                Place={'Dakar, Sénégal'} 
                                ExpoDate={'15 Mai 2025'}
                                ExpoName={'Racines & Modernité'}
                                LikesNum={12}
                                CommentsNum={40}
                                PathAndType={{type: 'image', path: bird}}
                                Description={"Je vous invite au vernissage de ma nouvelle exposition qui explore le dialogue entre les traditions ancestrales et l'urbanité contemporaine africaine. Dix-huit toiles inédites"}
                            />

                            <CadreVente
                                ShortName={'AD'} 
                                Name={'Amara Diallo'} 
                                Time={'Il y a 2 heures'} 
                                Place={'Dakar, Sénégal'} 
                                ExpoDate={'15 Mai 2025'}
                                ArtWorkName={'Racines & Modernité'}
                                LikesNum={12}
                                Prices={250000}
                                CommentsNum={40}
                                PathAndType={{type: 'image', path: apple}}
                                Description={"Je vous invite au vernissage de ma nouvelle exposition qui explore le dialogue entre les traditions ancestrales et l'urbanité contemporaine africaine. Dix-huit toiles inédites"}
                            />

                            <CadreActu
                                ShortName={'AD'} 
                                Name={'Amara Diallo'} 
                                Time={'Il y a 2 heures'} 
                                Place={'Dakar, Sénégal'} 
                                LikesNum={12}
                                CommentsNum={40}
                                ActuName={'Sélectionné pour la Biennale de Venise 2026'}
                                Description={"C'est avec une immense fierté que je vous annonce ma sélection pour représenter le Ghana à la prochaine Biennale di Venezia. Mon installation « Anansi Reborn »"}
                            />
                        </div>

                        <div className={`  w-full no-scrollbar overflow-y-scroll  border-t-2 bg-[#12100D]  border-[rgba(201,168,76,0.12)]  flex-1 h-[calc(100vh-205px)]`}>
                            <div className={`w-full h-[55%]`}>

                                <div className={` w-[87%] pb-[2%] pt-[7%] mx-auto border-b-2 border-[rgba(201,168,76,0.12)]`}>
                                    <p className={`text-[#C9A84C] text-[15px]`} >ARTISTES À LA UNE</p>
                                </div>

                                <div className={` w-full mt-[11%] h-[90%]   no-scrollbar overflow-y-scroll justify-items-center`}>
                                    <TopArtist
                                        Name={'Amara Diallo'}
                                        ShortName={'AD'}
                                        ArtworksNum={18}
                                        SubscribersNum={312}
                                        Color={'none'}
                                    />
                                    <TopArtist
                                        Name={'Fatou Keita'}
                                        ShortName={'FK'}
                                        ArtworksNum={18}
                                        SubscribersNum={312}
                                        Color={'green'}
                                    />
                                    <TopArtist
                                        Name={'Kofi Mensah'}
                                        ShortName={'KM'}
                                        ArtworksNum={18}
                                        SubscribersNum={312}
                                        Color={'blue'}
                                    />
                                    <TopArtist
                                        Name={'Yasmine Ndour'}
                                        ShortName={'YN'}
                                        ArtworksNum={18}
                                        SubscribersNum={312}
                                        Color={'red'}
                                    />
                                    <TopArtist
                                        Name={'Amara Diallo'}
                                        ShortName={'AD'}
                                        ArtworksNum={18}
                                        SubscribersNum={312}
                                        Color={'none'}
                                    />
                                </div>
                            </div>

                            <div className={`w-full mt-[18%]  h-[64%]`}>
                                
                                <div className={` w-[87%] pb-[2%] pt-[7%] mx-auto border-b-2 border-[rgba(201,168,76,0.12)]`}>
                                    <p className={`text-[#C9A84C] text-[15px]`} >EXPOSITIONS EN COURS</p>
                                </div>

                                <div className={` w-full mt-[6%]   h-[80%] no-scrollbar overflow-y-scroll justify-items-center`}>
                                    <TopExpo
                                        ExpoName={'Racines & Modernité'}
                                        Duration={'15 Mai – 30 Jun 2025'}
                                        State={'ACTIF'}
                                        ArtworksNum={'18'}
                                    />
                                     <TopExpo
                                        ExpoName={'Lumières du Sahara'}
                                        Duration={'01 Jul – 31 Aug 2025'}
                                        State={'À VENIR'}
                                        ArtworksNum={'12'}
                                    />
                                    <TopExpo
                                        ExpoName={'Racines & Modernité'}
                                        Duration={'15 Mai – 30 Jun 2025'}
                                        State={'ACTIF'}
                                        ArtworksNum={'18'}
                                    />
                                    <TopExpo
                                        ExpoName={'Lumières du Sahara'}
                                        Duration={'01 Jul – 31 Aug 2025'}
                                        State={'À VENIR'}
                                        ArtworksNum={'12'}
                                    />
                                    <TopExpo
                                        ExpoName={'Racines & Modernité'}
                                        Duration={'15 Mai – 30 Jun 2025'}
                                        State={'ACTIF'}
                                        ArtworksNum={'18'}
                                    />
                                </div>
                            </div>


                            <div className={`w-full  h-[55%]`}>
                                
                                <div className={` w-[87%] pb-[2%] pt-[7%] mx-auto border-b-2 border-[rgba(201,168,76,0.12)]`}>
                                    <p className={`text-[#C9A84C] text-[15px]`} >FILTRER PAR TYPE</p>
                                </div>

                                <div className={` w-[87%] h-[90%] mt-[5%] mx-auto no-scrollbar overflow-y-scroll`}>
                                    <FilterButton Criterial={'TOUT AFFICHER'} />
                                    <FilterButton Criterial={'EXPOSITIONS'} />
                                    <FilterButton Criterial={'VENTES'} />
                                    <FilterButton Criterial={'ACTUALITÉS'} />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

//className={``}



