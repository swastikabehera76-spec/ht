// router, viewRouter
// import { initUserController } from "../controllers/UserController.js";
// import { initActivitiesController } from "../controllers/ActivitiesController.js";
// import { initMedicalController } from "../controllers/MedicalController.js";
// import { initReportController } from "../controllers/ReportController.js";


// // Load HTML into #app
// async function loadView(path) {
//   const res = await fetch(path);
//   const html = await res.text();
//   document.querySelector("#app").innerHTML = html;
// }

// // Main router
// export async function router() {
//   const path = window.location.pathname;

//   if (path === "/" || path === "/home") {
//     await loadView("/frontend/pages/home.html");
//   }

//   else if (path === "/users") {
//     await loadView("/frontend/pages/users.html");
//     initUserController();
//   }

//   else if (path === "/activities") {
//     await loadView("/frontend/pages/activities.html");
//     initActivitiesController();
//   }

//   else if (path === "/medical") {
//     await loadView("/frontend/pages/medical.html");
//     initMedicalController();
//   }

//    else if (path === "/report") {
//     await loadView("/frontend/pages/report.html");
//     initReportController();
//   }

//   else {
//     await loadView("/frontend/pages/404.html");
//   }
// }

// // SPA navigation
// export function initRouterEvents() {
//   document.addEventListener("click", (e) => {
//     const link = e.target.closest("[data-link]");
//     if (!link) return;

//     e.preventDefault();
//     history.pushState(null, "", link.getAttribute("href"));
//     router();
//   });

//   window.addEventListener("popstate", router);
// }


// frontend/assets/js/router/viewRouter.js

// --------------------
// Load HTML into #app
// --------------------
async function loadView(path) {
  const res = await fetch(path);

  // If view not found → show 404
  if (!res.ok) {
    const fallback = await fetch("/frontend/pages/404.html").then(r => r.text());
    document.querySelector("#app").innerHTML = fallback;
    return;
  }

  const html = await res.text();
  document.querySelector("#app").innerHTML = html;
}

// --------------------
// Main Router
// --------------------
export async function router() {
  // Normalize path (remove trailing slash except "/")
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
  // REPORT (JOIN)
  // --------------------
  if (path === "/report") {
    await loadView("/frontend/pages/report.html");
    const mod = await import("../controllers/ReportController.js");
    mod.initReportController();
    return;
  }

  // --------------------
  // DEFAULT (404)
  // --------------------
  await loadView("/frontend/pages/404.html");
}

// --------------------
// SPA Navigation Events
// --------------------
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
