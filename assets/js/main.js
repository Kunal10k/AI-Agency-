const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let index = 0;

function animateContent(content) {
    const tl = gsap.timeline();

    // Zoom effect + fade in (দ্রুত)
    tl.fromTo(content, {
            scale: 0.95,
            opacity: 0
        }, {
            scale: 1,
            opacity: 1,
            duration: 0.6, // fast zoom
            ease: "power2.out"
        })
        .fromTo(content.querySelector(".tagline"), {
            y: -20,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        })
        .fromTo(content.querySelector("h1"), {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out"
        }, "-=0.2")
        .fromTo(content.querySelector("p"), {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        }, "-=0.3")
        .fromTo(content.querySelector(".btn"), {
            y: 20,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        }, "-=0.2");
}

function showSlide(i) {
    slider.style.transform = `translateX(-${i * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[i].classList.add("active");

    const currentContent = slides[i].querySelector(".content");
    animateContent(currentContent);
}

function autoSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
}

let slideInterval = setInterval(autoSlide, 5000);

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        showSlide(index);
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, 5000);
    });
});

showSlide(index);

// ***************************************************************************

// counter js 

// Smooth counter animation
function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const suffix = counter.getAttribute("data-suffix") || "";
    const duration = 3000; // 3 seconds (slow)
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // 0 → 1
        const value = Math.floor(progress * target);

        counter.innerText = value.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

// Trigger on scroll
const counters = document.querySelectorAll(".counter-number");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
            entry.target.classList.add("counted");
            animateCounter(entry.target);
        }
    });
}, {
    threshold: 0.5
});

counters.forEach(counter => observer.observe(counter));

//counter js 

// ***************************************************************************



// ***********back to top started **************
(function () {
    const btn = document.getElementById('backToTop');
    const icon = btn.querySelector('i');

    // Show/hide on scroll (with a tiny throttle)
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const showAt = 300; // px scrolled before showing
                if (window.scrollY > showAt) {
                    btn.classList.add('show');
                } else {
                    btn.classList.remove('show');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, {
        passive: true
    });

    // Smooth scroll to top + blastoff animation
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        icon.classList.remove('blastoff'); // restart if needed
        // Force reflow so animation can retrigger
        void icon.offsetWidth;
        icon.classList.add('blastoff');

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Clean up the icon state after the animation
        setTimeout(() => icon.classList.remove('blastoff'), 900);
    });
})();
//   ************** back to top ended **************

// *************** animated text started ****************

// SplitType on all elements with .animate-text class
// Split all animate elements
let typeSplit = new SplitType('[animate]', {
    types: 'lines, words, chars',
    tagName: 'span'
})

// Animate each animate element separately
gsap.utils.toArray('[animate]').forEach(el => {
    gsap.from(el.querySelectorAll('.word'), {
        opacity: 0.2,
        y: 30,
        duration: 0.3, // ছোট মান = দ্রুত speed
        ease: 'power4.out',
        stagger: 0.05,
        scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
            // scrub:true দিলে স্ক্রল এর সাথে সাথে animate হবে
        }
    })
})

//   ********* animated text ended *********








// ********************* water effect  started ************

const turb = document.getElementById('turb');
const disp = document.getElementById('disp');
let anim;

const frame = document.querySelector('.frame');

frame.addEventListener('mouseenter', () => {
    // displacement scale up
    gsap.to(disp, {
        attr: {
            scale: 20
        },
        duration: 0.8,
        ease: "sine.out"
    });

    // start turbulence animation
    anim = gsap.to(turb, {
        attr: {
            baseFrequency: "0.012 0.026"
        },
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

frame.addEventListener('mouseleave', () => {
    // stop turbulence animation
    if (anim) anim.kill();

    // reset turbulence + scale back
    gsap.to(disp, {
        attr: {
            scale: 0
        },
        duration: 1,
        ease: "sine.inOut"
    });
    gsap.to(turb, {
        attr: {
            baseFrequency: "0.018 0.03"
        },
        duration: 1
    });
});






