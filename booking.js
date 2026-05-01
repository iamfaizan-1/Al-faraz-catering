document.addEventListener('DOMContentLoaded', function () {

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Date minimum constraint
  const dateInput = document.getElementById('eventDate');
  if (dateInput) dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);

  // Booking form (booking page)
  const bookingForm2 = document.getElementById('bookingForm2');
  if (bookingForm2) {
    bookingForm2.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      bookingForm2.querySelectorAll('input, select, textarea').forEach(field => {
        if (!validateField(field)) isValid = false;
      });

      if (!isValid) {
        bookingForm2.querySelector('.is-invalid')?.focus();
        return;
      }

      const data = {
        eventName: document.getElementById('eventName').value,
        eventType: document.getElementById('eventType').value,
        eventDate: document.getElementById('eventDate').value,
        guestCount: document.getElementById('guestCount').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        details: document.getElementById('details').value
      };

      const message = encodeURIComponent(
        `🌟 *NEW EVENT INQUIRY* 🌟\n\n` +
        `*Event:* ${data.eventName}\n*Type:* ${data.eventType}\n*Date:* ${data.eventDate}\n*Guests:* ${data.guestCount}\n\n` +
        `👤 *Client Details:*\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Phone:* ${data.phone}\n\n` +
        `📝 *Notes:* ${data.details}`
      );

      window.open(`https://wa.me/923311302237?text=${message}`, '_blank');

      const alert = document.createElement('div');
      alert.className = 'alert alert-success alert-dismissible fade show mt-3';
      alert.setAttribute('role', 'alert');
      alert.innerHTML = `<strong>Success!</strong> Thank you for your inquiry. We'll contact you shortly.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
      bookingForm2.parentNode.insertBefore(alert, bookingForm2);
      setTimeout(() => alert.remove(), 6000);

      bookingForm2.reset();
    });
  }
});

function validateField(field) {
  const value = field.value.trim();
  if (!value) { field.classList.add('is-invalid'); return false; }
  if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    field.classList.add('is-invalid'); return false;
  }
  if (field.id === 'phone' && (!/^[\d\s\-+()]+$/.test(value) || value.replace(/\D/g, '').length < 10)) {
    field.classList.add('is-invalid'); return false;
  }
  if (field.type === 'date') {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (new Date(value) < today) { field.classList.add('is-invalid'); return false; }
  }
  if (field.id === 'guestCount' && parseInt(value) < 10) {
    field.classList.add('is-invalid'); return false;
  }
  field.classList.remove('is-invalid');
  return true;
}