// frontend/assets/js/services/profileService.js
// Only data fetching / shaping (no DOM here)

// -------- Fetch USER by ID --------
export async function fetchUserById(userId) {
  const res = await fetch(`/api/users/${userId}`);
  if (!res.ok) return null;
  return res.json();
}

// -------- Fetch ACTIVITIES for user --------
export async function fetchActivitiesForUser(userId) {
  const res = await fetch(`/api/activities`);
  if (!res.ok) return [];

  const all = await res.json();
  return (all || []).filter((a) => Number(a.user_id) === Number(userId));
}

// -------- Fetch MEDICAL records for user --------
export async function fetchMedicalForUser(userId) {
  const res = await fetch(`/api/medical`);
  if (!res.ok) return [];

  const all = await res.json();
  return (all || []).filter((m) => Number(m.user_id) === Number(userId));
}
