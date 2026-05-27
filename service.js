 function openModal(imageSrc) {
            const modalImg = document.getElementById('myimage');
            if (modalImg) {
                modalImg.src = imageSrc;
                modalImg.alt = 'Event photo - full size view';
            }
        }

        /**
         * Debounce helper — limits how often a function can fire
         */
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        /**
         * Core function: rebuilds every carousel for mobile (1 image/slide)
         * or desktop (original 3-per-slide layout).
         */
        function setupResponsiveCarousels() {
            // Bootstrap's "md" breakpoint is 768px
            const isMobile = window.innerWidth < 768;
            const carousels = document.querySelectorAll('.carousel');

            carousels.forEach(carousel => {
                const carouselInner = carousel.querySelector('.carousel-inner');
                if (!carouselInner) return;

                // 1. Save the original desktop HTML the first time we touch this carousel
                if (!carousel.dataset.originalHtml) {
                    carousel.dataset.originalHtml = carouselInner.innerHTML;
                }

                if (isMobile) {
                    // 2a. Collect every unique <img> across all slides
                    const allImages = [];
                    const slides = carouselInner.querySelectorAll('.carousel-item');
                    slides.forEach(slide => {
                        const images = slide.querySelectorAll('img');
                        images.forEach(img => {
                            const src = img.getAttribute('src');
                            // Skip if we already have this image (avoids duplicates)
                            const alreadyCollected = allImages.some(item => item.src === src);
                            if (!alreadyCollected) {
                                allImages.push({
                                    src: src,
                                    alt: img.alt || '',
                                    classes: img.className || 'img-fluid custom-img clickable-img',
                                    onclick: img.getAttribute('onclick') || '',
                                    dataBsToggle: img.getAttribute('data-bs-toggle') || 'modal',
                                    dataBsTarget: img.getAttribute('data-bs-target') || '#imageModal',
                                    loading: img.getAttribute('loading') || 'lazy'
                                });
                            }
                        });
                    });

                    // 2b. Build mobile slides (1 image per slide)
                    let mobileHtml = '';
                    allImages.forEach((imgData, index) => {
                        const activeClass = index === 0 ? ' active' : '';
                        mobileHtml += `
                                <div class="carousel-item${activeClass}">
                                    <div class="container">
                                        <div class="row g-4">
                                            <div class="col-12">
                                                <img
                                                    src="${imgData.src}"
                                                    class="${imgData.classes}"
                                                    alt="${imgData.alt}"
                                                    loading="${imgData.loading}"
                                                    onclick="${imgData.onclick}"
                                                    data-bs-toggle="${imgData.dataBsToggle}"
                                                    data-bs-target="${imgData.dataBsTarget}"
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                    });

                    // 2c. Dispose old Bootstrap carousel instance, swap HTML, re-init
                    disposeCarousel(carousel);
                    carouselInner.innerHTML = mobileHtml;
                    initCarousel(carousel);

                } else {
                    // 3a. Desktop: restore original layout
                    if (carousel.dataset.originalHtml) {
                        disposeCarousel(carousel);
                        carouselInner.innerHTML = carousel.dataset.originalHtml;
                        // Ensure exactly one "active" slide
                        const allSlides = carouselInner.querySelectorAll('.carousel-item');
                        allSlides.forEach(s => s.classList.remove('active'));
                        const firstSlide = carouselInner.querySelector('.carousel-item');
                        if (firstSlide) {
                            firstSlide.classList.add('active');
                        }
                        initCarousel(carousel);
                    }
                }
            });
        }

        /**
         * Safely dispose a Bootstrap carousel instance if one exists
         */
        function disposeCarousel(carouselEl) {
            const instance = bootstrap.Carousel.getInstance(carouselEl);
            if (instance) {
                instance.dispose();
            }
        }

        /**
         * Initialize a fresh Bootstrap carousel (with optional auto-ride)
         */
        function initCarousel(carouselEl) {
            // If you want the carousel to auto-play, pass { ride: 'carousel' }
            // Otherwise just { ride: false } or omit.
            new bootstrap.Carousel(carouselEl, {
                ride: 'carousel', // keeps data-bs-ride behavior
                interval: 5000, // change slide every 5s (adjust as you like)
                wrap: true
            });
        }

        // ---------- Run on load & on resize ----------
        window.addEventListener('DOMContentLoaded', setupResponsiveCarousels);
        window.addEventListener('resize', debounce(setupResponsiveCarousels, 250));