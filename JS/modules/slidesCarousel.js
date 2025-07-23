const heroCarousel = document.querySelector('.hero');
const specialCarousel = document.querySelector('.special-drinks__carousel');


// -------- Function: update slide classes --------
function updateSlideClasses(activeSlide, activeSlideIndicator, newSlide, newSlideIndicator) {
    // Updates slide classes
    activeSlide.classList.remove('active');
    newSlide.classList.add('active');

    // Updates slide indicator classes
    activeSlideIndicator.classList.remove('checked');
    newSlideIndicator.classList.add('checked');

    // Changes aria-current attribute
    activeSlideIndicator.removeAttribute('aria-current');
    newSlideIndicator.setAttribute('aria-current', 'step');
}
// ------------------------------------------------


// ----------- Function: switch slides ------------
function switchSlide(carousel) {
  if (!carousel) return; // Prevent error if not found
  const activeSlide = carousel.querySelector('.active');
  const activeSlideIndicator = carousel.querySelector('.checked');
  const nextSlide = activeSlide?.nextElementSibling || carousel.querySelector('.slide:first-child');
  const nextSlideIndicator = activeSlideIndicator?.nextElementSibling || carousel.querySelector('.slide-indicator:first-child');
  if (activeSlide && activeSlideIndicator && nextSlide && nextSlideIndicator) {
    updateSlideClasses(activeSlide, activeSlideIndicator, nextSlide, nextSlideIndicator);
  }
}

// ------------------------------------------------


// -------- Function: go to previous slide --------
function prevSlide(carousel) {
    // Gets the active and previous slides and their indicators
    const activeSlide = carousel.querySelector('.active');
    const activeSlideIndicator = carousel.querySelector('.checked');
    const prevSlide = activeSlide.previousElementSibling || carousel.querySelector('.slide:last-child'); // If there's no previous slide, loops back to the last
    const prevSlideIndicator = activeSlideIndicator.previousElementSibling || carousel.querySelector('.slide-indicator:last-child'); // If there's no previous indicator, loops back to the last

    updateSlideClasses(activeSlide, activeSlideIndicator, prevSlide, prevSlideIndicator); // Updates classes to show the previous slide and its indicator; changes aria-current attribute to the previous slide item
}
// ------------------------------------------------


// ---------- Function: go to next slide ----------
function nextSlide(carousel) {
    // Gets the active next slides and their indicators
    const activeSlide = carousel.querySelector('.slide.active');
    const activeSlideIndicator = carousel.querySelector('.checked');
    const nextSlide = activeSlide.nextElementSibling || carousel.querySelector('.slide:first-child'); // If there's no next slide, loops back to the first
    const nextSlideIndicator = activeSlideIndicator.nextElementSibling || carousel.querySelector('.slide-indicator:first-child'); // If there's no next indicator, loops back to the first

    updateSlideClasses(activeSlide, activeSlideIndicator, nextSlide, nextSlideIndicator); // Updates classes to show the next slide and its indicator; changes aria-current attribute to the next slide item
}
// ------------------------------------------------


// ------- Function: slide with indicators --------
function slideThroughIndicators(event, carousel) {
    // Gets the target indicator and its index
    const indicator = event.currentTarget;
    const index = Array.from(indicator.parentElement.children).indexOf(indicator); // Converts the HTML collection into an array and stores the index of the target indicator

    if (!indicator.classList.contains('checked')) {
        carousel.querySelector('.checked').classList.remove('checked'); // Unchecks the currently checked indicator
        indicator.classList.add('checked'); // Checks the clicked indicator
        carousel.querySelector('.active').classList.remove('active'); // Deactivates the currently active slide
        carousel.querySelectorAll('.slide')[index].classList.add('active'); // Activates the slide corresponding to the clicked indicator
    }
}
// ------------------------------------------------


// ---------- Function: start autoplay ------------
// Sets interval to switch slides every 5 seconds
const startAutoplay = carousel => setInterval(() => switchSlide(carousel), 5000);
// ------------------------------------------------


// ---------- Function: start slideshow -----------
function startSlideshow(carousel) {
  if (!carousel) return;
  const autoplayInterval = startAutoplay(carousel);
  const prevBtn = carousel.querySelector('.action-button.prev');
  const nextBtn = carousel.querySelector('.action-button.next');
  if (prevBtn) prevBtn.addEventListener('click', () => prevSlide(carousel));
  if (nextBtn) nextBtn.addEventListener('click', () => nextSlide(carousel));
  const slideIndicators = carousel.querySelectorAll('.slide-indicator');
  slideIndicators.forEach(indicator => indicator.addEventListener('click', e => slideThroughIndicators(e, carousel)));
  return autoplayInterval;
}
// ------------------------------------------------


// ------------------- Exports --------------------
export {
    // Functions
    startSlideshow,

    // Variables
    heroCarousel,
    specialCarousel,
};
// ------------------------------------------------