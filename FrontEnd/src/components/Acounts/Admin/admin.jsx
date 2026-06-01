import { useState } from 'react';
import { MoveUp } from 'lucide-react';
import { MoveDown } from 'lucide-react';
import ad_user from '../../../assets/ad-user.png'

export function Admin({connetionState})
{
    const [stats,setStats] = useState(
        [
            {Val: "47", Text: "OEUVRES CE MOIS", GainLoss: "12", IsGain: true, Switch:true, key: 1},
            {Val: "2.1M", Text: "FCFA VENTES", GainLoss: "8", IsGain: true, Switch:false, key: 2},
            {Val: "23", Text: "NOUVEAUX ARTISTES", GainLoss: "3", IsGain: false, Switch:true, key: 3},
            {Val: "91%", Text: "TAUX DE SATISFACTION", GainLoss: "2", IsGain: true, Switch:false, key: 4}
        ]
    );

    const [Switch,setSwitch] = useState(true);
    const [ValidationsPending,setValidationsPending] = useState(4);

    const [PendingValidationAcounts,setPendingValidationAcounts] = useState(
        [
            { ShortName: "JB", Name: "Jean-Baptiste Mvogo", ArtType: "Peinture", Place: "Yaoundé" },
            { ShortName: "AB", Name: "Aïcha Bello", ArtType: "Sculpture ", Place: "Douala" },
            { ShortName: "JB", Name: "Jean-Baptiste Mvogo", ArtType: "Peinture", Place: "Yaoundé" },
            { ShortName: "AB", Name: "Aïcha Bello", ArtType: "Sculpture ", Place: "Douala" }
        ]
    );

    const [expos,setExpos] = useState(
        [
            {Titre: "Racines & Modernité",Artist:"Amara Diallo, Kofi M.", Period: "15 Mai – 30 Jun 25",Artworks: 18 ,State: "ACTIF",Action: "GÉRER"},
            {Titre: "Lumières du Sahara",Artist:"Yasmine Ndour", Period: "01 Jul – 31 Aug 25",Artworks: 12 ,State: "PRÉPARATION",Action: "GÉRER"},
            {Titre: "Traditions Bamiléké",Artist:"	Collectif CM Art", Period: "Mar – Avr 2025",Artworks: 31 ,State: "CLÔTURÉ",Action: "ARCHIVER"},
            {Titre: "Racines & Modernité",Artist:"Amara Diallo, Kofi M.", Period: "15 Mai – 30 Jun 25",Artworks: 18 ,State: "ACTIF",Action: "GÉRER"},
            {Titre: "Lumières du Sahara",Artist:"Yasmine Ndour", Period: "01 Jul – 31 Aug 25",Artworks: 12 ,State: "PRÉPARATION",Action: "GÉRER"},
            {Titre: "Traditions Bamiléké",Artist:"	Collectif CM Art", Period: "Mar – Avr 2025",Artworks: 31 ,State: "CLÔTURÉ",Action: "ARCHIVER"}
        ]
    );

    const Colors = ["","red","blue","green",""];
    let AcutalColorPosition = 0;

    //className = {``}
    const [admin,setAdmin] = useState(
        {
            ShortName: "KZ",
            AdminName: "GALERIE KZB"
        }
    );

    const [gallery,setGallery] = useState(
        {
            NumOfExpositions: 12,
            NumOfArtist: 248,
            NumOfVisitor: 500,
            NumOfSales: 80
        }
    );

    const Buttons = ({Text,Onclick = () => {}}) =>
    {
        return(
            <>
                <div className={`flex w-fit h-fit border mb-[5px]  border-[#f3f0e9] pt-[8px] pb-[8px] pl-[14px] pr-[17px] rounded-[7px] active:p-[6px] active:pl-[15px] active:pr-[15px] hover:cursor-pointer hover:bg-[rgba(43,104,248,0.1)] cursor-pointer  active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`}
                    onClick={Onclick}>
                    <p className={` text-[#F5EDD6] text-[18px] font-bold`}>{Text}</p>
                </div>
            </>
        );
    }

    const SpButtons = ({Text,Onclick = () => {}}) =>
    {
        return(
            <>
                <div className={`flex w-fit h-fit border mb-[5px]  border-[#9B8E75] p-[7px] pl-[15px] pr-[18px] active:p-[5px] active:pl-[13px] active:pr-[16px] rounded-[7px] hover:cursor-pointer hover:bg-[rgba(43,104,248,0.1)] cursor-pointer  active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`}
                    onClick={Onclick}>
                    <p className={` text-[#9B8E75] text-[18px] `}>{Text}</p>
                </div>
            </>
        );
    }


    const Filters = ({Type,Criterials}) =>
    {
        return(
            <>
                <div className = {`mb-[14%]`}>
                    <p className = {`text-[#9B8E75] ml-[12px] mb-[4%] text-[13px]`}>{Type}</p>
                    {
                        Criterials.map((element) =>
                        {
                            return(
                                <Buttons Text={element.Text} Onclick={element.Onclick}/>
                            );
                        })
                    }
                </div>
            </>
        );
    }

    const Stats = ({Value,StatName}) =>
    {
        return(
            <>
                <div className = {` justify-items-center w-fit `}>
                    <p className = {` text-center w-fit text-[#edc24c] text-[21px] font-bold `}>{Value}</p>
                    <p className = {` text-center w-fit text-[#9B8E75] text-[14px] `}>{StatName}</p>
                </div>
            </>
        );
    }

    const StatsCadre = ({Val,Text,GainLoss,IsGain,Switch}) =>
    {
        const BorderTop = () =>
        {
            if(Switch) return "border-t-[#a77c0e]";
            else return "border-t-[#886306]"
        }

        const Arrow = ({color,size,className = ''}) =>
        {
            if(IsGain)
            {
                return(
                    <MoveUp color={color} size={size} className={`${className}`} />
                );
            }
            else 
            {
                return (
                    <MoveDown color={color} size={size} className={`${className}`}/>
                );
            }
        }

        const TestColor = () =>
        {
            if(IsGain) return '#46d275';
            else return '#d63232';
        }

        return(
            <div className = {`pl-[22px] pt-[15px] flex-1 h-full bg-[#201d16] border-t-3 ${BorderTop()} border border-[rgba(201,168,76,0.12)]`}>
                <p className = {`text-[#edc24c] text-[30px] h-fit`}> {Val} </p>
                <p className = {`text-[#9B8E75] text-[14px] mb-[6px]`}> {Text} </p>
                <div className = {`flex`}>
                    <Arrow color={TestColor()} size={10} className='mt-[5px]'/>
                    <p className = {` text-[${TestColor()}] text-[13px]`}> {` ${(IsGain) ? '+' : '-'}` + GainLoss + "% vs mois dernier"} </p>
                </div>
            </div>
        );
    }

    const DisplayStatsCadres = () =>
    {
        return (
            <>
                {
                    stats.map((element) =>
                            {
                                return (
                                    <>
                                        <StatsCadre
                                            Val={element.Val}
                                            Text={element.Text}
                                            GainLoss={element.GainLoss}
                                            IsGain={element.IsGain}
                                            Switch={element.Switch}
                                        />
                                    </>
                                );
                            }) 
                }
            </>
        );
    }

    const DisplayExpoDetails = ({DetailsList}) =>
    {
        return (
            <>
                {
                    DetailsList.map((element) =>
                    {
                        return (
                            <div className = {`h-full flex-1  pt-[2%] pl-[1%]`}>
                                <p className = {`text-[#9B8E75] text-[15px]`}>{element}</p>
                            </div>
                        );
                    })
                }
            </>
        );
    }

    const PendingValidationCadre = ({Color = "red",ShortName,Name,ArtType,Place}) =>
    {
        const SNbgbr = () =>
        {
            if(Color === 'blue')
                { return "border-[#282880] text-[#5DADE2]"}
            else if(Color === 'red') 
                {return " border-[#602424] text-[#E74C3C]"}
            else if(Color === 'green') 
                {return "border-[#1f6c3a] text-[#58D68D]"}
            else
                {return "text-[#8B6914] border-[rgba(201,168,76,0.35)]"}
        }
        return(
            <>
                <div className = {`w-full h-[46%] border bg-[#201d16] flex mt-[10px] `}>
                                <div className={` h-full justify-items-center pt-[5px]  w-[8%]  `}>
                                    <p className={`border w-fit text-[13px] ${SNbgbr()} p-[18px] pl-[21px] pr-[21px] rounded-full `}>{ShortName}</p>
                                </div>
                                <div className={` h-full  w-[65%]  pt-[12px]`}>
                                    <p className={`text-[#F5EDD6] text-[17px]  hover:text-[#C9A84C] cursor-pointer`}>{Name}</p>
                                    <p className={`text-[#9B8E75] text-[13px] `}>{ ArtType + " · " + Place}</p>
                                </div>
                                <div className = {`w-[26%] h-full pt-[13px]  flex gap-2`}>
                                    <Buttons Text={"ACCEPTER"}/>
                                    <Buttons Text={"REFUSER"}/>
                                    <SpButtons Text={"VOIR"}/>
                                </div>
                            </div>
            </>
        );
    }

    const DisplayPendingValidations = () =>
    {
        return(
            <>
                {
                    PendingValidationAcounts.map((element) =>
                    {
                        if(AcutalColorPosition == 4) AcutalColorPosition = 0;
                        else AcutalColorPosition++;

                        return(
                            <PendingValidationCadre
                                Color={Colors[AcutalColorPosition]}
                                ShortName={element.ShortName}
                                Name={element.Name}
                                ArtType={element.ArtType}
                                Place={element.Place}
                            />
                        );
                    })
                }
            </>
        );
    }

    const DisplayExpos = ({Titre,Artist,Period,Artworks,State,Action}) =>
    {
        const Bg = () =>
        {
            if(State === 'PRÉPARATION')
                { return 'border-[#C9A84C] bg-[#8B6914] text-[#C9A84C]'; }
            else if(State === 'ACTIF')
                { return 'bg-[#1A4A2A] border-[#1f6c3a] text-[#58D68D]'; }
            else
                { return 'text-[#9B8E75] border-[#9B8E75] bg-[rgba(155,142,117,0.2)]'; }
        }

        const ActionButtonTextColor  = () =>
        {
            if(Action === "ARCHIVER")
                { return 'text-[#9B8E75]'; }
            else 
                { return 'text-[#e8c25a]'; }
        }

        const ActionButtonBorderColor  = () =>
        {
            if(Action === "ARCHIVER")
                { return 'border-[#9B8E75]'; }
            else 
                { return 'border-[#e6ae14]'; }
        }

        return (
            <>
                <div className = {`w-full h-[25%] flex border-b border-[rgba(201,168,76,0.12)] pl-[1%] pt-[15px] `}>
                                <p className = {`flex-1 h-full text-[#F5EDD6] text-[15px]`}>{Titre}</p>
                                <p className = {`flex-1 h-full text-[#9B8E75] text-[15px] ml-[2px]`}>{Artist}</p>
                                <p className = {`flex-1 h-full text-[#9B8E75] text-[15px] ml-[2px]`}>{Period}</p>
                                <p className = {`flex-1 h-full text-[#C9A84C] text-[17px] pl-[30px]`}>{Artworks}</p>
                                <div className = {`flex-1 h-full `}>
                                    <div className={`   w-[60%] justify-items-center`}> 
                                        <p className={`border ${Bg()} inline text-[13px] p-[2%] pl-[7%] pr-[7%]`}>{State}</p>
                                    </div>
                                </div>
                                <div className = {`flex-1 h-full ml-[6px] `}>
                                    <div className={`flex ${ActionButtonBorderColor()} h-fit w-fit border  p-[3px] pl-[11px] pr-[14px] active:p-[1px] active:pl-[9px] active:pr-[10px] rounded-[11px] hover:cursor-pointer hover:bg-[rgba(43,104,248,0.1)] cursor-pointer  active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`}
                                        onClick={() => {}}>
                                        <p className={` ${ActionButtonTextColor()} font-bold text-[12px] `}>{Action}</p>
                                    </div>
                                </div>
                            </div>
            </>
        );
    }

    const DisplayExposList = () =>
    {
        return (
            <>
                {
                    expos.map((element) =>
                    {
                        return(
                            <>
                                <DisplayExpos
                                    Titre={element.Titre}
                                    Artist={element.Artist}
                                    Period={element.Period}
                                    Artworks={element.Artworks}
                                    State={element.State}
                                    Action={element.Action}
                                />
                            </>
                        );
                    })
                }
            </>
        );
    }

    return (
        <>
            <div className = {` flex fixed w-full h-[200px] bg-cover flex border-[#a77c0e] border-b-3`} style={{ backgroundImage: `url(${ad_user}) ` }} >
                <div className = {` h-full  flex-1 justify-items-center`}>
                    <p className = {` rounded-full border-3 border-[#c5a653] bg-[#97700b] text-[35px] text-center p-[16%] pr-[18%] pl-[18%] mt-[28%]`}>{admin.ShortName}</p> 
                </div>
                <div className = {` h-full  flex-6 pt-[1%]`}>
                    <p className = {` text-[#F5EDD6] text-[35px] `}>{admin.AdminName}</p> 

                    <div className = {`bg-[#825f07] flex w-fit p-[2px] pl-[25px] pr-[25px] mt-[7px] mb-[8px]`}>
                        <p className = {`mr-[13px] text-[11px] `}>◈</p> 
                        <p className = {`font-bold text-[14px]  `}>ORGANISATEUR OFFICIEL</p> 
                    </div>

                    <div className = {` flex gap-7`}>
                        <Stats Value={gallery.NumOfExpositions} StatName={'EXPOSITIONS'}/>
                        <Stats Value={gallery.NumOfArtist} StatName={'ARTISTES'}/>
                        <Stats Value={gallery.NumOfVisitor} StatName={'VISITORS'}/>
                        <Stats Value={gallery.NumOfSales} StatName={'VENTES'}/>
                    </div>
                </div>
                <div className = {` h-full flex-3 flex gap-3 items-center `}>
                    <div className = {`bg-[#825f07] flex w-fit h-fit pr-[30px] pl-[30px] p-[12px] rounded-[7px] ml-[19%] cursor-pointer active:p-[10px] active:pr-[28px] active:pl-[28px] transition-all duration-100`}>
                        <p className = {`mr-[7px] text-[11px] `}>+</p>
                        <p className = {`text-[13px]  `}>EXPOSITION</p> 
                    </div>
                    <p className={` h-fit text-white border border-white rounded-[7px] text-[19px]  pr-[15px] pl-[15px] pt-[5px] pb-[5px]  bg-[#252424] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer active:pb-[4px] active:pt-[4px] active:pl-[13px] active:pr-[13px] active:bg-[rgba(255,255,255,0.1)] transition-all duration-100`} > DÉCONNEXION </p>
                </div>
            </div>

            <div className = {` w-full  h-[100vh] flex`} >
                <div className= {`   bg-[#12100D] border-r border-[rgba(201,168,76,0.12)] w-[16%] h-[calc(100vh-200px)] no-scrollbar overflow-y-scroll mt-[200px] pt-[1%]`} >
                    <Filters Type={'GESTION'}
                        Criterials={[
                            {Text: "TABLEAU DE BORD", Onclick: ()=>{}},
                            {Text: "EXPOSITIONS", Onclick: ()=>{}},
                            {Text: "ARTISTES", Onclick: ()=>{}},
                            {Text: "OEUVRES", Onclick: ()=>{}}
                        ]}
                    />
                    <Filters Type={'PUBLICATION'}
                        Criterials={[
                            {Text: "ACTUALITÉS", Onclick: ()=>{}},
                            {Text: "GALERIE EN LIGNE", Onclick: ()=>{}}
                        ]}
                    />
                    <Filters Type={'FINANCES'}
                        Criterials={[
                            {Text: "VENTES", Onclick: ()=>{}},
                            {Text: "COMMISSIONS", Onclick: ()=>{}}
                        ]}
                    />
                    <Filters Type={'ADMIN'}
                        Criterials={[
                            {Text: "VALIDATIONS", Onclick: ()=>{}},
                            {Text: "PARAMÈTRES", Onclick: ()=>{}}
                        ]}
                    />
                </div>
                <div className= {`justify-items-center border bg-[#0A0806] w-[84%] h-[calc(100vh-200px)] no-scrollbar overflow-y-scroll mt-[200px] `} >
                    <div className = {` w-[96%] h-[130px] flex border mt-[3%] gap-4`}>
                        <DisplayStatsCadres/>
                    </div>
                    <div className = {`w-[96%] mt-[20px] h-[320px]`}>

                        <div className = {`w-full h-[20%] border-b-2 border-[#413008] pt-[2%] flex`}>
                            <div className = {`h-full w-[15%]`}>
                                <p className = {`text-[#F5EDD6] text-[18px]`}>EXPOSITIONS</p>
                            </div>
                        </div>

                        <div className = {`w-full h-[20%] border-b-2 border-[#413008] flex`}>
                            <DisplayExpoDetails 
                                DetailsList={[
                                    "TITRE",
                                    "ARTISTE(S)",
                                    "PÉRIODE",
                                    "OEUVRES",
                                    "STATUT",
                                    "ACTIONS"
                                ]}
                            />
                        </div>
                        <div className = {`w-full h-[60%]  no-scrollbar overflow-y-scroll `}>
                            <DisplayExposList/>
                        </div>
                    </div>
                    <div className = {`w-[96%] mt-[20px] h-[230px] `}>
                        <div className = {`w-full h-[30%] border-b-2 border-[#413008] pt-[2%] flex border-b-2 border-[#413008]`}>
                            <div className = {`h-full w-[80%] border pt-[8px]`}>
                                <p className = {`w-full text-[18px] text-[#F5EDD6]`}>ARTISTES EN ATTENTE DE VALIDATION</p>
                            </div>
                            <div className = {`h-full w-[20%]justify-items-center pt-[7px]`}>
                                <p className = {`w-fit ml-[96px] bg-[rgba(255,0,0,0.2)] text-[#E74C3C] border border-[#602424]  text-[14px] whitespace-pre p-[3px] pr-[20px] pl-[13px] `}>  {ValidationsPending + "    EN    ATTENTE"}</p>
                            </div>
                        </div>
                        <div className = {`w-full h-[70%]  no-scrollbar overflow-y-scroll `}>
                            <DisplayPendingValidations/>
                        </div>
                    </div>
                    <div className = {`h-[50px]`}></div>
                </div>
            </div>
        </>
    );
}





