document.addEventListener('DOMContentLoaded', function () {
    // This function handles the horizontal scrolling for a given carousel
    window.scrollCarousel = function(carouselId, direction) {
        const carousel = document.getElementById(carouselId);
        if (carousel) {
            // Define the amount to scroll based on the card width and gap
            const scrollAmount = 350; // Card width (300px) + gap (2rem = 32px) approx.
            if (direction === 'left') {
                carousel.scrollLeft -= scrollAmount;
            } else {
                carousel.scrollLeft += scrollAmount;
            }
        }
    };
});
