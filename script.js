// ================================
// DOM Ready
// ================================
document.addEventListener('DOMContentLoaded', function () {

  // ================================
  // Active Nav Link Highlighting
  // ================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // ================================
  // Mobile Nav Toggle Icon
  // ================================
// ================================
// Mobile Nav Toggle Icon & Resize Fix
// ================================
const bar = document.getElementById('bar');
const clickInput = document.getElementById('click');

if (bar && clickInput) {
  // Toggle function
  clickInput.addEventListener('change', function () {
    bar.innerHTML = this.checked
      ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';

    document.body.classList.toggle('no-scroll', this.checked);
  });


  const desktopView = window.matchMedia("(min-width: 768px)");

  function handleDesktopChange(e) {
    if (e.matches) {
     
      clickInput.checked = false;
      bar.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
      document.body.classList.remove('no-scroll');
    }
  }

  // Listener attach karein
  desktopView.addEventListener('change', handleDesktopChange);
  
  // Initial check (page load par)
  handleDesktopChange(desktopView);
}

  // ================================
  // Navbar Scroll Shadow
  // ================================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.style.boxShadow = window.scrollY > 50
        ? '0 4px 20px rgba(0,0,0,0.2)'
        : '0 2px 10px rgba(0,0,0,0.1)';
    }, { passive: true });
  }

  // ================================
  // Date Input Min Constraint
  // ================================
  const dateInput = document.getElementById('eventDate');
  if (dateInput) {
    dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
  }

  // ================================
  // Guest Count Enforcement
  // ================================
  const guestCountInput = document.getElementById('guestCount');
  if (guestCountInput) {
    guestCountInput.addEventListener('change', function () {
      if (parseInt(this.value) < 10) this.value = 10;
    });
  }

  // ================================
  // Form Validation - Real-time
  // ================================
  document.querySelectorAll('.form-control, .form-select').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('is-invalid')) validateField(field);
    });
  });

  // ================================
  // Booking Form on Homepage
  // ================================
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleFormSubmit);
  }

  // ================================
  // Intersection Observer (Fade-in)
  // ================================
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

    document.querySelectorAll('.service-card, .menu-card, .process-step').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.animationDelay = `${i * 0.08}s`;
      observer.observe(el);
    });
  }

  // ================================
  // Testimonial Carousel
  // ================================
  const testimonialEl = document.getElementById('testimonialCarousel');
  if (testimonialEl && window.bootstrap) {
    new bootstrap.Carousel(testimonialEl, { interval: 5000, pause: 'hover' });
  }

  // ================================
  // Smooth Scroll (anchor links)
  // ================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

}); // end DOMContentLoaded

// ================================
// Form Validation Helper
// ================================
function validateField(field) {
  const value = field.value.trim();

  if (!value) { field.classList.add('is-invalid'); return false; }

  if (field.type === 'email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { field.classList.add('is-invalid'); return false; }
  }

  if (field.id === 'phone') {
    if (!/^[\d\s\-+()]+$/.test(value) || value.replace(/\D/g, '').length < 10) {
      field.classList.add('is-invalid'); return false;
    }
  }

  if (field.type === 'date') {
    const selected = new Date(value);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (selected < today) { field.classList.add('is-invalid'); return false; }
  }

  if (field.id === 'guestCount' && parseInt(value) < 10) {
    field.classList.add('is-invalid'); return false;
  }

  field.classList.remove('is-invalid');
  return true;
}

// ================================
// Form Submit Handler (shared)
// ================================
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const fields = form.querySelectorAll('input, select, textarea');
  let isValid = true;

  fields.forEach(field => { if (!validateField(field)) isValid = false; });

  if (!isValid) {
    form.querySelector('.is-invalid')?.focus();
    return;
  }

  const data = {
    eventName: form.querySelector('#eventName')?.value || '',
    eventType: form.querySelector('#eventType')?.value || '',
    eventDate: form.querySelector('#eventDate')?.value || '',
    guestCount: form.querySelector('#guestCount')?.value || '',
    name: form.querySelector('#name')?.value || '',
    email: form.querySelector('#email')?.value || '',
    phone: form.querySelector('#phone')?.value || '',
    details: form.querySelector('#details')?.value || ''
  };

  const message = encodeURIComponent(
    `🌟 *NEW EVENT INQUIRY* 🌟\n\n` +
    `*Event:* ${data.eventName}\n*Type:* ${data.eventType}\n*Date:* ${data.eventDate}\n*Guests:* ${data.guestCount}\n\n` +
    `👤 *Client Details:*\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Phone:* ${data.phone}\n\n` +
    `📝 *Notes:* ${data.details}`
  );

  window.open(`https://wa.me/923311302237?text=${message}`, '_blank');
  showSuccessMessage(form);
  form.reset();
}

// ================================
// Success Notification
// ================================
function showSuccessMessage(form) {
  const existing = document.querySelector('.booking-success-alert');
  if (existing) existing.remove();

  const alert = document.createElement('div');
  alert.className = 'alert alert-success alert-dismissible fade show booking-success-alert mt-3';
  alert.setAttribute('role', 'alert');
  alert.innerHTML = `<strong>Success!</strong> Thank you for your inquiry. We'll contact you shortly.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;

  form.parentNode.insertBefore(alert, form);
  setTimeout(() => alert.remove(), 6000);
}