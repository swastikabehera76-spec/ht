// Fallback-safe API URL
const API_URL = window.ENV?.USERS_API || "/users";

async function safeJson(res) {
  try {
    return await res.json();
  } catch (err) {
    return null;
  }
}

/* Get all users */
export async function apiGetAll() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    console.error("Failed to fetch users");
    return [];
  }

  const data = await safeJson(res);
  return Array.isArray(data) ? data : [];
}

/* Get one user */
export async function apiGetOne(id) {
  if (!id) return null;

  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) return null;

  return safeJson(res);
}

/* Create user */
export function apiCreate(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

/* Update user */
export function apiUpdate(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

/* Delete user */
export function apiDelete(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
