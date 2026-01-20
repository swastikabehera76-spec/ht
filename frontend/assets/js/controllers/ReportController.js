


// File: frontend/assets/js/controllers/ReportController.js

// import { apiGetReport } from "../services/reportService.js";
// import { renderReportTable } from "../components/ReportTable.js";
// import { $ } from "../utils/dom.js";

// let allReports = []; // Store all reports for filtering

// export function initReportController() {
//   loadReport();
//   setupSearchListeners();
// }

// async function loadReport() {
//   const spinner = $("loadingSpinner");
//   const table = $("ReportTableContainer");

//   if (spinner) spinner.style.display = "block";
//   if (table) table.classList.add("hidden");

//   allReports = await apiGetReport();
//   renderReportTable(allReports);
//   updateResultCount(allReports.length);

//   if (spinner) spinner.style.display = "none";
//   if (table) table.classList.remove("hidden");
// }

// function setupSearchListeners() {
//   const searchBtn = $("searchBtn");
//   const clearBtn = $("clearSearchBtn");
//   const searchInput = $("searchInput");
//   const genderFilter = $("genderFilter");

//   if (searchBtn) {
//     searchBtn.addEventListener("click", performSearch);
//   }

//   if (clearBtn) {
//     clearBtn.addEventListener("click", clearSearch);
//   }

//   // Search on Enter key
//   if (searchInput) {
//     searchInput.addEventListener("keypress", (e) => {
//       if (e.key === "Enter") {
//         performSearch();
//       }
//     });
//   }

//   // Real-time filter on gender change
//   if (genderFilter) {
//     genderFilter.addEventListener("change", performSearch);
//   }
// }

// function performSearch() {
//   const searchInput = $("searchInput");
//   const genderFilter = $("genderFilter");

//   const searchTerm = searchInput.value.toLowerCase().trim();
//   const selectedGender = genderFilter.value;

//   let filtered = allReports;

//   // Filter by search term (name or user_id)
//   if (searchTerm) {
//     filtered = filtered.filter(report => {
//       const name = (report.name || "").toLowerCase();
//       const userId = String(report.user_id || "");
//       return name.includes(searchTerm) || userId.includes(searchTerm);
//     });
//   }

//   // Filter by gender
//   if (selectedGender) {
//     filtered = filtered.filter(report => report.gender === selectedGender);
//   }

//   renderReportTable(filtered);
//   updateResultCount(filtered.length);
  
//   // Show search info
//   const searchInfo = $("searchInfo");
//   if (searchInfo) {
//     searchInfo.classList.remove("hidden");
//   }
// }

// function clearSearch() {
//   const searchInput = $("searchInput");
//   const genderFilter = $("genderFilter");
//   const searchInfo = $("searchInfo");

//   if (searchInput) searchInput.value = "";
//   if (genderFilter) genderFilter.value = "";
//   if (searchInfo) searchInfo.classList.add("hidden");

//   renderReportTable(allReports);
//   updateResultCount(allReports.length);
// }

// function updateResultCount(count) {
//   const resultCount = $("resultCount");
//   if (resultCount) {
//     resultCount.textContent = count;
//   }
// }



import { apiGetReport } from "../services/reportService.js";
import { renderReportTable } from "../components/ReportTable.js";
import { $ } from "../utils/dom.js";

let allReports = [];
let currentSort = { field: null, direction: 'asc' };

export function initReportController() {
  loadReport();
  setupSearchListeners();
  setupSortListeners();
  setupExportListeners();
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
  const sortBy = $("sortBy");

  if (searchBtn) {
    searchBtn.addEventListener("click", performSearch);
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", clearSearch);
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") performSearch();
    });
  }

  if (genderFilter) {
    genderFilter.addEventListener("change", performSearch);
  }

  if (sortBy) {
    sortBy.addEventListener("change", (e) => {
      const value = e.target.value;
      if (value) {
        const [field, direction] = value.split('-');
        currentSort = { field, direction };
        performSearch();
      } else {
        currentSort = { field: null, direction: 'asc' };
        performSearch();
      }
    });
  }
}

function setupSortListeners() {
  const headers = document.querySelectorAll('[data-sort]');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const field = header.dataset.sort;
      const direction = currentSort.field === field && currentSort.direction === 'asc' ? 'desc' : 'asc';
      currentSort = { field, direction };
      performSearch();
      updateSortIndicators(header, direction);
    });
  });
}

function updateSortIndicators(activeHeader, direction) {
  document.querySelectorAll('.sort-icon').forEach(icon => {
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>`;
  });
  
  const icon = activeHeader.querySelector('.sort-icon');
  if (icon && direction === 'asc') {
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>`;
  } else if (icon) {
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>`;
  }
}

function performSearch() {
  const searchInput = $("searchInput");
  const genderFilter = $("genderFilter");

  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedGender = genderFilter.value;

  let filtered = allReports;

  if (searchTerm) {
    filtered = filtered.filter(report => {
      const name = (report.name || "").toLowerCase();
      const userId = String(report.user_id || "");
      return name.includes(searchTerm) || userId.includes(searchTerm);
    });
  }

  if (selectedGender) {
    filtered = filtered.filter(report => report.gender === selectedGender);
  }

  if (currentSort.field) {
    filtered = sortArray(filtered, currentSort.field, currentSort.direction);
  }

  renderReportTable(filtered);
  updateResultCount(filtered.length);
  updateSortInfo();
  
  const searchInfo = $("searchInfo");
  if (searchInfo) searchInfo.classList.remove("hidden");
}

function sortArray(array, field, direction) {
  return [...array].sort((a, b) => {
    let aVal = a[field] || '';
    let bVal = b[field] || '';
    
    if (['age', 'height', 'weight', 'steps', 'water_intake', 'calories_burned', 'user_id'].includes(field)) {
      aVal = parseFloat(aVal) || 0;
      bVal = parseFloat(bVal) || 0;
    } else {
      aVal = String(aVal).toLowerCase();
      bVal = String(bVal).toLowerCase();
    }
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

function clearSearch() {
  const searchInput = $("searchInput");
  const genderFilter = $("genderFilter");
  const sortBy = $("sortBy");
  const searchInfo = $("searchInfo");

  if (searchInput) searchInput.value = "";
  if (genderFilter) genderFilter.value = "";
  if (sortBy) sortBy.value = "";
  if (searchInfo) searchInfo.classList.add("hidden");

  currentSort = { field: null, direction: 'asc' };
  
  document.querySelectorAll('.sort-icon').forEach(icon => {
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>`;
  });

  renderReportTable(allReports);
  updateResultCount(allReports.length);
  updateSortInfo();
}

function updateResultCount(count) {
  const resultCount = $("resultCount");
  if (resultCount) resultCount.textContent = count;
}

function updateSortInfo() {
  const sortInfo = $("sortInfo");
  if (sortInfo) {
    if (currentSort.field) {
      const direction = currentSort.direction === 'asc' ? '↑ Ascending' : '↓ Descending';
      sortInfo.textContent = `(Sorted by ${currentSort.field}: ${direction})`;
    } else {
      sortInfo.textContent = '';
    }
  }
}

function setupExportListeners() {
  const exportCsvBtn = $("exportCsvBtn");
  const exportPdfBtn = $("exportPdfBtn");

  if (exportCsvBtn) {
    exportCsvBtn.addEventListener("click", exportToCSV);
  }

  if (exportPdfBtn) {
    exportPdfBtn.addEventListener("click", exportToPDF);
  }
}

function getFilteredData() {
  const searchInput = $("searchInput");
  const genderFilter = $("genderFilter");
  
  let dataToExport = allReports;
  
  const searchTerm = searchInput?.value.toLowerCase().trim();
  const selectedGender = genderFilter?.value;
  
  if (searchTerm) {
    dataToExport = dataToExport.filter(report => {
      const name = (report.name || "").toLowerCase();
      const userId = String(report.user_id || "");
      return name.includes(searchTerm) || userId.includes(searchTerm);
    });
  }
  
  if (selectedGender) {
    dataToExport = dataToExport.filter(report => report.gender === selectedGender);
  }
  
  if (currentSort.field) {
    dataToExport = sortArray(dataToExport, currentSort.field, currentSort.direction);
  }

  return dataToExport;
}

function exportToCSV() {
  const dataToExport = getFilteredData();

  if (dataToExport.length === 0) {
    showAlert("No data to export!", "error");
    return;
  }

  const headers = ["User ID", "Name", "Age", "Height", "Weight", "Gender", "Steps", "Water (L)", "Calories", "Disease", "Genetic Disease", "Allergies"];
  const csvContent = [
    headers.join(","),
    ...dataToExport.map(r => [
      r.user_id || "",
      `"${r.name || ""}"`,
      r.age || "",
      r.height || "",
      r.weight || "",
      r.gender || "",
      r.steps || "",
      r.water_intake || "",
      r.calories_burned || "",
      `"${r.disease || ""}"`,
      `"${r.genetic_disease || ""}"`,
      `"${r.allergies || ""}"`
    ].join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `health-report-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
  
  showAlert("CSV exported successfully!", "success");
}

function exportToPDF() {
  const dataToExport = getFilteredData();

  if (dataToExport.length === 0) {
    showAlert("No data to export!", "error");
    return;
  }

  // Create a printable HTML version
  const printWindow = window.open('', '_blank');
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Health Report - ${new Date().toLocaleDateString()}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          color: #333;
        }
        h1 {
          color: #667eea;
          text-align: center;
          margin-bottom: 10px;
        }
        .date {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 12px;
          text-align: left;
          font-size: 11px;
        }
        td {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          font-size: 10px;
        }
        tr:nth-child(even) {
          background-color: #f8f9fa;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
        @media print {
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <h1>Health Tracker - Comprehensive Report</h1>
      <div class="date">Generated on: ${new Date().toLocaleString()}</div>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Gender</th>
            <th>Steps</th>
            <th>Water</th>
            <th>Calories</th>
            <th>Disease</th>
            <th>Genetic</th>
            <th>Allergies</th>
          </tr>
        </thead>
        <tbody>
          ${dataToExport.map(r => `
            <tr>
              <td>${r.user_id || '-'}</td>
              <td><strong>${r.name || 'N/A'}</strong></td>
              <td>${r.age || '-'}</td>
              <td>${r.height || '-'}</td>
              <td>${r.weight || '-'}</td>
              <td>${r.gender || '-'}</td>
              <td>${r.steps || '-'}</td>
              <td>${r.water_intake || '-'}</td>
              <td>${r.calories_burned || '-'}</td>
              <td>${r.disease || '-'}</td>
              <td>${r.genetic_disease || '-'}</td>
              <td>${r.allergies || '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="footer">
        <p>Total Records: ${dataToExport.length}</p>
        <p>© 2025 HealthTracker - Built with ❤️ by Swastika Behera</p>
      </div>
      <div style="margin-top: 20px; text-align: center;">
        <button onclick="window.print()" style="background: #667eea; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 14px;">
          🖨️ Print / Save as PDF
        </button>
        <button onclick="window.close()" style="background: #6b7280; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 14px; margin-left: 10px;">
          ✖ Close
        </button>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  showAlert("PDF preview opened! Use Print to save as PDF", "success");
}

function showAlert(message, type = "success") {
  const container = $("alertContainer");
  if (!container) return;
  
  const alert = document.createElement("div");
  alert.className = `px-6 py-4 rounded-lg shadow-lg text-white font-medium flex items-center gap-3 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;
  
  const icon = type === 'success' 
    ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
    : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
  
  alert.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(alert);
  setTimeout(() => alert.remove(), 4000);
}