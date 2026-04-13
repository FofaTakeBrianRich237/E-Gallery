import { useEffect, useRef, useState } from 'react';
import { Cadre } from '../Global/Cadre';

import wale  from '../../assets/wale.png'
import bird  from '../../assets/bird.png'
import apple from '../../assets/apple.png'
import Coffee from '../../assets/coffee.png'
import test from '../../assets/test.mp4';
import Navbar from '../Global_Component/Navbar';

export function ActualityCadres ({Artist_type})
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
            Position: "middle",
            My: 'my-[15px]',
            ContentType: "image",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: test,
            Position: "last",
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
            <div className={`place-items-center h-[420px] `}>
                
                <div className={`border-7 rounded-t-[25px]  border-b-0 place-items-center shadow-[0px_0px_20px_rgba(255,215,0,0.6)] border-[rgba(255,215,0,0.6)] w-[50%] h-[60px] `}>
                    <p className={`text-wrap break-all my-[1%] border-[rgba(255,215,0,0.6)]  text-center text-[rgba(255,215,0,0.6)] text-[25px]`} >{Artist_type}</p>
                </div>

                <div className={`flex border-7  shadow-[0px_0px_20px_rgba(255,215,0,0.6)] rounded-[25px] border-[rgba(255,215,0,0.6)] w-[98.5%] h-[330px] gap-[25px]`}>
                    {Display()}
                </div>

                {/* <div className={`border-7  bg-black rounded-t-[25px]  border-b-0 place-items-center shadow-[0px_0px_20px_rgba(255,215,0,0.6)] border-[rgba(255,215,0,0.6)] w-[50%] h-[60px] `}>
                    <p className={`text-wrap break-all my-[2%] border-black  text-center text-[rgba(255,215,0,0.6)] text-[25px]`} >{Artist_type}</p>
                </div>

                <div className={`flex border-7 bg-black  rounded-[25px] border-[rgba(255,215,0,0.6)]  w-[98.5%] h-[330px] gap-[25px]`}>
                    {Display()}
                </div> */}
            </div>
        </>
    );

}

export function Actualities()
{
    const DivRef = useRef(null);
    const ArtsTypes = [";iopoiesgoiseloiglsoeiloidoilo",
        ";iopoiesgoiseloiglsoeiloidoilo",
        ";iopoiesgoiseloiglsoeiloidoilo",
        ";iopoiesgoiseloiglsoeiloidoilo",";iopoiesgoiseloiglsoeiloidoilo",";iopoiesgoiseloiglsoeiloidoilo"];

    const Actu = () =>
    {
        return (
            <>
                {
                    ArtsTypes.map((type) =>
                    {
                        return (
                            <ActualityCadres Artist_type={type}/>
                        );
                    })
                }
            </>
        );
    }

    const BigCadre = () =>
    {
        return(
            <>
                <div 
                    className={`flex flex-col relative  bg-gray-200 rounded-3xl 
                    shadow-[0px_0px_18px_rgba(255,215,0,0.6)]
                    flex flex-col flex-1 transition-all duration-700 h-[300px] mb-10 hover:flex-[2]`}
                    onClick={OnClick}
                >
                    <div className={`flex-[70%]  overflow-hidden rounded-3xl`}>
                        <img
                                src={wale} 
                                className='w-full h-full object-cover '
                        />
                    </div>

                    <div className={` place-items-center bg-gray-200 rounded-2xl flex-[30%] min-w-0`}>
                        <p 
                            className='text-wrap break-all  w-[600px] h-full text-center pt-[20px]'>""</p>                    
                    </div>

                </div>
            </>
        );
    }

    useEffect(()=>{
        DivRef.current.classList.add('mt-[70px]');
    },[]);

    const OnClick = ()=>{}

    return (
        <>
            <div  className='bg-black'>
                <Navbar/>
                <div ref={DivRef} className={`mt-[40%] transition-all duration-1000`}/>
                {BigCadre()}
                {Actu()}
            </div>
        </>
    );
}





