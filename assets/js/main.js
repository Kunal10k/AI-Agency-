// const slider = document.querySelector(".slider");
// const slides = document.querySelectorAll(".slide");
// const dots = document.querySelectorAll(".dot");
// let index = 0;

// function animateContent(content) {
//     const tl = gsap.timeline();


//     tl.fromTo(content, {
//             scale: 0.95,
//             opacity: 0
//         }, {
//             scale: 1,
//             opacity: 1,
//             duration: 0.6,
//             ease: "power2.out"
//         })
//         .fromTo(content.querySelector(".tagline"), {
//             y: -20,
//             opacity: 0
//         }, {
//             y: 0,
//             opacity: 1,
//             duration: 0.4,
//             ease: "power2.out"
//         })
//         .fromTo(content.querySelector("h1"), {
//             y: 50,
//             opacity: 0
//         }, {
//             y: 0,
//             opacity: 1,
//             duration: 0.5,
//             ease: "power3.out"
//         }, "-=0.2")
//         .fromTo(content.querySelector("p"), {
//             y: 30,
//             opacity: 0
//         }, {
//             y: 0,
//             opacity: 1,
//             duration: 0.4,
//             ease: "power2.out"
//         }, "-=0.3")
//         .fromTo(content.querySelector(".btn"), {
//             y: 20,
//             opacity: 0
//         }, {
//             y: 0,
//             opacity: 1,
//             duration: 0.3,
//             ease: "power2.out"
//         }, "-=0.2");
// }

// function showSlide(i) {
//     slider.style.transform = `translateX(-${i * 100}%)`;
//     dots.forEach(dot => dot.classList.remove("active"));
//     dots[i].classList.add("active");

//     const currentContent = slides[i].querySelector(".content");
//     animateContent(currentContent);
// }

// function autoSlide() {
//     index = (index + 1) % slides.length;
//     showSlide(index);
// }

// let slideInterval = setInterval(autoSlide, 5000);

// dots.forEach((dot, i) => {
//     dot.addEventListener("click", () => {
//         index = i;
//         showSlide(index);
//         clearInterval(slideInterval);
//         slideInterval = setInterval(autoSlide, 5000);
//     });
// });

// showSlide(index);

// ***************************************************************************
// COUNTER JS (fixed)

// Counter JS
function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const suffix = counter.getAttribute("data-suffix") || "";
    const duration = 3000; // 3 seconds
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);

        counter.textContent = value.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

// Observe counters
const counters = document.querySelectorAll(".counter-number");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
            entry.target.classList.add("counted");
            animateCounter(entry.target);
        }
    });
}, { threshold: 0 }); // 👈 triggers as soon as visible

counters.forEach(counter => observer.observe(counter));


// ***************************************************************************


// ***********back to top started **************
(function () {
    const btn = document.getElementById('backToTop');
    const icon = btn.querySelector('i');

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const showAt = 300;
                if (window.scrollY > showAt) {
                    btn.classList.add('show');
                } else {
                    btn.classList.remove('show');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        icon.classList.remove('blastoff');
        void icon.offsetWidth;
        icon.classList.add('blastoff');

        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => icon.classList.remove('blastoff'), 900);
    });
})();
//   ************** back to top ended **************


// *************** animated text started ****************

document.querySelectorAll(".animate").forEach((el) => {
    let animType = el.dataset.animate;

    let typeSplit = new SplitType(el, {
        types: "lines, words, chars",
        tagName: "span",
    });

    let lines = el.querySelectorAll(".line");

    switch (animType) {
        case "fade":
            gsap.from(lines, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: el,
                    start: "top center",
                    scrub: true,
                },
            });
            break;

        case "scale":
            gsap.from(lines, {
                opacity: 0,
                scale: 0.5,
                duration: 0.6,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: el,
                    start: "top center",
                    scrub: true,
                },
            });
            break;

        case "rotate":
            gsap.from(lines, {
                opacity: 0,
                rotation: 45,
                duration: 0.6,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: el,
                    start: "top center",
                    scrub: true,
                },
            });
            break;

        default:
            gsap.from(lines, {
                opacity: 0.3,
                duration: 0.5,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: el,
                    start: "top center",
                    scrub: true,
                },
            });
    }
});

//   ********* animated text ended *********


// ********************* water effect  started ************
