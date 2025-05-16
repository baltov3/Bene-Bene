// ------------------- Imports --------------------
// Slides Carousels module
import {
    // Functions
    startSlideshow,

    // Variables
    heroCarousel,
    specialCarousel,
} from './modules/slidesCarousel.js';


// Controls module
import {
    // Functions
    handleScrollButtons,
    goToTop,
    goToBottom,

    // Variables
} from './modules/controls.js'

import { translations } from './modules/translations.js';

// Card Carousel module
import {
    // Functions
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    moveCarouselCards,
    loopCarousel,

    // Variables
    menuCarousels,
    menuCarouselBtns,
    totalCardWidth,
} from './modules/cardCarousel.js'


// Navbar module
import {
    // Functions
    handleMediaQueryChange,
    hideMenuOnResize,
    toggleNavbarOnClick,
    toggleNavbarOnScroll,
    lockNavbar,
    toggleHamburgerMenu,
    closeHamburgerClickOutside,
    closeHamburgerPressEsc,
    updateCurrentSection,
    updateCurrentSectionOnScroll,
    expandNavbarBtn,
    lockNavbarBtn,

    // Variables
    mediaQuery,
    hamburger,
} from './modules/navbar.js';

// ------------------------------------------------

import { products } from './modules/modal.js';

function openModal(productId) {
  const p = products[productId];
  if (!p) return;

   document.getElementById("modal-title").textContent = p.title || "";
  document.getElementById("modal-description").textContent = p.description || "";
  document.getElementById("modal-price").textContent = p.price || "";


    // Volume
  const volumeEl = document.getElementById("modal-volume");
  if (p.volume) {
    volumeEl.style.display = "inline";
    volumeEl.textContent = `/${p.volume}/`;
  } else {
    volumeEl.style.display = "none";
  }

  // Advice
  const adviceEl = document.getElementById("modal-advice");
  if (p.advice) {
    adviceEl.style.display = "block";
    adviceEl.querySelector("p").textContent = p.advice;
  } else {
    adviceEl.style.display = "none";
  }

  // Reminder
  const reminderEl = document.getElementById("modal-reminder");
  if (p.reminder) {
    reminderEl.style.display = "block";
    reminderEl.querySelector("p").textContent = p.reminder;
  } else {
    reminderEl.style.display = "none";
  }
// Allergens
  const allergenContainer = document.getElementById("modal-allergens-images");
  allergenContainer.innerHTML = "";
  const allergenSection = document.getElementById("modal-alergens");

  if (Array.isArray(p.allergens) && p.allergens.length > 0) {
    allergenSection.style.display = "block";
    p.allergens.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.className = "allergen-icon";
      allergenContainer.appendChild(img);
    });
  } else {
    allergenSection.style.display = "none";
  }

  document.getElementById("modal").classList.remove("hide");
}

window.closeModal = function () {
  document.getElementById("modal").classList.add("hide");
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".info-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      openModal(productId);
    });
  });
});
// ------------------------------------------------
let currentLang = 'en';



// Функция за превод на текста
function translatePage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = translations[lang][key];
    if (translation) {
      // Променяме само текста в span, който е зададен за превод
      const span = el.querySelector('.text-to-translate');
      if (span) {
        span.textContent = translation;
      }
    }
  });

  // Смени текста в бутона за език
  const langToggle = document.getElementById('lang-toggle');
  langToggle.innerHTML = lang === 'bg' ? '🌐EN <span id="lang-label"></span>' : '🌐BG <span id="lang-label"></span>';
}

document.getElementById('lang-toggle').addEventListener('click', () => {
  currentLang = currentLang === 'bg' ? 'en' : 'bg';
  translatePage(currentLang);
});

//---------------------------------------------------

handleMediaQueryChange(mediaQuery); // Fires the handleMediaQueryChange function from the start

// ---------------- Scroll Events -----------------
window.addEventListener('scroll', toggleNavbarOnScroll); // Toggles the navbar visibility when scrolling
window.addEventListener('scroll', updateCurrentSectionOnScroll); // Updates the current section when scrolling manually
window.addEventListener('scroll', handleScrollButtons) // Handles position and visibility of scroll buttons
// ------------------------------------------------

// ----------------- Click Events -----------------
hamburger.addEventListener('click', toggleHamburgerMenu); // Toggles the hamburger state on click
document.body.addEventListener('click', closeHamburgerClickOutside); // Closes the menu when clicking outside
expandNavbarBtn.addEventListener('click', toggleNavbarOnClick); // 
lockNavbarBtn.addEventListener('click', lockNavbar); // Locks the navbar current state on click
document.querySelectorAll('.main-nav__list-item button').forEach(listItem => listItem.addEventListener('click', updateCurrentSection)); // Updates the current section when navigating through nav or buttons
document.querySelector('.controls__scroll-btn[data-action="top"]').addEventListener('click', goToTop); // Goes to the top of the page on click
document.querySelector('.controls__scroll-btn[data-action="bottom"]').addEventListener('click', goToBottom); // Goes to the bottom of the page on click
// ------------------------------------------------

// ---------------- Other Events ------------------
window.addEventListener('resize', hideMenuOnResize); // Fires the hideMenuOnResize function
document.body.addEventListener('keydown', closeHamburgerPressEsc); // Closes the menu when pressing ESCAPE
mediaQuery.addEventListener('change', handleMediaQueryChange); // Listens for changes in screen size
startSlideshow(heroCarousel); // Starts the slideshow when the page loads
startSlideshow(specialCarousel); // Starts the slideshow when the page loads

menuCarousels.forEach(carousel => { // Adds event listeners for mouse events on each menu carousel
    carousel.addEventListener('mousedown', (event) => handleMouseDown(event, carousel));
    carousel.addEventListener('mousemove', event => handleMouseMove(event, carousel));
    carousel.addEventListener('mouseup', () => handleMouseUp(carousel));
    carousel.addEventListener('mouseleave', () => handleMouseUp(carousel));
})

window.onload = () => menuCarousels.forEach(carousel => carousel.scrollTo({ left: 3 * totalCardWidth, top: 0, behavior: 'instant', }));

menuCarouselBtns.forEach(btn => {
    // Listens for clicks on each button to change carousel cards
    btn.addEventListener('click', () => moveCarouselCards(btn));
    btn.addEventListener('click', () => loopCarousel(btn));
})
// ------------------------------------------------