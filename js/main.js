document.addEventListener('DOMContentLoaded', function () {
    // Slider functionality
    let currentSlide = 0;
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const totalSlides = slides.length;
    let slideInterval;

    function goToSlide(index) {
        if (slider) {
            slider.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentSlide = index;
        }
    }

    function startSlider() {
        slideInterval = setInterval(() => {
            const nextIndex = (currentSlide + 1) % totalSlides;
            goToSlide(nextIndex);
        }, 4000); // Auto-scroll every 4 seconds
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    if (slider && slides.length > 0 && dots.length > 0) {
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        // Optional: Pause slider on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSlider);
            sliderContainer.addEventListener('mouseleave', startSlider);
        }

        // Start the slider
        startSlider();
    }


    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Optional: Close all other FAQ items when one is opened
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle the clicked item
                faqItem.classList.toggle('active');
            });
        });
    }

    // This script fetches the header from 'header.html' and inserts it.
    fetch('header.html')
      .then(response => response.text())
      .then(data => {
        const headerContainer = document.getElementById('header-container');
        if(headerContainer) {
            headerContainer.innerHTML = data;

            // Highlight active nav link based on current page
            const path = window.location.pathname;
            const pageName = path.split("/").pop();

            if (pageName === 'index.html' || pageName === '') {
              document.getElementById('homeLink')?.classList.add('active');
            } else if (pageName === 'about%20us.html' || pageName === 'about us.html') {
              document.getElementById('aboutLink')?.classList.add('active');
            } else if (pageName === 'ClubsComs.html') {
              document.querySelector('a[href="ClubsComs.html"]')?.classList.add('active');
            } else if (pageName === 'contact_repository.html') {
                document.querySelector('a[href="contact_repository.html"]')?.classList.add('active');
            } else if (pageName === 'login.html') {
                document.getElementById('loginLink')?.classList.add('active');
            }
        }
      })
      .catch(error => console.error('Error fetching header:', error));
});
