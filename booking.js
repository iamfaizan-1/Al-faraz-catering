

// --- Pehle wala icon change code (as it is) ---

// --- NAYA: Active Link Highlighting Code ---
function setActiveLink() {
    // Current URL se file ka naam nikaalein (e.g., booking.html)
    const currentPath = window.location.pathname;
    
    // Saare links pakrein (Desktop aur Mobile menu dono ke)
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        // Purani active classes aur attributes hata dein
        link.classList.remove('active');
        link.removeAttribute('aria-current');

        // Link ki href check karein
        const linkHref = link.getAttribute('href');

        // Agar URL mein link ka naam mojood hai (e.g., booking.html)
        if (currentPath.includes(linkHref) && linkHref !== "") {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

// Page load hote hi run karein
document.addEventListener("DOMContentLoaded", setActiveLink);



// ================================
// Booking Form Handling
// ================================

const bookingForm2 = document.getElementById('bookingForm2');

if (bookingForm2) {
    bookingForm2.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        const fields = document.querySelectorAll('#bookingForm input, #bookingForm select, #bookingForm textarea');

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            alert("Please fill all fields correctly ❌");
            return;
        }

        // Get values
        const eventName = document.getElementById('eventName').value;
        const eventType = document.getElementById('eventType').value;
        const eventDate = document.getElementById('eventDate').value;
        const guestCount = document.getElementById('guestCount').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const details = document.getElementById('details').value;

        // WhatsApp number
        const myNumber = "923311302237";

        // Message
        const message = `🌟 *NEW EVENT INQUIRY* 🌟%0a%0a` +
                        `*Event:* ${eventName}%0a` +
                        `*Type:* ${eventType}%0a` +
                        `*Date:* ${eventDate}%0a` +
                        `*Guests:* ${guestCount}%0a%0a` +
                        `👤 *Client Details:*%0a` +
                        `*Name:* ${name}%0a` +
                        `*Email:* ${email}%0a` +
                        `*Phone:* ${phone}%0a%0a` +
                        `📝 *Notes:* ${details}`;

        const url = `https://wa.me/${myNumber}?text=${message}`;

        // Open WhatsApp
        window.open(url, '_blank');

        // Show success
        showSuccessMessage();

        // Reset form
        bookingForm2.reset();
    });
}
// ================================
// Success Message Notification
// ================================

function showSuccessMessage() {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        <strong>Success!</strong> Thank you for your inquiry. We'll contact you shortly to discuss your event.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const bookingSection = document.getElementById('booking');
    bookingSection.insertBefore(alertDiv, bookingSection.firstChild);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}
