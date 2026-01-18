// frontend/assets/js/router/viewRouter.js

async function loadView(path) {
  const res = await fetch(path);

  // If the view file is missing, show 404 view
  if (!res.ok) {
    const fallback = await fetch("/frontend/pages/404.html").then(r => r.text());
    document.querySelector("#app").innerHTML = fallback;
    return;
  }

  const html = await res.text();
  document.querySelector("#app").innerHTML = html;

  // Mermaid re-render (same as reference)
  if (window.mermaid) {
    try {
      await window.mermaid.run({ querySelector: "#app .mermaid" });
    } catch (e) {
      console.warn("Mermaid render skipped:", e);
    }
  }
}

export async function router() {
  // Normalize path
  let path = window.location.pathname;
  if (path.length > 1) path = path.replace(/\/$/, "");

  // --------------------
  // HOME
  // --------------------
  if (path === "/" || path === "/home") {
    await loadView("/frontend/pages/home.html");
    return;
  }

  // --------------------
  // USERS (CRUD)
  // --------------------
  if (path === "/users") {
    await loadView("/frontend/pages/users.html");
    const mod = await import("../controllers/UserController.js");
    mod.initUserController();
    return;
  }

  // --------------------
  // ACTIVITIES (CRUD)
  // --------------------
  if (path === "/activities") {
    await loadView("/frontend/pages/activities.html");
    const mod = await import("../controllers/ActivitiesController.js");
    mod.initActivitiesController();
    return;
  }

  // --------------------
  // MEDICAL (CRUD)
  // --------------------
  if (path === "/medical") {
    await loadView("/frontend/pages/medical.html");
    const mod = await import("../controllers/MedicalController.js");
    mod.initMedicalController();
    return;
  }

  // --------------------
  // REPORT
  // --------------------
  if (path === "/report") {
    await loadView("/frontend/pages/report.html");
    const mod = await import("../controllers/ReportController.js");
    mod.initReportController();
    return;
  }

  // --------------------
  // DEFAULT
  // --------------------
  await loadView("/frontend/pages/404.html");
}

export function initRouterEvents() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (!link) return;

    e.preventDefault();
    history.pushState(null, "", link.getAttribute("href"));
    router();
  });

  window.addEventListener("popstate", router);
}
