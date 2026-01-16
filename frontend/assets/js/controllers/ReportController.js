// frontend/assets/controllers/ReportController.js

import { apiGetReport } from "../services/reportService.js";
import { renderReportTable } from "../components/ReportTable.js";
import { $ } from "../utils/dom.js";

export function initReportController() {
  loadReport();
}

async function loadReport() {
  const spinner = $("loadingSpinner");
  const table = $("ReportTableContainer");

  if (spinner) spinner.style.display = "block";
  if (table) table.classList.add("hidden");

  const rows = await apiGetReport();
  renderReportTable(rows);

  if (spinner) spinner.style.display = "none";
  if (table) table.classList.remove("hidden");
}
