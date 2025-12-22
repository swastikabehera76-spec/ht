// frontend/assets/js/components/UserTable.js

import { $ } from "../utils/dom.js";
import { editUser, deleteUserAction } from "../controllers/UserController.js";

// Render users in table
export function renderUserTable(users = []) {
  const body = $("usersTableBody");
  const noUsers = $("noUsers");

  if (!body || !noUsers) return;

  body.innerHTML = "";

  if (users.length === 0) {
    noUsers.classList.remove("hidden");
    return;
  }

  noUsers.classList.add("hidden");

  users.forEach(user => {
    const row = document.createElement("tr");
    row.className = "border-b";

    row.innerHTML = `
      <td class="px-3 py-2">${user.id}</td>
      <td class="px-3 py-2">${user.name}</td>
      <td class="px-3 py-2">${user.age}</td>
      <td class="px-3 py-2">${user.height}</td>
      <td class="px-3 py-2">${user.weight}</td>
      <td class="px-3 py-2">${user.gender}</td>

      <td class="px-3 py-2 flex space-x-2">
        <button
          class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${user.id}">
          Edit
        </button>

        <button
          class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${user.id}">
          Delete
        </button>
      </td>
    `;

    // Edit button
    row.querySelector("[data-edit]")
       .addEventListener("click", () => editUser(user.id));

    // Delete button
    row.querySelector("[data-delete]")
       .addEventListener("click", () => deleteUserAction(user.id));

    body.appendChild(row);
  });
}
