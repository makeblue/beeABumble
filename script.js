/* Bee A Bumble – Main JavaScript */

(function () {
  'use strict';

  // ── Sticky header shadow on scroll ──────────────────
  var header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Mobile hamburger menu ────────────────────────────
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Active nav link highlight on scroll ─────────────
  var sections = document.querySelectorAll('section[id], div[id="home"]');
  var navItems = document.querySelectorAll('.nav-links a');

  function setActiveNav() {
    var scrollY = window.scrollY + 100;
    sections.forEach(function (section) {
      if (
        section.offsetTop <= scrollY &&
        section.offsetTop + section.offsetHeight > scrollY
      ) {
        navItems.forEach(function (a) {
          a.classList.toggle(
            'active',
            a.getAttribute('href') === '#' + section.id
          );
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });

  // ── Contact form (client-side only demo) ────────────
  var form = document.getElementById('contact-form');
  var formSuccess = document.getElementById('form-success');

  if (form && formSuccess) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = form.querySelector('#name').value.trim();
      var email   = form.querySelector('#email').value.trim();
      var message = form.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        formSuccess.style.color = '#c0392b';
        formSuccess.textContent = 'Please fill in your name, email, and message.';
        return;
      }

      // Basic email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formSuccess.style.color = '#c0392b';
        formSuccess.textContent = 'Please enter a valid email address.';
        return;
      }

      formSuccess.style.color = '#2d7a2d';
      formSuccess.textContent = 'Thanks, ' + name + '! We\'ll be in touch soon. 🐝';
      form.reset();
    });
  }

  // ── Footer year ──────────────────────────────────────
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
