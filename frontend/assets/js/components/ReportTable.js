// components, ReportTable.js
// import { $ } from "../utils/dom.js";

// export function renderReportTable(rows = []) {
//   const body = $("reportTableBody");
//   const empty = $("noRows");

//   body.innerHTML = "";

//   if (!rows.length) {
//     empty.classList.remove("hidden");
//     return;
//   }

//   empty.classList.add("hidden");

//   rows.forEach(r => {
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td class="px-3 py-2">${r.user_id ?? "-"}</td>
//       <td class="px-3 py-2">${r.name}</td>
//       <td class="px-3 py-2">${r.age}</td>
//       <td class="px-3 py-2">${r.height}</td>
//       <td class="px-3 py-2">${r.weight}</td>
//       <td class="px-3 py-2">${r.gender}</td>
//       <td class="px-3 py-2">${r.steps}</td>
//       <td class="px-3 py-2">${r.water_intake}</td>
//       <td class="px-3 py-2">${r.calories_burned}</td>
//       <td class="px-3 py-2">${r.disease}</td>
//       <td class="px-3 py-2">${r.genetic_disease}</td>
//       <td class="px-3 py-2">${r.allergies}</td>
//     `;
//     body.appendChild(tr);
//   });
// }

// File: frontend/assets/js/components/ReportTable.js

import { $ } from "../utils/dom.js";

export function renderReportTable(rows = []) {
  const body = $("reportTableBody");
  const empty = $("noRows");

  if (!body || !empty) return;

  body.innerHTML = "";

  if (!rows.length) {
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");

  rows.forEach(r => {
    const tr = document.createElement("tr");
    tr.className = "hover:bg-gray-50 transition";
    
    tr.innerHTML = `
      <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
        ${r.user_id ?? "-"}
      </td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 font-semibold">
        ${r.name || "N/A"}
      </td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
        ${r.age || "-"}
      </td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
        ${r.height || "-"}
      </td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
        ${r.weight || "-"}
      </td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
        <span class="px-2 py-1 rounded-full text-xs font-medium ${getGenderBadgeClass(r.gender)}">
          ${r.gender || "N/A"}
        </span>
      </td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
        ${r.steps || "-"}
      </td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
        ${r.water_intake || "-"}
      </td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
        ${r.calories_burned || "-"}
      </td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
        ${r.disease || "-"}
      </td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
        ${r.genetic_disease || "-"}
      </td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
        ${r.allergies || "-"}
      </td>
    `;
    
    body.appendChild(tr);
  });
}

function getGenderBadgeClass(gender) {
  switch(gender) {
    case "Male":
      return "bg-blue-100 text-blue-800";
    case "Female":
      return "bg-pink-100 text-pink-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}