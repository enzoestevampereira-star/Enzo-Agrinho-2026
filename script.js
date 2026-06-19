document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Efeito de Scroll Suave para a Barra de Navegação (Melhoria de UX)
    const links = document.querySelectorAll(".nav-links a, .btn-primary");
    
    for (const link of links) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Deslocamento para não cobrir o título com o menu fixo
                const headerOffset = 70;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    }

    // 2. Animação de Surgimento (Fade-In) ao rolar a página até os cards
    const cards = document.querySelectorAll(".animate-box");

    const observerOptions = {
        root: null, // usa a viewport do navegador
        threshold: 0.15, // ativa quando 15% do elemento estiver visível
        rootMargin: "0px"
    };

    const cardObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                // Uma vez animado, não precisa observar novamente
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        cardObserver.observe(card);
    });
});
