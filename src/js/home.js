import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";
gsap.registerPlugin(ScrollTrigger);

//// SWIPER

import Swiper from "swiper";
import {
    Navigation,
    Pagination,
    Autoplay,
    EffectCoverflow,
    FreeMode,
} from "swiper/modules";
import "swiper/swiper-bundle.css";

const mediaQueryDesktop = window.matchMedia("(max-width: 1279px)");

////////// PANELES

const paneles = () => {
    if (mediaQueryDesktop.matches) {
        console.log("m");
    } else {
        // console.log("d");
        const contents = gsap.utils.toArray(".momentos");

        contents.forEach((el, i) => {
            ScrollTrigger.create({
                trigger: el,
                start: "top top",
                end: "top bottom",
                pin: true,
                pinSpacing: false,
                endTrigger: ".logos",
                id: i + 1,
                // markers: { indent: 150 * i },
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.to(el, {
                        scale: 1 - progress,
                        duration: 0.1,
                        overwrite: true,
                    });
                },
            });
        });
    }
};
// gsap.registerPlugin(ScrollTrigger);

mediaQueryDesktop.addListener(paneles);
paneles();

////// PARALLAX

const parallax = (el, trigger, movimiento = 40, delay = 0) => {
    var sections = gsap.utils.toArray(el);
    var triggers = gsap.utils.toArray(trigger);

    sections.forEach((section, index) => {
        gsap.fromTo(
            section,
            {
                yPercent: movimiento,
                opacity: 0,
            },
            {
                yPercent: 0,
                opacity: 1,
                duration: 0.5,
                ease: "none",
                delay: delay,
                scrollTrigger: {
                    trigger: triggers[index],
                    end: "+=500 center",
                    scrub: 1,
                    toggleActions: "restart pause reverse pause",
                    // markers: true,
                },
            }
        );
    });
};

parallax(".momentos__info", ".momentos");

const animacionRebote = (el, trigger, movimiento = 40, delay = 0) => {
    var sections = gsap.utils.toArray(el);
    var triggers = gsap.utils.toArray(trigger);

    sections.forEach((section, index) => {
        gsap.fromTo(
            section,
            {
                yPercent: movimiento,
                opacity: 0,
            },
            {
                yPercent: 0,
                opacity: 1,
                duration: 0.5,
                ease: "bounce.out",
                delay: delay,
                scrollTrigger: {
                    trigger: triggers[index],
                    start: "-=100 center",
                    end: "+=200 center",
                    scrub: 5,
                    toggleActions: "restart pause reverse pause",
                    // markers: true,
                },
            }
        );
    });
};

animacionRebote(".momentos__categoria", ".momentos", -400);

const reveal = (el, trigger, movimiento = 40, baseDelay = 0) => {
    var sections = gsap.utils.toArray(el);

    sections.forEach((section, index) => {
        gsap.fromTo(
            section,
            {
                yPercent: movimiento,
                opacity: 0,
            },
            {
                yPercent: 0,
                opacity: 1,
                duration: 0.5,
                ease: "none",
                delay: baseDelay,
                scrollTrigger: {
                    trigger: trigger,
                    start: "-=200 center",
                    end: "center center",
                    scrub: 1,
                    toggleActions: "restart pause reverse pause",
                    // markers: true,
                },
            }
        );
    });
};

reveal(".servicios > *", ".servicios");
reveal(".inmotion > *", ".inmotion");

//// LOGOS

var swiperOptions = {
    modules: [Autoplay, EffectCoverflow, FreeMode],
    loop: true,
    freeMode: true,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    loopAddBlankSlides: true,
    cssMode: true,
    slidesPerView: "auto",
    speed: 5000,
    grabCursor: true,
    loopAdditionalSlides: 2,
    allowTouchMove: false,
    effect: "coverflow",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 0,
        modifier: 1,
    },
};

var swiper = new Swiper(".swiper-logos", swiperOptions);

////// SLIDER SERVICIOS
// import { Modal } from "bootstrap";
// const myModal = new Modal(document.getElementById("modal-servicios"));
// myModal.show();

let swiperServicios;

const enabledSwiperServicios = () => {
    const bulletTexts = [
        "Creatividad",
        "BI & Data",
        "Desarrollo",
        "Medios",
        "Producción",
        "Social Media",
    ];

    swiperServicios = new Swiper(".swiper-servicios", {
        modules: [Navigation, Pagination],
        direction: "vertical",
        slidesPerView: "auto",
        allowTouchMove: false,
        navigation: {
            prevEl: ".swiper-navigation-servicios .swiper-button-prev",
            nextEl: ".swiper-navigation-servicios .swiper-button-next",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            type: "bullets",
            renderBullet: (index, className) => {
                return `<div class="${className}"><h5>
                    ${bulletTexts[index]}
                </h5></div>`;
            },
        },
    });

    swiperServicios.on("slideChange", () => {
        // Obtén el índice activo del slider
        const activeIndex = swiperServicios.activeIndex;

        // Contenedor del scroll (la paginación)
        const scrollContainer = document.querySelector(
            "#modal-servicios .swiper-pagination"
        );

        if (scrollContainer) {
            // Obtén el bullet activo basado en el índice activo
            const activeBullet = scrollContainer.querySelector(
                `.swiper-pagination-bullet:nth-child(${activeIndex + 1})`
            );

            if (activeBullet) {
                // Asegúrate de que el bullet activo sea visible
                activeBullet.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center", // Centrar horizontalmente
                });
            }
        }
    });
};

enabledSwiperServicios();

///////// MARQUESINA
const marquee = document.getElementById("marquee");
const marqueeContainer = document.querySelector(".marquee-container");

function adjustContent() {
    const marqueeText = marquee.querySelector("span").textContent;
    const containerWidth = marqueeContainer.offsetWidth;
    let contentWidth = marquee.offsetWidth;

    // Elimina duplicaciones previas
    marquee.innerHTML = `<span>${marqueeText} </span>`;

    // Duplica el contenido hasta que sea mayor al ancho del contenedor
    while (contentWidth < containerWidth * 2) {
        marquee.innerHTML += marquee.innerHTML;
        contentWidth = marquee.offsetWidth;
    }
}

function startMarquee() {
    const contentWidth = marquee.offsetWidth;

    gsap.to(".marquee-content", {
        x: -contentWidth / 2, // Desplaza solo la mitad del contenido duplicado
        duration: 20, // Duración ajustable
        ease: "linear", // Movimiento constante
        repeat: -1, // Repetición infinita
        modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % contentWidth), // Reinicia el ciclo suavemente
        },
    });
}

function setupMarquee() {
    adjustContent(); // Duplica el contenido según el tamaño
    gsap.killTweensOf(".marquee-content"); // Elimina cualquier animación previa
    startMarquee(); // Inicia la animación
}

setupMarquee();

window.addEventListener("resize", setupMarquee);

// VIDEOS IN MOTION

const videoIn = () => {
    const videos = document.querySelectorAll(".inmotion video");

    videos.forEach((video) => {
        const togglePlayPause = function () {
            if (this.paused) {
                this.play();
                this.setAttribute("class", "play");
            } else {
                this.pause();
                this.removeAttribute("class");
            }
        };

        const playVideo = function () {
            this.play();
        };

        const stopVideo = function () {
            this.pause();
            this.currentTime = 0;
            this.load();
            this.removeAttribute("controls");
        };

        const handlePlay = function () {
            this.setAttribute("class", "play");
        };

        const handleEnded = function () {
            this.removeAttribute("class");
            stopVideo.call(this);
        };

        const manageVideoEventsLocales = () => {
            if (mediaQueryDesktop.matches) {
                // video.removeEventListener("mouseenter", playVideo);
                // video.removeEventListener("mouseenter", handlePlay);
                // video.removeEventListener("mouseleave", stopVideo);
                // video.removeEventListener("mouseleave", handleEnded);
                video.addEventListener("click", togglePlayPause);
                // console.log("m");
            } else {
                console.log("d");
                video.addEventListener("mouseenter", playVideo);
                video.addEventListener("mouseenter", handlePlay);
                video.addEventListener("mouseleave", stopVideo);
                video.addEventListener("mouseleave", handleEnded);
            }

            video.addEventListener("play", handlePlay);
            video.addEventListener("ended", handleEnded);
        };

        manageVideoEventsLocales();
        mediaQueryDesktop.addListener(manageVideoEventsLocales);
    });
};

videoIn();

////////// CINTILLO

let xPos = 0;

gsap.timeline()
    .set(".ring", { rotationY: 180 }) //set initial rotationY so the parallax jump happens off screen
    .set(".img", {
        // apply transform rotations to each image
        rotateY: (i) => i * -36,
        transformOrigin: "50% 50% 500px",
        z: -500,
        backfaceVisibility: "hidden",
    })
    .from(".img", {
        duration: 1.5,
        stagger: 0.1,
        ease: "expo",
    });

// Automatic rotation
gsap.to(".ring", {
    rotationY: "+=360", // Rotate 360 degrees
    duration: 10, // Duration for one full rotation
    ease: "none", // Constant speed
    repeat: -1, // Infinite loop
    onUpdate: () => {
        gsap.set(".img", { backgroundPosition: (i) => getBgPos(i) });
    },
});

function getBgPos(i) {
    //returns the background-position string to create parallax movement in each image
    return (
        100 -
        (gsap.utils.wrap(
            0,
            360,
            gsap.getProperty(".ring", "rotationY") - 180 - i * 36
        ) /
            360) *
            500 +
        "px 0px"
    );
}
