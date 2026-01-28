
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
  renderActivitiesTable,
  renderMedicalCount,
  renderMedicalTable,
  renderProfileError,
} from "../components/ProfileView.js";
import {
  ACTIVITY_CSV_COLUMNS,
  MEDICAL_CSV_COLUMNS,
  normalizeActivityRows,
  normalizeMedicalRows,
  buildProfilePDFHtml,
} from "../utils/profileExport.js";

export function initProfileController() {
  // Check if we're on the profile page
  if (!document.getElementById("basicDetails")) {
    console.log("ℹ️ Not profile page → skipping profileController");
    return;
  }

  console.log("Profile controller initialized");
  
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  
  if (!userId) {
    renderProfileError("No user ID provided in URL.");
    return;
  }

  loadProfile(userId);
}

async function loadProfile(userId) {
  setProfileLoading(true);
  
  try {
    console.log(`🔍 Loading profile for user: ${userId}`);

    // Fetch all data in parallel
    const [user, activities, medical] = await Promise.all([
      fetchUserById(userId),
      fetchActivitiesForUser(userId),
      fetchMedicalForUser(userId),
    ]);

    console.log("User data:", user);
    console.log("Activities:", activities);
    console.log("Medical:", medical);

    if (!user) {
      throw new Error("User not found");
    }

    // Render all sections
    renderUserBasic(user);
    
    renderActivityCount(activities?.length || 0);
    renderActivitiesTable(activities || []);

    renderMedicalCount(medical?.length || 0);
    renderMedicalTable(medical || []);

    // Setup export buttons
    setupExportButtons(user, activities || [], medical || []);
    
    console.log("✅ Profile loaded successfully");
    
  } catch (err) {
    console.error("❌ Error loading profile:", err);
    renderProfileError(err.message);
  } finally {
    setProfileLoading(false);
  }
}

function setupExportButtons(user, activities, medical) {
  // Export complete profile as PDF
  const pdfBtn = $("profileExportPdfBtn");
  if (pdfBtn) {
    pdfBtn.onclick = () => {
      const html = buildProfilePDFHtml(user, activities, medical);
      exportToPDF(`User_${user.user_id}_Profile`, html);
    };
  }

  // Export activities as CSV
  const activityCsvBtn = $("activityExportCsvBtn");
  if (activityCsvBtn) {
    activityCsvBtn.onclick = () => {
      exportToCSV(
        `user_${user.user_id}_activities.csv`,
        normalizeActivityRows(activities),
        ACTIVITY_CSV_COLUMNS
      );
    };
  }

  // Export medical records as CSV
  const medicalCsvBtn = $("medicalExportCsvBtn");
  if (medicalCsvBtn) {
    medicalCsvBtn.onclick = () => {
      exportToCSV(
        `user_${user.user_id}_medical.csv`,
        normalizeMedicalRows(medical),
        MEDICAL_CSV_COLUMNS
      );
    };
  }
}

export default { initProfileController };