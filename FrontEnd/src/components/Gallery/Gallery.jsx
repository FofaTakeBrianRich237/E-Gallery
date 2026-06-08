import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '../Global_Component/Navbar.jsx';
import SearchBar from '../Global_Component/searchBar.jsx';
import ArtworkFrame from '../Global_Component/CadreArtwork.jsx';
import { useArtworks } from '../../services/useApi.jsx';

const SIDE_CONFIGS = [
  { z: 0,    scale: 0.72, opacity: 0.95, zIndex: 8  },
  { z: -180, scale: 0.55, opacity: 0.7,  zIndex: 6  },
  { z: -320, scale: 0.4,  opacity: 0.4,  zIndex: 4  },
  { z: -440, scale: 0.28, opacity: 0.15, zIndex: 2  },
];

function getSideStyle(rank) {
  const cfg = SIDE_CONFIGS[Math.min(rank, SIDE_CONFIGS.length - 1)];
  return {
    position: 'absolute', top: '50%', left: '50%',
    transform: `translate(-50%, -50%) translateZ(${cfg.z}px) scale(${cfg.scale})`,
    opacity: cfg.opacity, zIndex: cfg.zIndex,
    transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.65s ease',
    cursor: rank === 0 ? 'pointer' : 'default',
    pointerEvents: rank === 0 ? 'auto' : 'none',
  };
}

function SideCorridor({ artworks, rotY }) {
  if (!artworks || artworks.length === 0) return null;
  return (
    <div style={{ position: 'relative', width: 220, height: 280, transformStyle: 'preserve-3d', transform: `rotateY(${rotY}deg) rotateX(8deg)`, flexShrink: 0 }}>
      {artworks.map((artwork, index) => (
        <div key={artwork.id ?? index} style={getSideStyle(index)}>
          <ArtworkFrame imageUrl={artwork.ImageUrl} size={180} />
        </div>
      ))}
    </div>
  );
}

function CentralArtwork({ artwork, liked, likesCount, onLike, onComment }) {
  if (!artwork) return null;
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 20, flexShrink: 0 }}>
      {/* Halo */}
      <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,220,120,0.18) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -52%)', pointerEvents: 'none' }} />
      <div style={{ filter: 'drop-shadow(0 8px 40px rgba(255,200,80,0.25))' }}>
        <ArtworkFrame imageUrl={artwork.ImageUrl} size={260} />
      </div>
      <div style={{ marginTop: 28, textAlign: 'center', color: '#fff', maxWidth: 280 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 4px', letterSpacing: 1, fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f5e6c8' }}>
          {artwork.nameArt}
        </h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 8px', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'monospace' }}>
          {artwork.categorie || 'Oeuvre'}
        </p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: '0 0 20px' }}>
          {artwork.Description}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={onLike} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 24, border: liked ? '1px solid #e84c6a' : '1px solid rgba(255,255,255,0.2)', background: liked ? 'rgba(232,76,106,0.18)' : 'rgba(255,255,255,0.06)', color: liked ? '#e84c6a' : 'rgba(255,255,255,0.75)', fontSize: 13, cursor: 'pointer' }}>
            <span>{liked ? '❤️' : '🤍'}</span> {likesCount}
          </button>
          <button onClick={onComment} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 24, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.75)', fontSize: 13, cursor: 'pointer' }}>
            <span>💬</span> Commenter ({artwork.nbr_comment ?? 0})
          </button>
        </div>
      </div>
    </div>
  );
}

function CommentPopup({ artwork, onClose, onSubmit }) {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  if (!artwork) return null;

  // accepte { content, id_user } ou { text, author, date }
  const comments = (artwork.comments ?? []).map((c, i) => ({
    key:     i,
    author:  c.author   || 'Anonyme',
    content: c.content  || c.text || '',
    date:    c.date     || '',
  }));

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit({ author: author.trim() || 'Anonyme', content: text.trim(), date: new Date().toLocaleDateString('fr-FR') });
    setText(''); setAuthor('');
  };

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
      <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, width: '90%', maxWidth: 460, padding: 28, color: '#fff' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#f5e6c8' }}>Commentaires</h3>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{artwork.nameArt}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#aaa', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 18 }}>×</button>
        </div>

        {/* Liste */}
        <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 20 }}>
          {comments.length === 0
            ? <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, textAlign: 'center', padding: '20px 0', fontStyle: 'italic' }}>Aucun commentaire.</p>
            : comments.map((c) => (
              <div key={c.key} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '10px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#f5e6c8' }}>{c.author}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{c.date}</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{c.content}</p>
              </div>
            ))
          }
        </div>

        {/* Formulaire */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
          <input type="text" placeholder="Votre nom (optionnel)" value={author} onChange={(e) => setAuthor(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 13, marginBottom: 10, outline: 'none' }} />
          <textarea placeholder="Votre commentaire..." value={text} onChange={(e) => setText(e.target.value)} rows={3}
            style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 13, resize: 'vertical', outline: 'none', marginBottom: 12 }} />
          <button onClick={handleSubmit} disabled={!text.trim()} style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', background: text.trim() ? 'rgba(245,230,200,0.9)' : 'rgba(255,255,255,0.1)', color: text.trim() ? '#111' : 'rgba(255,255,255,0.3)', fontSize: 14, fontWeight: 600, cursor: text.trim() ? 'pointer' : 'not-allowed' }}>
            Publier
          </button>
        </div>
      </div>
    </div>
  );
}

// Garantit que tous les champs existent et ont le bon type
function normalizeArtwork(a, index) {
  return {
    ...a,
    id:          a.id          ?? String(index),
    nameArt:     a.nameArt     || `Oeuvre ${index + 1}`,
    ImageUrl:    a.ImageUrl    || '',
    Description: a.Description || '',
    categorie:   a.categorie   || '',
    nbr_likes:   Number(a.nbr_likes)   || 0,
    nbr_comment: Number(a.nbr_comment) || 0,
    comments:    Array.isArray(a.comments) ? a.comments : [],
  };
}

export default function Gallery() {
  const { artworks: rawArtworks, loading, error } = useArtworks();

  const [artworks, setArtworks]         = useState([]);
  const [offset, setOffset]             = useState(0);
  const [likes, setLikes]               = useState({});
  const [commentPopup, setCommentPopup] = useState(false);
  const scrollLock = useRef(false);

  // ✅ Normalisation à la réception — plus aucun champ ne peut être undefined
  useEffect(() => {
    if (rawArtworks && rawArtworks.length > 0) {
      const normalized = rawArtworks.map(normalizeArtwork);
      setArtworks(normalized);
      const initLikes = {};
      normalized.forEach((a) => { initLikes[a.id] = { liked: false, count: a.nbr_likes }; });
      setLikes(initLikes);
    }
  }, [rawArtworks]);

  const avancer = useCallback(() => {
    if (scrollLock.current) return;
    scrollLock.current = true;
    setOffset((o) => o + 1);
    setTimeout(() => { scrollLock.current = false; }, 700);
  }, []);

  const reculer = useCallback(() => {
    if (scrollLock.current || artworks.length === 0) return;
    scrollLock.current = true;
    setOffset((o) => (o - 1 + artworks.length) % artworks.length);
    setTimeout(() => { scrollLock.current = false; }, 700);
  }, [artworks.length]);

  useEffect(() => {
    const onWheel = (e) => { e.preventDefault(); if (e.deltaY > 0) avancer(); else reculer(); };
    const onKey   = (e) => {
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  reculer();
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') avancer();
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onKey); };
  }, [avancer, reculer]);

  const total          = artworks.length;
  const centralIndex   = total > 0 ? offset % total : 0;
  const centralArtwork = artworks[centralIndex] ?? null;
  const gauche = total > 0 ? Array.from({ length: 4 }, (_, i) => artworks[(centralIndex + i + 1) % total]) : [];
  const droite = total > 0 ? Array.from({ length: 4 }, (_, i) => artworks[(centralIndex - i - 1 + total) % total]) : [];

  const handleLike = () => {
    if (!centralArtwork) return;
    const id = centralArtwork.id;
    setLikes((prev) => ({
      ...prev,
      [id]: { liked: !prev[id]?.liked, count: (prev[id]?.count ?? 0) + (prev[id]?.liked ? -1 : 1) },
    }));
  };

  const handleAddComment = (comment) => {
    if (!centralArtwork) return;
    setArtworks((prev) =>
      prev.map((a) =>
        a.id === centralArtwork.id ? { ...a, comments: [...a.comments, comment], nbr_comment: a.nbr_comment + 1 } : a
      )
    );
  };

  if (loading) return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: 'rgba(255,255,255,0.4)', fontSize: 12, letterSpacing: 4 }}>
      CHARGEMENT...
    </div>
  );

  if (error) return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#ff4444', fontSize: 14, textAlign: 'center', padding: 20 }}>
      {error}
    </div>
  );

  const likeState = centralArtwork ? (likes[centralArtwork.id] ?? { liked: false, count: 0 }) : null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', overflow: 'hidden' }}>
      <Navbar Home={false} isConnected={false} />
      <SearchBar />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, #1a1205 0%, #0a0a0a 60%, #000 100%)', zIndex: 0 }} />

      {/* Scène 3D */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1100px', perspectiveOrigin: '50% 40%', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 80, transformStyle: 'preserve-3d' }}>
          <div style={{ transformStyle: 'preserve-3d' }}><SideCorridor artworks={gauche} rotY={38} /></div>
          <CentralArtwork artwork={centralArtwork} liked={likeState?.liked} likesCount={likeState?.count} onLike={handleLike} onComment={() => setCommentPopup(true)} />
          <div style={{ transformStyle: 'preserve-3d' }}><SideCorridor artworks={droite} rotY={-38} /></div>
        </div>
      </div>

      {/* Indicateurs */}
      {total > 0 && (
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 10 }}>
          {artworks.map((_, i) => (
            <div key={i} onClick={() => setOffset(i)} style={{ width: i === centralIndex ? 28 : 6, height: 6, borderRadius: 3, background: i === centralIndex ? '#f5e6c8' : 'rgba(255,255,255,0.2)', transition: 'all 0.4s ease', cursor: 'pointer' }} />
          ))}
        </div>
      )}

      {/* Flèches */}
      {['left', 'right'].map((dir) => (
        <button key={dir} onClick={dir === 'left' ? reculer : avancer}
          style={{ position: 'absolute', top: '50%', [dir]: 24, transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 20, cursor: 'pointer', zIndex: 10 }}>
          {dir === 'left' ? '‹' : '›'}
        </button>
      ))}

      {/* Popup */}
      {commentPopup && (
        <CommentPopup
          artwork={centralArtwork}
          onClose={() => setCommentPopup(false)}
          onSubmit={handleAddComment}
        />
      )}
    </div>
  );
}