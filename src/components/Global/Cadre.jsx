import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'

import '../../index.css'


export function ArrowButton({Direction, Visible ,FuncOnClick})
{
    const [visible,setVisible] = useState(Visible);
    const LeftOrRight = ()=>
    {
        if(Direction === "right") 
        { return (<ArrowRight size={24} color="white"/>); }
        else if(Direction === "left") 
        {return (<ArrowLeft size={24} color="white"/>);}
    };

    const Display = () =>
    {
        if(Visible)
        {
            return(
                <div className={` bg-black  border-[6px] 
                border-[rgba(255,215,0,0.6)] rounded-[100px]
                w-[40px] h-[40px] flex justify-center items-center
                transition-all duration-350 hover:w-[45px] hover:h-[45px]
                active:bg-[rgba(255,215,0,0.6)] active:duration-10`}
                onClick={(Object_Element)=>{
                    Object_Element.stopPropagation();
                    FuncOnClick();
                }}
                >

                    {LeftOrRight()}

                </div>
            );
        }
    }

    return (
        <>
            {Display()}
        </>
        
    );
}

/*
arrowButton
- visibility
- direction
- function
*/


export function Cadre({Text , ContentType ,Path, My, key , Position , arrowButton = {}, OnClick = ()=>{}})
{
    const contentRef = useRef(null);
    const [ArrowVisibility,setArrowVisibility] = useState(false);

    const LeftMargin = ()=>
    { 
        if(Position === "first") {return 'ml-6';}
        else if(Position === "last") {return 'mr-6';}
    };

    const HandlePlay = ()=>
    {
        if(ContentType === "video") 
        { { contentRef.current && contentRef.current.play()} }
    }
    
    const onLeave = ()=>
    {
        setArrowVisibility(false);
        if(ContentType === "video" && contentRef.current) 
        { 
            contentRef.current.currentTime = 0;
            contentRef.current.pause(); 
        }
    }

    const DisplayContent = ()=>
    {
        if(ContentType === "image") 
        {
            return (
                <img 
                    ref={contentRef}
                    src={Path} 
                    className='w-full h-full object-cover'
                />
            );
        }

        else if(ContentType === "video") 
        {
            return (
                <video 
                    ref={contentRef}
                    src={Path} 
                    className='w-full h-full object-cover '
                    muted
                    loop
                />
            );
        }
    }

    const onHover = () =>
    {
        if((Position === 'first') || (Position ==='last')) 
            setArrowVisibility(true);
        HandlePlay();
    }

    const DisplayArrow = () =>
                {
                    const RightArrowTransform = () =>
                    {
                        if(arrowButton.direction === "right")
                        {return 'mx-[90%]'; }
                    }

                    return (
                        <div className={`absolute my-[45%] ${RightArrowTransform()} `}>
                            <ArrowButton Direction={arrowButton.direction} Visible={ArrowVisibility} FuncOnClick={arrowButton.func}/>
                        </div>
                    );
                }


    return (
        <div 
        className={`flex flex-col relative  bg-gray-200 rounded-3xl ${My}
            ${LeftMargin()} shadow-[0px_0px_18px_rgba(255,215,0,0.6)]
            flex flex-col flex-1 transition-all duration-700 hover:flex-[2]`}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onClick={(e)=>
            {
                e.stopPropagation();
                OnClick();
            }}
        >
            <div className={`flex-[70%]  overflow-hidden rounded-3xl`}>

                {DisplayContent()}

            </div>

            <div className={`  bg-gray-200 rounded-2xl flex-[30%] min-w-0`}>

                <p 
                    className={`font-[Afrik]  text-wrap break-all text-center text-[13px] my-[5%] mt-[10px]`}>
                {Text}</p>
                
            </div>

            {DisplayArrow()}

        </div>
    );
}

