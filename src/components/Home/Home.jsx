import Navbar from '../Global_Component/Navbar.jsx';
import Buttons from '../Global_Component/Buttons.jsx';
import { useState, useRef, useEffect } from "react";
import introVideo from "../../assets/intro.mp4" ;
import background from "../../assets/HOME.jpg" ;
import { ArrowDownRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [videoEnded, setVideoEnded] = useState(
    () => sessionStorage.getItem("introPlayed") === "true"
  );
  const [transitioning, setTransitioning] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Autoplay bloqué :", e));
    }
  }, []);

  const handleVideoEnd = () => {
    sessionStorage.setItem("introPlayed", "true");
    setTransitioning(true);
    setTimeout(() => {
      setVideoEnded(true);
      setTransitioning(false);
    }, 800);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {!videoEnded && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700
                      ${transitioning ? "opacity-0" : "opacity-100"}`}
          src={introVideo}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        />
      )}

      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-700
                    ${videoEnded ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
      >
        <Navbar Home={true} isConnected={false} />
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="text-center mb-8 absolute top-[20%] left-[5%] w-[650px]" style={{textShadow : "#393533c4 3px 3px 5px"}}>
                <h1 className="font-[Afrik] text-[38px] mb-4 text-justify">Welcome to KZB E-<span style={{color : "white", textShadow : "#ffffffad 3px 3px 5px"}}>Gallery</span></h1>
                <p className="font-[Afrik] text-[18px] mb-8 text-justify">
                  Entre héritage sacré et audac<span style={{color : "white", textShadow : "#ffffffad 3px 3px 5px"}}>e contemporaine, KZB</span> Galerie dévoile l’âme de l’art <span style={{color : "white"}}>africain. Explorez une </span>collection unique où la force d<span style={{color : "white", textShadow : "#ffffffad 3px 3px 5px"}}>es traditions rencontre</span> l’énergie brute de la création m<span style={{color : "white", textShadow : "#ffffffad 3px 3px 5px"}}>oderne.</span>
                </p>
            </div>
            <Buttons func={() => navigate('/gallery')} name={"Discover"} icon={ArrowDownRight} className="absolute bottom-[50px] right-[50px] p-[20px] text-[20px]" />
        </div>
      </div>
    </div>
  );
}

export default Home;