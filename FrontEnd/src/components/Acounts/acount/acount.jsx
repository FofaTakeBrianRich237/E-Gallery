import { useEffect, useRef, useState } from 'react';
import './Acount.css'
import Buttons from '../../Global_Component/Buttons';
import { Artist } from '../Artist/Artist';
import { useNavigate } from 'react-router-dom';


export function InfoField({fieldName,className})
{
    return (
        <div className= {` flex w-[98%]   ${className}`} >
            <p className='flex items-center w-[40%] text-[20px]'>{fieldName}:</p>
            <div className=' flex w-[60%] items-center '>
                <input className={`border-2 rounded-[7px] border-[rgba(255,215,0,0.6)] flex-1 text-center`}/>
            </div>
        </div>
    );
}



export function AcountForm()
{
    const [Registration,setRegistrationSate] = useState(true);
    const [AcountChoise,setAcountChois] = useState("Artist");
    const navigate = useNavigate();

    // const AcountRefs = useRef({Artist: null, Visitor: null});

    // useEffect(()=>{

    // },[])


    const InfoFieldsList = ({Registration}) =>
    {
        return(
            <>
                <div className={` w-full flex justify-center items-center flex-col gap-4 `}>
                    { 
                        Registration ?
                        (
                            <>
                                <InfoField fieldName={'NOM'}/>
                                <InfoField fieldName={'PRENOM'}/>
                                <InfoField fieldName={'E-MAIL'}/>
                                <InfoField fieldName={'MOT DE PASSE'}/>
                                { (AcountChoise === "Artist") && (<InfoField fieldName={'DATE DE NAISSANCE'}/>)}
                            </>
                        ):
                        (
                            <>
                                <InfoField fieldName={'E-MAIL'}/>
                                <InfoField fieldName={'MOT DE PASSE'}/>
                            </>
                        )
                    }
                </div>            
            </>
        );
    }

    const Connection = () =>
    {
        if(!Registration)
        {
            if(AcountChoise === "Artist") navigate('/artist');
            else if (AcountChoise === "Visitor") navigate("/visitor");
        }
        else setRegistrationSate(false);
    }

    const Inscription = () =>
    {
        if(Registration)
        {
            if(AcountChoise === "Artist") navigate("/artist");
            else if (AcountChoise === "Visitor") navigate("/visitor");
        }
        else setRegistrationSate(true);
    }

    const BottomButtons = () =>
    {
        return(
            <div className={` flex justify-center gap-30  mt-[15px] mb-[10px]`}>
                <Buttons name={'SE CONNETER'} className={`w-[150px] justify-center h-[40px]`} func={()=>{Connection()}}/>
                <Buttons name={"S'INSCRIRE"} className={`w-[150px] justify-center h-[40px]`} func={()=>{Inscription()}}/>
            </div>
        );
    }

    return(
        <>
            <div className={`w-full min-h-screen  flex items-center justify-center`}>
                <div className={` rounded-[20px]  w-[550px] p-[15px] pt-0 border-3 border-[rgba(255,215,0,0.6)]`}>
                    <div className={` flex justify-center`}>
                        <div className=
                         {` border  hover:cursor-pointer bg-black
                         border-r-[rgba(255,215,0,0.6)] border-b-[rgba(255,215,0,0.6)] 
                         border-l-[rgba(255,215,0,0.6)] rounded-bl-[20px] border-t-3 
                         border-t-[rgba(255,215,0,0.6)]  w-[75px] `}
                        //  ref={current => AcountRefs.current.Artist = current}
                        onClick={()=>{setAcountChois("Artist")}}
                        >
                            <p className={` font-[Afrik] text-center text-[12px] text-white`}>ARTIST</p>
                        </div>

                        <div className=
                         {` border hover:cursor-pointer bg-black rounded-br-[20px] 
                         border-b-[rgba(255,215,0,0.6)] border-r-[rgba(255,215,0,0.6)] 
                         border-l-[rgba(255,215,0,0.6)] border-t-3 
                         border-t-[rgba(255,215,0,0.6)]  w-[75px] `}
                        //  ref={current => AcountRefs.current.Visitor = current}
                        onClick={()=>{setAcountChois("Visitor")}}
                        >
                            <p className={`font-[Afrik] text-center text-[12px] text-white`}>VISITEUR</p>
                        </div>
                    </div>

                    <div className={` w-full flex justify-center items-center mb-[20px] `}>
                        <p className={` font-[Afrik] text-center underline text-[35px]`}>
                            {
                                Registration ? ("S'INSCRIRE") : ("SE CONNETER")
                            }
                        </p>
                    </div>

                    <InfoFieldsList Registration={Registration}/>
                    <BottomButtons/>                    
                </div>
            </div>
        </>
    );
}