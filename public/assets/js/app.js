

const ratio = 0.20;
const options = {
    root: null,
    rootMargin: '0px',
    threshold: ratio
};

const handleIntersect = function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.intersectionRatio > ratio) {
            entry.target.classList.add('reveal-visible');
        } else {
            entry.target.classList.remove('reveal-visible');
        }
    });
};

const observer = new IntersectionObserver(handleIntersect, options);
const elements = document.querySelectorAll('[class*="reveal-"]');

elements.forEach(function(element) {
    observer.observe(element);
});

// Fonction pour reconnecter les éléments à l'observateur lorsqu'ils deviennent visibles à nouveau
const reconnectElements = function() {
    elements.forEach(function(element) {
        if (!element.classList.contains('reveal-visible')) {
            observer.observe(element);
        }
    });
};

// Écouteur d'événement pour reconnecter les éléments lorsque la fenêtre est redimensionnée
window.addEventListener('resize', reconnectElements);
