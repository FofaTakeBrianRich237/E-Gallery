import { use, useEffect, useRef, useState } from 'react';
import { Cadre } from '../../Global/Cadre';
import { Settings } from 'lucide-react';

import wale  from '../../../assets/wale.png'
import bird  from '../../../assets/bird.png'
import apple from '../../../assets/apple.png'
import Coffee from '../../../assets/coffee.png'
import test from '../../../assets/test.mp4';
import logo from '../../../assets/KZB_Galerie-removebg-preview.png';
import background from '../../../assets/Gemini_Generated_Image_2xskv22xskv22xsk.png';
import { useAsyncError } from 'react-router-dom';
import Buttons from '../../Global_Component/Buttons';


export function AccountCadres({title})
{
        const [ CadreArray , setCadrsArray ] = useState([
        {
            Text: "hummmmmmmmmm",
            Path: wale,
            Position: "middle",
            My: 'my-[16px]',
            ContentType: "image",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: bird,
            Position: "first",
            My: 'my-[16px]',
            ContentType: "image",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: apple,
            Position: "middle",
            My: 'my-[15px]',
            ContentType: "image",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: wale,
            Position: "middle",
            My: 'my-[15px]',
            ContentType: "image",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: bird,
            Position: "middle",
            My: 'my-[15px]',
            ContentType: "image",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: Coffee,
            Position: "last",
            My: 'my-[15px]',
            ContentType: "image",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: test,
            Position: "middle",
            My: 'my-[15px]',
            ContentType: "video",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: wale,
            Position: "middle",
            My: 'my-[15px]',
            ContentType: "image",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: wale,
            Position: "middle",
            My: 'my-[15px]',
            ContentType: "image",
            key: crypto.randomUUID()
        }
    ]);

    const OnClickLeft = () =>
    {
        setCadrsArray(
            (prev)=>
            {
                const temp = [...prev];

                for(let i = 0; i < temp.length; i++)
                {
                    if(temp[i].Position === "first" && i > 0)
                    {
                        temp[i] = {...temp[i],Position: "middle"};
                        temp[i-1] = {...temp[i-1], Position: "first"};

                        for(let j = 0; j < temp.length; j++)
                        {
                            if((temp[j].Position === "last") && j)
                            {
                                temp[j] = {...temp[j],Position: "middle"};
                                temp[j-1] = {...temp[j-1],Position: "last"};
                            }
                        }

                        return temp;
                    }
                }

                return temp;
            }
        );
    }

    const OnClickRight = () =>
    {
        setCadrsArray(
            (prev)=>
            {
                const temp = [...prev]
                for(let i = 0; i < temp.length; i++)
                {
                    if((temp[i].Position === "last") && i < (temp.length-1))
                    {
                        temp[i] = {...temp[i],Position: "middle"};
                        temp[i+1] = {...temp[i+1],Position: "last"};

                        for(let j = 0; j < temp.length; j++)
                        {
                            if((temp[j].Position === 'first'))
                            {
                                temp[j] = {...temp[j],Position: "middle"};
                                temp[j+1] = {...temp[j+1],Position: "first"};
        
                                break;
                            }
                        }
                        return temp;
                    }

                }

                // console.log("prev = ",prev);
                // console.log("temp = ",temp);
                
                return temp;
            }
        );
    }

    const Display = () =>
    {

        const Start = CadreArray.findIndex((cadre) => cadre.Position === "first");
        const End = CadreArray.findIndex((cadre) => cadre.Position === "last")+1;


        return(
            <>
                {Object.entries(CadreArray).slice(Start,End).map((Cadres) => 
                    {
                        const arrowButtonDetails =  (pos) =>
                        {
                            let direction, func;
                            if(pos === 'first')
                            {
                                direction = 'left';
                                func = OnClickLeft;
                            }
                            else if(pos === 'last')
                            {
                                direction = 'right';
                                func = OnClickRight;
                            }
                            else
                            {
                                direction = '';
                                func = () => {};
                            }

                            return ({
                                    direction: direction,
                                    visibility: false,
                                    func: func
                                });
                        }
                        
                        return (
                            <Cadre
                                Text = {Cadres[1].Text}
                                Path = {Cadres[1].Path}
                                Position = {Cadres[1].Position}
                                My = {Cadres[1].My}
                                ContentType = {Cadres[1].ContentType}
                                key = {Cadres[1].key}
                                arrowButton={arrowButtonDetails(Cadres[1].Position)}
                            />
                        );
                    })
                }
            </>
        );
        
    }

    return(
        <>
            <div className={`flex-col place-items-center  h-full w-full`}>
                <div className={`h-[20%] w-full`}>
                    <p className={`font-[Afrik] w-full h-full font-bold underline pt-[3%] pl-[15px] text-[30px] `}>{title}</p>
                </div>
                <div className={` mt-[10px] flex h-[80%] bg-black rounded-[25px] border-[rgba(255,215,0,0.6)] w-[98.5%]  gap-[25px]`}>
                    {Display()}
                </div> 
            </div>     
        </>
    );
}

export function SectionCadres ()
{
    const Titles = ["MY WORKS","MY ARTISTS", "MY FAVORITES", "MY LIKDED","LAST","EUILLe"];

    return(
        <div className={`grid gap-0 border-2 overflow-y-auto h-[1000px] border-gray-200 w-full `}>
            {
                Titles.map((titles) =>
                {
                    return(
                        <div className={`h-[400px]`}>
                            <AccountCadres title={titles}/>
                        </div>
                    );
                })
            }
        </div>
    );
}

export function Options({func1 = ()=>{} ,func2 = ()=>{}})
{

    const button = (text) =>
    {
        return (
            <div className={`border-b-2 hover:cursor-pointer transition-all duration-100
            bg-[rgba(255,215,0,0.6)]  border-l-2 border-r-2 border-gray-200 
             w-full h-[50%] place-items-center border-4 active:border-8`}
            >
                <p className={`font-[Afrik] text-[32px] mt-[10px] transition-all duration-100  text-center`}>{text}</p>
            </div>
        );
    }

    return(
        <>
            <div className={`w-[200px] fixed top-[190px] left-0  h-[150px] `}>
                {button("ACTUALITY")}
                {button("GALERIE")}
                {button("STATISTICS")}
            </div>
        </>
    );
}

export function LowerSection()
{
    return(
        <div className={`flex gap-[10px] w-full fixed top-[200px]`}>
            <div className={`w-[15%]`}>
                <Options/>
            </div>
            <div className={`w-[85%]  bg-[rgba(255,255,255,0.8)]`}>
                <SectionCadres/>
            </div>
        </div>
    );
}

const 
ScoreBox = ({text,score,className,TextClassName, FirstdivCss, SeconddivCss}) =>
{
    return(
        <div className={`${className}`}>
            <div className={`h-[50%] w-full ${FirstdivCss}`}>
                <p className={`font-[Afrik] text-center ${TextClassName} mt-[10%] underline text-[20px]`}>{text}</p>
            </div>
            <div className={` h-[50%] w-full  ${SeconddivCss}`}>
                <p className={` font-[Afrik] text-center ${TextClassName} text-[20px]`}>{score}</p>
            </div>
        </div>
    );
}

export function Artist({setConnetionSate})
{
    // setConnetionSate(true);
    return(
        <>
            <div className={`h-[100vh] w-full bg-no-repeat bg-cover`} style={{ backgroundImage: `url(${background})` }}>
                <div className={`w-[80px] fixed top-0 left-0  overflow-hidden h-[80px]`}>
                    <img 
                        src={logo} 
                        className={`w-full h-full  object-cover`}
                    />
                </div>
                <div className={`flex  w-full fixed top-[80px] left-0 h-[110px] `}>
                    <div className={`w-[30%] bg-[rgba(255,255,255,0.8)] border-2  border-gray-200 `}>

                    </div>
                    <div className='flex 0 w-[20%] ml-[15%] bg-[rgba(255,255,255,0.8)]'>
                        <ScoreBox text={"ARTWORKS"} score={0} className={'w-[50%]'} />
                        <ScoreBox text={"SUBSCRIBERS"} score={0}className={'w-[50%]'} />
                    </div>
                    <ScoreBox text={"LIKES"} score={0} className={`w-[5%] ml-[15%]  rounded-[10px] bg-[rgba(0,0,0,0.8)]`} TextClassName={"text-white"}/>
                    <Settings className='w-[5%] h-[50%] ml-[7%] mt-[1%] '/>
                </div>
                <LowerSection/>
            </div>
            {/* <Buttons name={"test"} className={`w-[100px] text-center`}/> */}
        </>
    );
}
