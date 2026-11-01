// Modes: "off" | "crop" | "stretch"
const MODES = ["off", "crop", "stretch"];
const LABELS = { off: "Fill: off", crop: "Fill: crop", stretch: "Fill: stretch" };
let currentMode = "crop";

function applyMode(mode) {
  currentMode = MODES.includes(mode) ? mode : "crop";
  const root = document.documentElement;
  root.classList.remove("ytfill-crop", "ytfill-stretch");
  if (currentMode !== "off") root.classList.add(`ytfill-${currentMode}`);
}

function showToast(text) {
  let toast = document.getElementById("ytfill-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "ytfill-toast";
    // Put it inside the fullscreen element so it's visible in fullscreen
    (document.fullscreenElement || document.body).appendChild(toast);
  } else if (document.fullscreenElement && !document.fullscreenElement.contains(toast)) {
    document.fullscreenElement.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 1200);
}

// Load saved mode
chrome.storage.sync.get({ mode: "crop" }, ({ mode }) => applyMode(mode));

// React to changes from the popup
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.mode) applyMode(changes.mode.newValue);
});

// Press Z to cycle modes (ignored while typing in search/comments)
document.addEventListener(
  "keydown",
  (e) => {
    if (e.key !== "z" && e.key !== "Z") return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;

    const next = MODES[(MODES.indexOf(currentMode) + 1) % MODES.length];
    applyMode(next);
    chrome.storage.sync.set({ mode: next });
    showToast(LABELS[next]);
  },
  true
);
