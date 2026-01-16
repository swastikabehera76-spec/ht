// frontend/assets/js/services/JoinService.js 

const API_URL = "/api/report";
async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return [];
  }
}

export async function apiGetReport() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}
