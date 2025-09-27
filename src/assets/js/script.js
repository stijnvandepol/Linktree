'use strict';

/* =========
   Helpers
   ========= */
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); };
const normalize = s => (s || '').toLowerCase().trim().replace(/\s+/g, '-');
const nlToKey = (txt) => {
  const n = normalize(txt);
  const map = {
    'over-mij': 'about',
    'cv': 'resume',
    'portfolio': 'portfolio',
    'blog': 'blog',
    'contact': 'contact'
  };
  return map[n] || n;
};

/* =========
   Sidebar
   ========= */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

/* =========
   Testimonials
   ========= */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  if (!modalContainer || !overlay) return;
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    if (!modalImg || !modalTitle || !modalText) return;
    const av = this.querySelector("[data-testimonials-avatar]");
    const tt = this.querySelector("[data-testimonials-title]");
    const tx = this.querySelector("[data-testimonials-text]");
    if (av) { modalImg.src = av.src; modalImg.alt = av.alt || ''; }
    if (tt) modalTitle.innerHTML = tt.innerHTML;
    if (tx) modalText.innerHTML = tx.innerHTML;
    testimonialsModalFunc();
  });
}
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

/* =========
   Custom select & filters
   ========= */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]"); // (originele typefout uit template)
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = normalize(this.innerText);
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

let lastClickedBtn = filterBtn[0] || null;
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = normalize(this.innerText);
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

/* =========
   Contact form
   ========= */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (!form || !formBtn) return;
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

/* =========
   Page navigatie  (AANGEPAST – onafhankelijk van knoptekst)
   ========= */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

function showPage(targetKey) {
  if (!targetKey) return;

  // toggle pages
  for (let p = 0; p < pages.length; p++) {
    pages[p].classList.toggle("active", pages[p].dataset.page === targetKey);
  }

  // toggle nav actives
  for (let n = 0; n < navigationLinks.length; n++) {
    const link = navigationLinks[n];
    const linkTarget = link.dataset.target || nlToKey(link.innerText || link.textContent || '');
    link.classList.toggle("active", linkTarget === targetKey);
  }

  window.scrollTo(0, 0);
}

// click handlers (werken met data-target, vallen desnoods terug op label → key)
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function (e) {
    const target =
      this.dataset.target                             // bijv. "about", "resume"
      || nlToKey(this.innerText || this.textContent); // NL label → originele key
    showPage(target);
    e.preventDefault();
  });
}

// init: gebruik actieve knop of anders 'about'
(function initNav(){
  let initTarget = 'about';
  const activeBtn = document.querySelector('.navbar .navbar-link.active');
  if (activeBtn) {
    initTarget = activeBtn.dataset.target || nlToKey(activeBtn.innerText || activeBtn.textContent);
  }
  showPage(initTarget);
})();
