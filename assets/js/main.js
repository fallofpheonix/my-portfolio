const menuToggle = document.getElementById("menuToggle");
const menuList = document.getElementById("menuList");
const navLinks = Array.from(document.querySelectorAll('.menu a[href^="#"]'));
const sections = Array.from(document.querySelectorAll("main section[id]"));

if (menuToggle && menuList) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuList.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuList.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// rAF-throttled active nav tracker
let rafPending = false;
function setActiveNav() {
  const threshold = window.innerHeight * 0.35;
  let activeId = "";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= threshold && rect.bottom >= threshold) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("active", href === activeId);
  });

  rafPending = false;
}

function scheduleNavUpdate() {
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(setActiveNav);
  }
}

window.addEventListener("scroll", scheduleNavUpdate, { passive: true });

// Debounced resize listener
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(setActiveNav, 150);
});

setActiveNav();

// Scroll reveal via IntersectionObserver
document.querySelectorAll(".section").forEach((node) => node.classList.add("reveal"));
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));

// Dynamic copyright year
const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

// Copy-to-clipboard for contact email
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const text = btn.dataset.copy;
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }

    const label = btn.querySelector(".copy-label");
    btn.classList.add("copied");
    if (label) label.textContent = "Copied!";

    setTimeout(() => {
      btn.classList.remove("copied");
      if (label) label.textContent = "Copy";
    }, 2000);
  });
});
