import Navbar from '../Global_Component/Navbar.jsx';
import { useState, useRef, useEffect } from "react";
import introVideo from "../../assets/intro.mp4" ;
import background from "../../assets/HOME.jpg" ;

function Home() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Autoplay bloqué :", e));
    }
  }, []);

  const handleVideoEnd = () => {
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
        <Navbar Home={true} />
        
      </div>

    </div>
  );
}

export default Home;