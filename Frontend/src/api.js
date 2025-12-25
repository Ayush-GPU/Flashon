const API = "https://flashon-backend.onrender.com";


/* ---------- helper ---------- */
async function request(url, options = {}) {
  const res = await fetch(url, options);

  let data = {};
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    throw new Error(data.detail || "Request failed");
  }

  return data;
}

/* ---------- AUTH ---------- */
export async function signup(email, password) {
  return request(`${API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export async function login(email, password) {
  return request(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

/* ---------- FLASHCARDS ---------- */
export async function generateDeck(content) {
  return request(`${API}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ content }),
  });
}

export async function getDeck(deckId) {
  return request(`${API}/deck/${deckId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
