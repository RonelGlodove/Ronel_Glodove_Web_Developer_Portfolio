const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;

    const clickedInsideNav = navLinks.contains(target) || menuToggle.contains(target);
    if (!clickedInsideNav && navLinks.classList.contains("open")) {
      closeMenu();
    }
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const locationTime = document.getElementById("location-time");
if (locationTime) {
  const updateCebuTime = () => {
    const now = new Date();
    const cebuTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    const hours = cebuTime.getHours();
    const minutes = cebuTime.getMinutes();
    const suffix = hours >= 12 ? "PM" : "AM";
    const formattedHours = ((hours + 11) % 12 + 1);
    const formattedMinutes = minutes.toString().padStart(2, "0");
    locationTime.textContent = `It is ${formattedHours}:${formattedMinutes} ${suffix} in Cebu City right now.`;
  };

  updateCebuTime();
  setInterval(updateCebuTime, 60000);
}

const searchInput = document.getElementById("portfolio-search");
const searchEmpty = document.getElementById("search-empty");
const searchableItems = document.querySelectorAll(".searchable");

if (searchInput && searchableItems.length) {
  const applySearch = () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    searchableItems.forEach((item) => {
      const itemText = item.textContent.toLowerCase();
      const matches = !query || itemText.includes(query);
      item.classList.toggle("hidden-by-search", !matches);
      if (matches) visibleCount += 1;
    });

    if (searchEmpty) {
      searchEmpty.hidden = visibleCount !== 0;
    }
  };

  searchInput.addEventListener("input", applySearch);
  applySearch();
}

const copyButton = document.querySelector(".copy-btn");
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const email = "Yukiborres9@gmail.com";

    try {
      await navigator.clipboard.writeText(email);
      copyButton.textContent = "Copied!";
      setTimeout(() => {
        copyButton.textContent = "Copy email";
      }, 1200);
    } catch (error) {
      copyButton.textContent = "Copy failed";
      setTimeout(() => {
        copyButton.textContent = "Copy email";
      }, 1200);
    }
  });
}

const contactForm = document.querySelector(".contact-form");
const sendButton = document.querySelector(".send-btn");

if (contactForm && sendButton) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendButton.textContent = "Message sent";
    setTimeout(() => {
      sendButton.textContent = "Send message";
    }, 1500);
  });
}
