// YouTube Speed Toggle Content Script

console.log("YouTube Speed Toggle extension loaded.");

function initExtension() {
  const controls = document.querySelector(".ytp-right-controls");
  if (controls && !document.querySelector(".yt-speed-toggle-container")) {
    const toggleContainer = document.createElement("div");
    toggleContainer.className = "yt-speed-toggle-container";

    // Toggle Button
    const btn = document.createElement("button");
    btn.innerHTML = "1x";
    btn.className = "yt-speed-toggle-btn ytp-button";
    btn.title = "Playback Speed";

    // Dropdown Menu
    const menu = document.createElement("div");
    menu.className = "yt-speed-menu";
    menu.style.display = "none";

    const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];

    speeds.forEach((speed) => {
      const item = document.createElement("div");
      item.className = "yt-speed-menu-item";
      item.innerHTML = speed + "x";
      item.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent menu close immediately
        const video = document.querySelector("video");
        if (video) {
          video.playbackRate = speed;
          btn.innerHTML = speed + "x";
          menu.style.display = "none";
        }
      });
      menu.appendChild(item);
    });

    // Toggle menu on button click
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.style.display = menu.style.display === "none" ? "block" : "none";
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!toggleContainer.contains(e.target)) {
        menu.style.display = "none";
      }
    });

    // Sync button text if speed changes externally
    const video = document.querySelector("video");
    if (video) {
      video.addEventListener("ratechange", () => {
        btn.innerHTML = video.playbackRate + "x";
      });
      // Set initial value
      btn.innerHTML = video.playbackRate + "x";
    }

    controls.prepend(toggleContainer);
    toggleContainer.appendChild(menu); // Append menu first (or use CSS positioning)
    toggleContainer.appendChild(btn);
  }
}

// Observer to handle dynamic loading (SPA navigation)
const observer = new MutationObserver((mutations) => {
  initExtension();
});

observer.observe(document.body, { childList: true, subtree: true });

// Initial check
initExtension();
