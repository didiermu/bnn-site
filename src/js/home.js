import { Modal } from "bootstrap";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

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

const videoHero = () => {
    const videoHero = document.querySelector(".hero video");
    videoHero.load();
};

////////// PANELES

const paneles = () => {
    return new Promise((resolve) => {
        const updateScrollTriggers = async () => {
            const contents = gsap.utils.toArray(".momentos");

            if (!mediaQueryDesktop.matches) {
                contents.forEach((el, i) => {
                    ScrollTrigger.create({
                        trigger: el,
                        start: "top top",
                        end: "top bottom",
                        pin: true,
                        pinSpacing: false,
                        endTrigger: ".logos",
                        id: i + 1,
                        markers: false,
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

                ScrollTrigger.refresh();
                // console.log("ScrollTrigger  desktop");
            } else {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
                contents.forEach((el) => el.removeAttribute("style"));
                // console.log(
                //     "ScrollTrigger deshabilitado"
                // );
            }

            await parallax(".momentos__info", ".momentos");
            await reveal(".servicios > *", ".servicios");
            await reveal(".inmotion > *", ".inmotion");
        };

        updateScrollTriggers();

        mediaQueryDesktop.addEventListener("change", async () => {
            await updateScrollTriggers();
        });

        resolve();
    });
};

////// PARALLAX

const parallax = (el, trigger, movimiento = 40, delay = 0) => {
    return new Promise((resolve) => {
        const sections = gsap.utils.toArray(el);
        const triggers = gsap.utils.toArray(trigger);

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
                        markers: false,
                    },
                }
            );
        });

        // console.log("Parallax configurado");
        resolve();
    });
};

////// MARQUESINA MOMENTOS

const marquesinaMomentos = (svgSelector) => {
    return new Promise((resolve) => {
        const svgElement = document.querySelector(svgSelector);
        const textElement = svgElement.querySelector(".text");
        const originalText = textElement.textContent.trim(); // Obtén el texto original
        const path = svgElement.querySelector("path"); // Selecciona el path del SVG
        const pathLength = path.getTotalLength(); // Longitud total del path
        const textWidth = textElement.getComputedTextLength(); // Ancho del texto original

        // Duplica el texto automáticamente para cubrir el path
        let repeatedText = originalText;
        while (
            textWidth * repeatedText.split(originalText).length <
            pathLength * 3
        ) {
            repeatedText += ` ${originalText} •`; // Agrega el texto original con un separador
        }

        textElement.textContent = repeatedText.trim(); // Actualiza el texto en el <textPath>

        // Configura la animación con GSAP
        gsap.set(svgElement, { autoAlpha: 1 }); // Asegura que el SVG sea visible

        gsap.timeline({ repeat: -1 }).fromTo(
            textElement,
            { attr: { startOffset: "0%" } }, // Inicia desde el principio del camino
            {
                attr: { startOffset: "-100%" }, // Desplaza el texto completamente
                duration: 20, // Ajusta la duración para controlar la velocidad
                ease: "none", // Movimiento constante
            }
        );

        resolve();
    });
};

const animacionRebote = (el, trigger, movimiento = 40, delay = 0) => {
    return new Promise((resolve) => {
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
        // console.log("rebote completada");
        resolve();
    });
};

const reveal = (el, trigger, movimiento = 40, baseDelay = 0) => {
    return new Promise((resolve) => {
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
                        markers: false,
                    },
                }
            );
        });
        // console.log("reveal completada");
        resolve();
    });
};

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

let swiperServicios;

const enabledSwiperServicios = () => {
    return new Promise((resolve) => {
        const pageLanguage = document.documentElement.lang || "en";
        let bulletTexts;

        if (pageLanguage == "es") {
            bulletTexts = [
                "Creatividad",
                "BI & Data",
                "Desarrollo",
                "Medios",
                "Producción",
                "Social Media",
            ];
        } else {
            bulletTexts = [
                "Creativity",
                "BI & Data",
                "Development",
                "Media",
                "Production",
                "Social Media",
            ];
        }

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
            const activeIndex = swiperServicios.activeIndex;

            const scrollContainer = document.querySelector(
                "#modal-servicios .swiper-pagination"
            );

            if (scrollContainer) {
                const activeBullet = scrollContainer.querySelector(
                    `.swiper-pagination-bullet:nth-child(${activeIndex + 1})`
                );

                if (activeBullet) {
                    activeBullet.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                    });
                }
            }
        });

        const linksModal = document.querySelectorAll(".servicios ul li");
        const modalServicios = document.querySelector("#modal-servicios");

        linksModal.forEach((element) => {
            element.addEventListener("click", () => {
                let dataSlide = element.dataset.slide;

                swiperServicios.slideTo(dataSlide);
            });
        });

        modalServicios.addEventListener("shown.bs.modal", (event) => {
            const activeIndex = swiperServicios.activeIndex;

            const scrollContainer = document.querySelector(
                "#modal-servicios .swiper-pagination"
            );

            if (scrollContainer) {
                const activeBullet = scrollContainer.querySelector(
                    `.swiper-pagination-bullet:nth-child(${activeIndex + 1})`
                );

                if (activeBullet) {
                    activeBullet.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                    });
                }
            }
        });

        // console.log("swioer servicios completada");
        resolve();
    });
};

///////// MARQUESINA
const marquesinaHero = () => {
    return new Promise((resolve) => {
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
                x: -contentWidth / 2,
                duration: 20,
                ease: "linear",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize((x) => parseFloat(x) % contentWidth),
                },
            });
        }

        function setupMarquee() {
            return new Promise((resolve) => {
                adjustContent();
                gsap.killTweensOf(".marquee-content");
                startMarquee();
                // console.log("marquesina completada");
                resolve();
            });
        }

        setupMarquee();
        resolve();
    });
};

// VIDEOS IN MOTION

const videoIn = () => {
    return new Promise((resolve) => {
        // const myModal = new Modal(document.getElementById("modal-video"));
        // myModal.show();
        const myModal = document.getElementById("modal-video");
        const videos = document.querySelectorAll(".inmotion figure");
        const btnPlayer = document.querySelector("button#player");
        const btnSound = document.querySelector("button#sound");
        const videoModal = document.querySelector("#modal-video video");

        videos.forEach((video) => {
            let srcVideo = video.dataset.video;
            video.addEventListener("click", () => {
                videoModal.setAttribute("src", srcVideo);
            });

            myModal.addEventListener("shown.bs.modal", (event) => {
                videoModal.play();
            });
            myModal.addEventListener("hide.bs.modal", (event) => {
                videoModal.pause();
                videoModal.currentTime = 0;
                videoModal.muted = false;
                btnPlayer.classList.remove("play");
                btnSound.classList.remove("muted");
            });

            btnPlayer.addEventListener("click", () => {
                if (videoModal.paused) {
                    btnPlayer.classList.remove("play");
                    videoModal.play();
                } else {
                    btnPlayer.classList.add("play");
                    videoModal.pause();
                }
            });
            btnSound.addEventListener("click", () => {
                videoModal.muted = !videoModal.muted;
                if (videoModal.muted) {
                    btnSound.classList.add("muted");
                } else {
                    btnSound.classList.remove("muted");
                }
            });
        });

        resolve();
    });
};

// videoIn();

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

////////////

async function init() {
    try {
        document.addEventListener("DOMContentLoaded", () => {
            window.scrollTo(0, 0);
        });

        videoHero();
        mediaQueryDesktop.addEventListener("change", videoHero);

        await paneles();

        // await setupMarquee();
        // window.addEventListener("resize", setupMarquee);

        await marquesinaHero();
        window.addEventListener("resize", marquesinaHero);

        await marquesinaMomentos("#forma-1");
        await marquesinaMomentos("#forma-2");
        await marquesinaMomentos("#forma-3");

        await animacionRebote(".momentos__categoria", ".momentos", -400);
        await enabledSwiperServicios();
        await videoIn();

        // console.log("Todas las funciones se ejecutaron en orden.");
    } catch (error) {
        console.error("Ocurrió un error:", error);
    }
}

init();
