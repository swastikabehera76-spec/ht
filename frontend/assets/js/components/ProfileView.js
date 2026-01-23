
import { $ } from "../utils/dom.js";

// Helper function to show/hide elements
function show(id, yes) {
  const el = $(id);
  if (!el) return;
  el.classList[yes ? "remove" : "add"]("hidden");
}

// Helper function to set text content
function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value ?? "—";
}

// Set loading state for profile sections
export function setProfileLoading(isLoading) {
  // Personal Info Section
  show("personalLoading", isLoading);
  show("personalDetails", !isLoading);
  
  // Activity Section
  show("activityLoading", isLoading);
  show("activityDetails", !isLoading);
  
  // Medical Section
  show("medicalLoading", isLoading);
  show("medicalDetails", !isLoading);
}

// Render user's basic personal information
export function renderUserBasic(user) {
  setText("profile-user-id", user?.user_id ? `#${user.user_id}` : "—");
  setText("profile-name", user?.name ?? "—");
  setText("profile-age", user?.age ? `${user.age} years` : "—");
  setText("profile-gender", user?.gender ?? "—");
  setText("profile-height", user?.height ? `${user.height} cm` : "—");
  setText("profile-weight", user?.weight ? `${user.weight} kg` : "—");
  
  // Calculate BMI if height and weight are available
  if (user?.height && user?.weight) {
    const heightInMeters = user.height / 100;
    const bmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(1);
    setText("profile-bmi", bmi);
    
    // Set BMI status
    let bmiStatus = "Normal";
    if (bmi < 18.5) bmiStatus = "Underweight";
    else if (bmi >= 25 && bmi < 30) bmiStatus = "Overweight";
    else if (bmi >= 30) bmiStatus = "Obese";
    setText("profile-bmi-status", bmiStatus);
  } else {
    setText("profile-bmi", "—");
    setText("profile-bmi-status", "—");
  }
}

// Render user's activity metrics
export function renderUserActivity(user) {
  setText("profile-steps", user?.steps ? formatNumber(user.steps) : "—");
  setText("profile-water", user?.water_intake ? `${user.water_intake} L` : "—");
  setText("profile-calories", user?.calories_burned ? formatNumber(user.calories_burned) : "—");
  
  // Calculate activity level
  const steps = user?.steps || 0;
  let activityLevel = "Sedentary";
  if (steps > 10000) activityLevel = "Very Active";
  else if (steps > 7500) activityLevel = "Active";
  else if (steps > 5000) activityLevel = "Moderately Active";
  else if (steps > 2500) activityLevel = "Lightly Active";
  
  setText("profile-activity-level", activityLevel);
}

// Render user's medical information
export function renderUserMedical(user) {
  setText("profile-disease", user?.disease || "No records");
  setText("profile-genetic", user?.genetic_disease || "No records");
  setText("profile-allergies", user?.allergies || "No records");
  
  // Count medical issues
  let medicalCount = 0;
  if (user?.disease && user.disease !== "None") medicalCount++;
  if (user?.genetic_disease && user.genetic_disease !== "None") medicalCount++;
  if (user?.allergies && user.allergies !== "None") medicalCount++;
  
  setText("profile-medical-count", medicalCount);
}

// Render complete user profile
export function renderUserProfile(user) {
  if (!user) {
    renderProfileError();
    return;
  }
  
  setProfileLoading(false);
  renderUserBasic(user);
  renderUserActivity(user);
  renderUserMedical(user);
}

// Handle profile errors
export function renderProfileError() {
  setProfileLoading(false);
  setText("profile-user-id", "Error");
  setText("profile-name", "Unable to load profile");
  setText("profile-age", "—");
  setText("profile-gender", "—");
  setText("profile-height", "—");
  setText("profile-weight", "—");
  setText("profile-steps", "—");
  setText("profile-water", "—");
  setText("profile-calories", "—");
  setText("profile-disease", "Error loading data");
  setText("profile-genetic", "Error loading data");
  setText("profile-allergies", "Error loading data");
}

// Format number with commas
function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

// Open profile modal
export function openProfileModal() {
  const modal = $("profileModal");
  if (modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = 'hidden';
  }
}

// Close profile modal
export function closeProfileModal() {
  const modal = $("profileModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = 'auto';
  }
}