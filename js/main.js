/* ============================================================
    main.js - Portfolio JavaScript
    Structure:
      1. Navigation - scroll effect & active link highlighting
      2. Hamburger - mobile menu toggle
      3. Scroll Reveal - IntersectionObserver fade-in
      4. Contact Form - validation & Formspree submission
      5. Init - kick everything off on DOMContentLoaded
   ============================================================ */


   /* ───────────────── 1. NAVIGATION ──────────────────────── */

   /*
    * Adds the .scrolled class to navbar once the user
    * scrolls past 20px, triggering the frosted-glass effect.
    */
   function initNavScroll() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
   }

   /*
    * Watches each section and highlights the matching nav link
    * while that section is in view (active state).
    */
   function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active from all links
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active to the link matching this section's id
        const activeLink = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));
}

/* ───────────────── 2. HAMBURGER - MOBILE MENU ────────────── */

/*
 * Toggles the mobile menu open/closed when the hamburger
 * button is clicked. Also closes it when any link is tapped.
 */
function initHamburger() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  // Toggle menu on hamburger click
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close menu when any mobile nav link is tapped
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  // Close menu if user clicks outside of it
  document.addEventListener('click', (e) => {
    const clickedOutside =
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target);

    if (clickedOutside && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
    }
  });
}

/* ───────────────── 3. SCROLL REVEAL ──────────────────────── */

/*
 * Uses IntersectionObserver to watch every element with the
 * class .reveal. When one enters the viewport, .visible is
 * added — which triggers the CSS fade-up transition defined
 * in style.css. Once visible, the element is unobserved so
 * the animation only plays once.
 */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once only
      }
    });
  }, {
    threshold: 0.12  // trigger when 12% of the element is visible
  });

  revealEls.forEach(el => observer.observe(el));
}

/* ───────────────── 4. CONTACT FORM ─────────────────────── */

/**
 * Handles the contact form:
 *  - Client-side validation (required fields)
 *  - Submits via fetch() to Formspree (free service)
 *  - Shows success or error status message
 *
 * To activate: sign up at https://formspree.io, create a form,
 * and replace YOUR_FORM_ID below with your real endpoint ID.
 */
function initContactForm() {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  // No form on this page — bail out gracefully
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');

    // Gather values
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    // Basic client-side validation
    if (!name || !email || !message) {
      showStatus(status, 'error', '// Please fill in your name, email, and message.');
      return;
    }

    if (!isValidEmail(email)) {
      showStatus(status, 'error', '// Please enter a valid email address.');
      return;
    }

    // Disable button while submitting
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';

    try {
      const response = await fetch('https://formspree.io/f/mqewbqjj', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':       'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          subject: form.subject.value.trim(),
          message
        })
      });

      if (response.ok) {
        showStatus(status, 'success', "// Message sent! I'll get back to you soon.");
        form.reset();
      } else {
        throw new Error('Server error');
      }
    } catch {
      showStatus(
        status, 'error',
        '// Something went wrong. Try emailing me directly.'
      );
    } finally {
      // Re-enable the button regardless of outcome
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

/**
 * Sets the form status element's class and message text.
 * @param {HTMLElement} el      - The status div
 * @param {'success'|'error'} type
 * @param {string} message
 */
function showStatus(el, type, message) {
  el.className  = `form-status ${type}`;
  el.textContent = message;
}

/**
 * Simple email format check.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ───────────────────────── 5. INIT ─────────────────────── */

/*
 * Wait for the DOM to be fully parsed before running anything.
 * Since main.js is loaded at the bottom of <body>, the DOM is
 * already ready — but this is a good defensive habit.
 */
document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initActiveNavLinks();
  initHamburger();
  initScrollReveal();
  initContactForm();
});