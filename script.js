// ================================
// Smooth Scroll Navigation
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile nav if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                toggler.click();
            }
        }
    });
});

// ================================
// Navbar Scroll Effect
// ================================

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ================================
// Booking Form Handling
// ================================

const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
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
        bookingForm.reset();
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

// ================================
// Intersection Observer for Fade-in Effects
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach((el, index) => {
    el.style.animation = 'none';
    el.style.opacity = '0';
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
});

// Observe menu cards
document.querySelectorAll('.menu-card').forEach((el, index) => {
    el.style.animation = 'none';
    el.style.opacity = '0';
    observer.observe(el);
});

// Observe process steps
document.querySelectorAll('.process-step').forEach((el, index) => {
    el.style.animation = 'none';
    el.style.opacity = '0';
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
});

// ================================
// Form Validation
// ================================

const inputFields = document.querySelectorAll('.form-control, .form-select');
inputFields.forEach(field => {
    field.addEventListener('blur', function() {
        validateField(this);
    });
    
    field.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    
    if (!value) {
        field.classList.add('is-invalid');
        return false;
    }
    
    // Email validation
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('is-invalid');
            return false;
        }
    }
    
    // Phone validation
    if (field.id === 'phone') {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
            field.classList.add('is-invalid');
            return false;
        }
    }
    
    // Date validation (ensure it's in the future)
    if (field.type === 'date') {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            field.classList.add('is-invalid');
            return false;
        }
    }
    
    // Guest count validation
    if (field.id === 'guestCount') {
        if (parseInt(value) < 10) {
            field.classList.add('is-invalid');
            return false;
        }
    }
    
    field.classList.remove('is-invalid');
    return true;
}

// ================================
// Active Nav Link Highlighting
// ================================

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// ================================
// Add CSS for Active Nav Link
// ================================

const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--gold) !important;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ================================
// Testimonial Auto-rotation
// ================================

const carouselElement = document.getElementById('testimonialCarousel');
if (carouselElement) {
    const bootstrap = window.bootstrap; // Declare the bootstrap variable
    const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 5000,
        pause: 'hover',
        ride: 'carousel'
    });
}

// ================================
// Add Stagger Animation to Form Fields
// ================================

const formGroups = document.querySelectorAll('.booking-form > .row');
formGroups.forEach((group, index) => {
    group.style.opacity = '0';
    group.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
});

// ================================
// Menu Card Lazy Loading
// ================================

if ('IntersectionObserver' in window) {
    const menuImages = document.querySelectorAll('.menu-image img');
    
    menuImages.forEach(img => {
        const src = img.getAttribute('src');
        
        const menuObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'opacity 0.3s ease';
                    observer.unobserve(entry.target);
                }
            });
        });
        
        menuObserver.observe(img);
    });
}

// ================================
// Date Input Min Constraint
// ================================

const dateInput = document.getElementById('eventDate');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// ================================
// Guest Count Input Range
// ================================

const guestCountInput = document.getElementById('guestCount');
if (guestCountInput) {
    guestCountInput.addEventListener('change', function() {
        if (parseInt(this.value) < 10) {
            this.value = 10;
        }
    });
}









// navbar



const button = document.getElementById("bar")

var flag = false
const changeIcon = ()=>{
    
   

if(flag === false){
    
 button.innerHTML = `
   <i class="fa-solid fa-xmark"></i>
    `
flag = true;

}

else{
    button.innerHTML=`
    <i class="fa-solid fa-bars"></i>
    `
    flag = false;
}

}

button.addEventListener("click",changeIcon)


const checkbox = document.getElementById('click');

checkbox.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }
});