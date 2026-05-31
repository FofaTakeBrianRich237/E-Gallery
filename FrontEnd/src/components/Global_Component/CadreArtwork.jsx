import { useState } from 'react';
import cadre from "../../assets/cadre.png" ;

function Artwork({Image, classname}) {
    return (
    <div className={classname} style={{ position: "relative", display: "inline-block" }}>
      
      {/* Calque 1 : l'image de fond */}
      <img src={Image} alt="fond" style={{ display: "block", width: "200px", height: "200px" }}/>

      {/* Calque 2 : le cadre par-dessus */}
      <img src={cadre} style={{position: "absolute", inset: 0, width: "110%", height: "101%",}} />
    </div>
    );
};

export default Artwork;