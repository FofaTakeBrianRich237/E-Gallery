import { useState } from 'react';
import cadre from "../../assets/cadre.png" ;

function ArtworkFrame({ imageUrl, size = 100 }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img src={imageUrl} alt="artwork" style={{ display: 'block', width: size, height: size, objectFit: 'cover' }} />
      <img src={cadre} alt="" style={{ position: 'absolute', width: '105%', height: '105%', left: '', top: '-5px' }}/>
    </div>
  );
}

export default ArtworkFrame;