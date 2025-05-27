let heartButton = document.getElementById('buttonHeart');
let textOnScreen = document.getElementById('textScreen');
const initialScreen = document.getElementById('initialScreen');
const mainContent = document.getElementById('mainContent');

const messages = [
    "I love you", 
    "You are my everything", 
    "Are you ready?", 
    "Enjoy...",
    "<3"
];
let currentMessageIndex = 0;
textOnScreen.textContent = messages[currentMessageIndex];

heartButton.addEventListener('click', function() {
    // Adiciona a classe para a animação do botão
    heartButton.classList.add('button-click-animation');

    // Remove a classe da animação após um curto período para que possa ser acionada novamente
    setTimeout(() => {
        heartButton.classList.remove('button-click-animation');
    }, 300); // Duração da animação do botão

    currentMessageIndex++;
    if (currentMessageIndex < messages.length) {
        textOnScreen.textContent = messages[currentMessageIndex];
    } else {
        initialScreen.classList.add('hide');
        setTimeout(() => {
            mainContent.classList.add('show');
            startCarousel(); // Inicia o carrossel após o conteúdo principal aparecer
            updateTimeTogether(); // Inicia a atualização do tempo
            setInterval(updateTimeTogether, 1000 * 60 * 60 * 24); // Atualiza diariamente
        }, 1000);
    } 
});

// --- Photo Carousel Logic ---
let slideIndex = 0;
let slides = document.querySelectorAll('.carousel-slide img');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
let carouselInterval;

function showSlides(n) {
    // Remove a classe 'active' de todas as slides para a transição
    slides.forEach(slide => slide.classList.remove('active'));

    if (n >= slides.length) { 
        slideIndex = 0; 
    }
    if (n < 0) { 
        slideIndex = slides.length - 1; 
    }

    // Adiciona a classe 'active' apenas à slide atual
    slides[slideIndex].classList.add('active');
}

function plusSlides(n) {
    clearInterval(carouselInterval);
    showSlides(slideIndex += n);
    startCarousel();
}

function startCarousel() {
    clearInterval(carouselInterval);

    showSlides(slideIndex); 
    carouselInterval = setInterval(() => {
        plusSlides(1); 
    }, 5000); 
}


if (prevButton) {
    prevButton.addEventListener('click', () => plusSlides(-1));
}
if (nextButton) {
    nextButton.addEventListener('click', () => plusSlides(1));
}

function updateTimeTogether() {
    const startDate = new Date('2024-05-28T00:00:00');
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days = prevMonthLastDay + days;
    }

    if (months < 0) {
        years--;
        months = 12 + months;
    }

    const timeTogetherSpan = document.getElementById('timeTogether');
    if (timeTogetherSpan) {
        timeTogetherSpan.textContent = `${years} years, ${months} months and ${days} days`;
    }
}