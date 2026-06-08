// ─── api.js — Service centralisé pour toutes les requêtes Django ──────────────
// Base URL de ton backend Django
const BASE_URL = "http://127.0.0.1:8000/api";

// ─── Helper fetch ─────────────────────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Erreur ${res.status}`);
  }
  return res.json();
}

// ─── ARTWORKS ─────────────────────────────────────────────────────────────────

// GET /api/Artwork/
// Retourne: [{ id, nameArt, ImageUrl, Description, nbr_likes, nbr_comment, categorie, id_artist, comments }]
export const getAllArtworks = () => apiFetch("/Artwork/");

// GET /api/Artwork/artiste/<id_artiste>/
// Retourne: [{ id, name, ImageUrl, nbr_likes, nbr_comment, categorie }]
export const getArtistArtworks = (id_artiste) =>
  apiFetch(`/Artwork/artiste/${id_artiste}/`);

// GET /api/Artwork/comments/<id_artwork>/
// Retourne: [{ content, id_user }]
export const getArtworkComments = (id_artwork) =>
  apiFetch(`/Artwork/comments/${id_artwork}/`);

// ─── USERS ────────────────────────────────────────────────────────────────────

// GET /api/users/
// Retourne: [{ id, nom, prenom, email, dateInscription, telephone, categorie }]
export const getAllUsers = () => apiFetch("/users/");

// GET /api/user/<nom>/<password>/
// Retourne: { id, nom, prenom, email, date_Inscription, tel, categorie, ...si artiste: id_artist, nbr_oeuvres, nbr_followers, date_naissance }
export const loginUser = (nom, password) =>
  apiFetch(`/user/${encodeURIComponent(nom)}/${encodeURIComponent(password)}/`);

// POST /api/adduser/
// Body: { nom, prenom, password, email, tel, categorie, profil }
// Retourne: { message, _id }
export const registerUser = (userData) =>
  apiFetch("/adduser/", {
    method: "POST",
    body: JSON.stringify(userData),
  });

// ─── POSTS ────────────────────────────────────────────────────────────────────

// GET /api/post/
// Retourne: [{ id, content, id_artist, id_user, profil, nom, prenom }]
export const getAllPosts = () => apiFetch("/post/");

// GET /api/post/comments/<id_post>/
// Retourne: [{ content, id_user }]
export const getPostComments = (id_post) =>
  apiFetch(`/post/comments/${id_post}/`);
