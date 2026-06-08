// ─── useApi.js — Hooks React pour chaque page ────────────────────────────────
import { useState, useEffect, useCallback } from "react";
import {
  getAllArtworks,
  getArtistArtworks,
  getArtworkComments,
  getAllUsers,
  loginUser,
  registerUser,
  getAllPosts,
  getPostComments,
} from "./api.jsx";

// ─── Hook générique ───────────────────────────────────────────────────────────
function useAsync(asyncFn, deps = []) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    asyncFn()
      .then((d) => { if (!cancelled) setData(d); })
      .catch((e) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, deps);

  return { data, loading, error };
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOK — GALLERY (toutes les œuvres)
// Usage : const { artworks, loading, error } = useArtworks();
// ─────────────────────────────────────────────────────────────────────────────
export function useArtworks() {
  const { data, loading, error } = useAsync(getAllArtworks, []);

  // Normalise les champs pour correspondre à ce qu'attend Gallery.jsx
  const artworks = (data ?? []).map((a) => ({
    ...a,
    nameArt:     a.nameArt     || "Sans titre",
    Description: a.Description || "",
    ImageUrl:    a.ImageUrl    || "",
    nbr_likes:   a.nbr_likes   ?? 0,
    nbr_comment: a.nbr_comment ?? 0,
    comments:    a.comments    ?? [],
  }));

  return { artworks, loading, error };
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOK — ARTWORKS D'UN ARTISTE
// Usage : const { artworks, loading, error } = useArtistArtworks(id_artiste);
// ─────────────────────────────────────────────────────────────────────────────
export function useArtistArtworks(id_artiste) {
  const { data, loading, error } = useAsync(
    () => getArtistArtworks(id_artiste),
    [id_artiste]
  );

  const artworks = (data ?? []).map((a) => ({
    ...a,
    nameArt:   a.name      || a.nameArt || "Sans titre",
    ImageUrl:  a.ImageUrl  || "",
    nbr_likes: a.nbr_likes ?? 0,
  }));

  return { artworks, loading, error };
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOK — COMMENTAIRES D'UNE ŒUVRE
// Usage : const { comments, loading, refetch } = useArtworkComments(id_artwork);
// refetch() recharge les commentaires (utile après ajout)
// ─────────────────────────────────────────────────────────────────────────────
export function useArtworkComments(id_artwork) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetch = useCallback(() => {
    if (!id_artwork) return;
    setLoading(true);
    getArtworkComments(id_artwork)
      .then((data) => {
        // Normalise : { content, id_user } → { content, id_user, author }
        setComments(
          data.map((c) => ({
            content: c.content || "",
            id_user: c.id_user || "",
            author:  c.author  || "Anonyme",
          }))
        );
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id_artwork]);

  useEffect(() => { fetch(); }, [fetch]);

  return { comments, loading, error, refetch: fetch };
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOK — AUTH (connexion)
// Usage :
//   const { user, loading, error, login, logout } = useAuth();
//   await login("KWAME", "monpassword");
// ─────────────────────────────────────────────────────────────────────────────
export function useAuth() {
  // Persistance simple dans sessionStorage
  const [user, setUser]       = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("kzb_user")) || null; }
    catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const login = useCallback(async (nom, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(nom, password);

      if (!data || Object.keys(data).length === 0) {
        throw new Error("Nom ou mot de passe incorrect");
      }

      // data contient: { id, nom, prenom, email, categorie, ...si artiste }
      setUser(data);
      sessionStorage.setItem("kzb_user", JSON.stringify(data));
      return data;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("kzb_user");
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registerUser(userData);
      return data;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Helpers dérivés
  const isConnected = !!user;
  const isArtist    = user?.categorie === "artiste";
  const isAdmin     = user?.categorie === "admin";

  return { user, loading, error, login, logout, register, isConnected, isArtist, isAdmin };
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOK — POSTS (Actualities)
// Usage : const { posts, loading, error } = usePosts();
// ─────────────────────────────────────────────────────────────────────────────
export function usePosts() {
  const { data, loading, error } = useAsync(getAllPosts, []);

  // Normalise les champs pour CadreExpo / CadreActu / CadreVente
  const posts = (data ?? []).map((p) => ({
    id:      p.id      || "",
    content: p.content || "",
    imageUrl: p.imageUrl || "",
    nbr_likes:   p.nbr_likes   ?? 0,
    nbr_comment: p.nbr_comment ?? 0,
    id_artist: p.id_artist || "",
    id_user:   p.id_user   || "",
    profil:    p.profil    || "",
    nom:       p.nom       || "",
    prenom:    p.prenom    || "",
    // Initiales pour ShortName
    shortName: `${(p.nom   || "?")[0]}${(p.prenom || "?")[0]}`.toUpperCase(),
  }));

  return { posts, loading, error };
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOK — UTILISATEURS (Admin)
// Usage : const { users, loading, error } = useUsers();
// ─────────────────────────────────────────────────────────────────────────────
export function useUsers() {
  const { data, loading, error } = useAsync(getAllUsers, []);

  const users = (data ?? []).map((u) => ({
    id:              u.id              || "",
    nom:             u.nom             || "",
    prenom:          u.prenom          || "",
    email:           u.email           || "",
    telephone:       u.telephone       || "",
    categorie:       u.categorie       || "",
    dateInscription: u.dateInscription || "",
    shortName: `${(u.nom || "?")[0]}${(u.prenom || "?")[0]}`.toUpperCase(),
  }));

  return { users, loading, error };
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOK — COMMENTAIRES D'UN POST
// Usage : const { comments, loading } = usePostComments(id_post);
// ─────────────────────────────────────────────────────────────────────────────
export function usePostComments(id_post) {
  const { data, loading, error } = useAsync(
    () => getPostComments(id_post),
    [id_post]
  );

  const comments = (data ?? []).map((c) => ({
    content: c.content || "",
    id_user: c.id_user || "",
  }));

  return { comments, loading, error };
}
