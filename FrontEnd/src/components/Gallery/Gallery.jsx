import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '../Global_Component/Navbar.jsx';
import SearchBar from '../Global_Component/searchBar.jsx';
import Artwork from '../Global_Component/CadreArtwork.jsx';

// ─── Configuration des rangs de profondeur ──────────────────────────────────────────
const RANG_CONFIGS = [
  { z: 0,    scale: 1,    opacity: 1,   zIndex: 10 },
  { z: -280, scale: 0.78, opacity: 0.9, zIndex: 8  },
  { z: -520, scale: 0.58, opacity: 0.7, zIndex: 6  },
  { z: -720, scale: 0.42, opacity: 0.4, zIndex: 4  },
  { z: -880, scale: 0.3,  opacity: 0,   zIndex: 2  },
];

function getRangStyle(rang) {
  const cfg = RANG_CONFIGS[Math.min(rang, RANG_CONFIGS.length - 1)];
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%) translateZ(${cfg.z}px) scale(${cfg.scale})`,
    opacity: cfg.opacity,
    zIndex: cfg.zIndex,
    transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.65s ease",
  };
}

// ─── Couloir ─────────────────────────────────────────────────────────────────
function Couloir({ artworks, offset, rotY, rotX }) {
  const total = artworks.length;
  if (total === 0) return null;

  return (
    <div style={{
      position: "relative",
      width: 220,
      height: 280,
      transformStyle: "preserve-3d",
      transform: `rotateY(${rotY}deg) rotateX(${rotX}deg)`,
    }}>
      {artworks.map((artwork, index) => {
        const rang = (index - offset % total + total) % total;
        return (
          <div key={artwork.id} style={getRangStyle(rang)}>
            <Artwork
              Image={artwork.ImageUrl}   // adapte ce champ selon ce que retourne ton API
              style={{ width: 200 }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── Loader ───────────────────────────────────────────────────────────────────
function Loader() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "black", color: "white", fontSize: 14, letterSpacing: 2,
    }}>
      Chargement...
    </div>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
function Gallery() {
  const [artworks, setArtworks]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [erreur, setErreur]       = useState(null);
  const [offset, setOffset]       = useState(0);
  const scrollLock                = useRef(false);

  // ── Fetch au montage ───────────────────────────────────────────────────────
  useEffect(() => {
    async function charger() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/Artwork/");
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        const data = await res.json();
        setArtworks(data);
      } catch (e) {
        setErreur(e.message);
      } finally {
        setLoading(false);
      }
    }
    charger();
  }, []);

  // ── Scroll ─────────────────────────────────────────────────────────────────
  const avancer = useCallback(() => {
    if (scrollLock.current) return;
    scrollLock.current = true;
    setOffset(o => o + 1);
    setTimeout(() => { scrollLock.current = false; }, 700);
  }, []);

  const reculer = useCallback(() => {
    if (scrollLock.current) return;
    scrollLock.current = true;
    setOffset(o => Math.max(0, o - 1));
    setTimeout(() => { scrollLock.current = false; }, 700);
  }, []);

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) avancer();
      else reculer();
    };
    const onKey = (e) => {
      if (e.key === "ArrowUp"   || e.key === "ArrowLeft")  reculer();
      if (e.key === "ArrowDown" || e.key === "ArrowRight") avancer();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [avancer, reculer]);

  // ── Fenêtre glissante de 8 ─────────────────────────────────────────────────
  // On découpe le tableau en 8 éléments à partir de l'offset
  // avec boucle infinie via modulo sur les index
  const SIZE = 8;
  const total = artworks.length;

  // Produit un tableau de SIZE éléments qui boucle sur artworks
  const fenetre = total === 0
    ? []
    : Array.from({ length: SIZE }, (_, i) => artworks[(offset + i) % total]);

  // 4 pour le couloir gauche, 4 pour le couloir droit
  const gauche = fenetre.slice(0, 4);
  const droite = fenetre.slice(4, 8);

  // ── Rendu ──────────────────────────────────────────────────────────────────
  if (loading) return <Loader />;

  if (erreur) return (
    <div style={{
      position: "absolute", inset: 0, display: "flex",
      alignItems: "center", justifyContent: "center",
      background: "black", color: "#ff4444", fontSize: 14,
    }}>
      {erreur}
    </div>
  );

  return (
    <div>
      <Navbar Home={false} isConnected={false} />
      <SearchBar />

      {/* Fond noir */}
      <div
        className="absolute inset-0 w-full h-full z-[-100]"
        style={{ background: "black" }}
      />

      {/* Scène 3D */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 200,
        perspective: "1200px",
        perspectiveOrigin: "50% 50%",
      }}>

        {/* Couloir gauche */}
        <Couloir
          artworks={gauche}
          offset={offset}
          rotY={40}
          rotX={10}
        />

        {/* Couloir droit */}
        <Couloir
          artworks={droite}
          offset={offset}
          rotY={-40}
          rotX={10}
        />

      </div>

      {/* Indicateur de progression */}
      {total > 0 && (
        <div style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
        }}>
          {artworks.map((_, i) => {
            const actif = i === offset % total;
            return (
              <div key={i} style={{
                width: actif ? 24 : 6,
                height: 6,
                borderRadius: 3,
                background: actif ? "#fff" : "rgba(255,255,255,0.25)",
                transition: "all 0.4s ease",
              }} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Gallery;