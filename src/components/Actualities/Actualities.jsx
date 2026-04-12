import { useRef, useState } from 'react';
import { Cadre } from '../Global/Cadre';

import wale  from '../../assets/wale.png'
import bird  from '../../assets/bird.png'
import apple from '../../assets/apple.png'
import Coffee from '../../assets/coffee.png'
import test from '../../assets/test.mp4';

export function ActualityCadres ({Artist_type})
{
    const [ CadreArray , setCadrsArray ] = useState([
        {
            Text: "hummmmmmmmmm",
            Path: wale,
            Position: "middle",
            My: 'my-[6px]',
            ContentType: "image",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: bird,
            Position: "first",
            My: 'my-[6px]',
            ContentType: "image",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: apple,
            Position: "middle",
            My: 'my-[6px]',
            ContentType: "image",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: wale,
            Position: "middle",
            My: 'my-[6px]',
            ContentType: "image",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: bird,
            Position: "middle",
            My: 'my-[6px]',
            ContentType: "image",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: Coffee,
            Position: "middle",
            My: 'my-[6px]',
            ContentType: "image",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: test,
            Position: "last",
            My: 'my-[6px]',
            ContentType: "video",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: wale,
            Position: "middle",
            My: 'my-[6px]',
            ContentType: "image",
            key: crypto.randomUUID()
        },
        {
            Text: "lasdf;lsadhflksjhfksj",
            Path: wale,
            Position: "middle",
            My: 'my-[6px]',
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
            <div className={`flex border-2 w-full h-[300px] gap-[25px] bg-black`}>
                {Display()}
            </div>
            
        </>
    );

}
