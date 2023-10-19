// Get the elements
const slides = document.querySelectorAll('.slide');
const popup = document.getElementById('popup');
const popupImage = document.getElementById('popup-image');
const close = document.getElementById('close');

// Open the popup when a slide is clicked
slides.forEach(slide => {
    slide.addEventListener('click', () => {
        popup.style.display = 'block';
        popupImage.src = slide.querySelector('img').src;
    });
});

// Close the popup when the close button is clicked
close.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Close the popup when clicking outside the image
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});
