// Shortcut for selecting elements by ID
export const $ = (id) => {
  const el = document.getElementById(id);
  return el || null;
};

// Converts an HTML string into a real DOM element
export function createElement(html) {
  const div = document.createElement("div");
  div.innerHTML = html.trim();
  return div.firstElementChild;
}
