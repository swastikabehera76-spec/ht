
// // frontend/assets/js/services/profileService.js
// // Service for fetching user profile data

// export async function fetchUserById(userId) {
//   try {
//     const res = await fetch(`/api/users/${userId}`);
//     if (!res.ok) {
//       console.error(`Failed to fetch user: ${res.status}`);
//       return null;
//     }
//     return await res.json();
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return null;
//   }
// }

// export async function fetchActivitiesForUser(userId) {
//   try {
//     const res = await fetch(`/api/users/${userId}/activities`);
//     if (!res.ok) {
//       console.error(`Failed to fetch activities: ${res.status}`);
//       return [];
//     }
//     return await res.json();
//   } catch (error) {
//     console.error("Error fetching activities:", error);
//     return [];
//   }
// }

// export async function fetchMedicalForUser(userId) {
//   try {
//     const res = await fetch(`/api/users/${userId}/medical`);
//     if (!res.ok) {
//       console.error(`Failed to fetch medical records: ${res.status}`);
//       return [];
//     }
//     return await res.json();
//   } catch (error) {
//     console.error("Error fetching medical records:", error);
//     return [];
//   }
// }



// frontend/assets/js/services/profileService.js
// Service for fetching user profile data

export async function fetchUserById(userId) {
  try {
    const res = await fetch(`/api/users/${userId}`);
    if (!res.ok) {
      console.error(`Failed to fetch user: ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// ✅ FIX: use existing endpoint + filter
export async function fetchActivitiesForUser(userId) {
  try {
    const res = await fetch("/api/activities");
    if (!res.ok) {
      console.error(`Failed to fetch activities: ${res.status}`);
      return [];
    }

    const activities = await res.json();
    return activities.filter(a => a.user_id == userId);
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
}

// ✅ FIX: use existing endpoint + filter
export async function fetchMedicalForUser(userId) {
  try {
    const res = await fetch("/api/medical");
    if (!res.ok) {
      console.error(`Failed to fetch medical records: ${res.status}`);
      return [];
    }

    const medical = await res.json();
    return medical.filter(m => m.user_id == userId);
  } catch (error) {
    console.error("Error fetching medical records:", error);
    return [];
  }
}
