// frontend/assets/controllers/ReportController.js

// import { apiGetReport } from "../services/reportService.js";
// import { renderReportTable } from "../components/ReportTable.js";
// import { $ } from "../utils/dom.js";

// export function initReportController() {
//   loadReport();
// }

// async function loadReport() {
//   const spinner = $("loadingSpinner");
//   const table = $("ReportTableContainer");

//   if (spinner) spinner.style.display = "block";
//   if (table) table.classList.add("hidden");

//   const rows = await apiGetReport();
//   renderReportTable(rows);

//   if (spinner) spinner.style.display = "none";
//   if (table) table.classList.remove("hidden");
// }


// File: frontend/assets/js/controllers/ReportController.js

import { apiGetReport } from "../services/reportService.js";
import { renderReportTable } from "../components/ReportTable.js";
import { $ } from "../utils/dom.js";

let allReports = []; // Store all reports for filtering

export function initReportController() {
  loadReport();
  setupSearchListeners();
}

async function loadReport() {
  const spinner = $("loadingSpinner");
  const table = $("ReportTableContainer");

  if (spinner) spinner.style.display = "block";
  if (table) table.classList.add("hidden");

  allReports = await apiGetReport();
  renderReportTable(allReports);
  updateResultCount(allReports.length);

  if (spinner) spinner.style.display = "none";
  if (table) table.classList.remove("hidden");
}

function setupSearchListeners() {
  const searchBtn = $("searchBtn");
  const clearBtn = $("clearSearchBtn");
  const searchInput = $("searchInput");
  const genderFilter = $("genderFilter");

  if (searchBtn) {
    searchBtn.addEventListener("click", performSearch);
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", clearSearch);
  }

  // Search on Enter key
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }

  // Real-time filter on gender change
  if (genderFilter) {
    genderFilter.addEventListener("change", performSearch);
  }
}

function performSearch() {
  const searchInput = $("searchInput");
  const genderFilter = $("genderFilter");

  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedGender = genderFilter.value;

  let filtered = allReports;

  // Filter by search term (name or user_id)
  if (searchTerm) {
    filtered = filtered.filter(report => {
      const name = (report.name || "").toLowerCase();
      const userId = String(report.user_id || "");
      return name.includes(searchTerm) || userId.includes(searchTerm);
    });
  }

  // Filter by gender
  if (selectedGender) {
    filtered = filtered.filter(report => report.gender === selectedGender);
  }

  renderReportTable(filtered);
  updateResultCount(filtered.length);
  
  // Show search info
  const searchInfo = $("searchInfo");
  if (searchInfo) {
    searchInfo.classList.remove("hidden");
  }
}

function clearSearch() {
  const searchInput = $("searchInput");
  const genderFilter = $("genderFilter");
  const searchInfo = $("searchInfo");

  if (searchInput) searchInput.value = "";
  if (genderFilter) genderFilter.value = "";
  if (searchInfo) searchInfo.classList.add("hidden");

  renderReportTable(allReports);
  updateResultCount(allReports.length);
}

function updateResultCount(count) {
  const resultCount = $("resultCount");
  if (resultCount) {
    resultCount.textContent = count;
  }
}