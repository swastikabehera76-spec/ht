import { $ } from "../utils/dom.js";

/**
 * Reset the user form to default (Add mode)
 */
export function resetForm() {
  const form = $("userForm");
  const submitBtn = $("saveUserBtn");
  const cancelBtn = $("cancelBtn");

  if (!form || !submitBtn || !cancelBtn) return;

  form.reset();

  submitBtn.textContent = "Save User";
  cancelBtn.classList.add("hidden");
}

/**
 * Fill the form for editing a user
 * @param {Object} user
 */
export function fillForm(user) {
  const submitBtn = $("saveUserBtn");
  const cancelBtn = $("cancelBtn");

  if (!submitBtn || !cancelBtn) return;

  $("name").value = user.name;
  $("age").value = user.age;
  $("height").value = user.height;
  $("weight").value = user.weight;
  $("gender").value = user.gender;

  submitBtn.textContent = "Update User";
  cancelBtn.classList.remove("hidden");
}
