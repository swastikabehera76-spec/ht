// frontend/assets/js/controllers/profileController.js

import { $ } from "../utils/dom.js";
import { exportToCSV, exportToPDF } from "../utils/exportTools.js";

import {
  fetchUserById,
  fetchActivitiesForUser,
  fetchMedicalForUser,
} from "../services/profileService.js";

import {
  setProfileLoading,
  renderUserBasic,
  renderActivityCount,
  renderMedicalCount,
  renderActivitiesTable,
  renderMedicalTable,
  renderProfileError,
} from "../components/ProfileView.js";

import {
  PROFILE_CSV_COLUMNS,
  normalizeProfileRows,
  buildProfilePDFHtml,
} from "../utils/profileExport.js";

export async function initProfileController(userId) {
  setProfileLoading(true);

  try {
    // Fetch data from backend (services)
    const [user, activities, medical] = await Promise.all([
      fetchUserById(userId),
      fetchActivitiesForUser(userId),
      fetchMedicalForUser(userId),
    ]);

    if (!user) throw new Error("User not found");

    // Render UI (view)
    renderUserBasic(user);

    renderActivityCount(activities.length);
    renderMedicalCount(medical.length);

    renderActivitiesTable(activities);
    renderMedicalTable(medical);

    // Merge rows for export (activity + medical combined)
    const exportRows = normalizeProfileRows(user, activities, medical);

    // CSV Export Button
    $("profileExportCsvBtn")?.addEventListener("click", () => {
      const filename = `user_${user.id}_health_profile.csv`;
      exportToCSV(filename, exportRows, PROFILE_CSV_COLUMNS);
    });

    // PDF Export Button
    $("profileExportPdfBtn")?.addEventListener("click", () => {
      const html = buildProfilePDFHtml(user, activities, medical);
      exportToPDF(`User ${user.id} Health Profile`, html);
    });

    setProfileLoading(false);
  } catch (err) {
    console.error("[profileController] error:", err);
    renderProfileError();
  }
}

export default { initProfileController };
