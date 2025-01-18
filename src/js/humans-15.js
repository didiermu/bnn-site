import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import lottie from "lottie-web";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const mediaQueryDesktop = window.matchMedia("(max-width: 1279px)");

////////// FADE

const revealY = (el, trigger, movimiento = 40, baseDelay = 0) => {
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
                    end: "+=200 center",
                    scrub: 1,
                    toggleActions: "restart pause reverse pause",
                    // markers: true,
                },
            }
        );
    });
};

const revealX = (el, trigger, movimiento = 40, baseDelay = 0) => {
    var sections = gsap.utils.toArray(el);

    sections.forEach((section, index) => {
        gsap.fromTo(
            section,
            {
                xPercent: movimiento,
                opacity: 0,
            },
            {
                xPercent: 0,
                opacity: 1,
                duration: 0.5,
                ease: "none",
                delay: baseDelay,
                scrollTrigger: {
                    trigger: trigger,
                    start: "-=200 center",
                    end: "+=200 center",
                    scrub: 1,
                    toggleActions: "restart pause reverse pause",
                    // markers: true,
                },
            }
        );
    });
};

////////// PANELES

let lottieAnimation = null;

const initLottieAnimation = (totalDuration) => {
    return new Promise(async (resolve) => {
        // Si la animación ya existe, destrúyela antes de crear una nueva
        if (lottieAnimation) {
            lottieAnimation.destroy();
        }

        // Crear una nueva animación de Lottie
        lottieAnimation = lottie.loadAnimation({
            container: document.getElementById("humans-gif"), // Contenedor del Lottie
            renderer: "svg",
            loop: false,
            autoplay: false,
            path: "./../lottie/GIF_HUMANS3.lottie.json", // Ruta al archivo Lottie JSON
        });

        lottieAnimation.addEventListener("DOMLoaded", () => {
            const totalFrames = lottieAnimation.totalFrames;

            // Crear ScrollTrigger para sincronizar con Lottie
            ScrollTrigger.create({
                trigger: ".humans",
                start: "top top",
                end: "+=" + `${totalDuration}s`,
                scrub: true,
                markers: false,
                onUpdate: (self) => {
                    // Calcular el frame actual basado en el progreso del scroll
                    const frame = Math.round(totalFrames * self.progress);
                    const clampedFrame = Math.min(
                        totalFrames - 1,
                        Math.max(0, frame)
                    ); // Limitar el rango
                    lottieAnimation.goToAndStop(clampedFrame, true);
                },
            });
        });

        console.log("initlottie");
        // await initScrollTrigger();
        resolve();
    });
};

// Función para inicializar ScrollTrigger
const initScrollTrigger = () => {
    return new Promise(async (resolve) => {
        // Selecciona dinámicamente los elementos después de modificar el DOM
        const headings = document.querySelectorAll(".heading");
        const nums = document.querySelectorAll(".scroll-num");
        const cajaHeading = document.querySelectorAll(".historia__panel__item");
        const headingSection = document.querySelector(".historia .content-box");
        const numOfTransitions = headings.length;
        const singleDuration = 500;
        const totalDuration = singleDuration * numOfTransitions;

        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        headings.forEach((heading, i) => {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heading,
                    toggleActions: "play reverse play reverse",
                    start: "+=" + `${singleDuration * i}s`,
                    end: "+=" + `${singleDuration}s`,
                    onEnter: () => {
                        gsap.to([heading, nums[i]], { opacity: 1 });
                    },
                    onLeave: () => {
                        gsap.to([heading, nums[i]], { opacity: 0 });
                        if (i === headings.length - 1) {
                            gsap.to([heading, nums[i]], { opacity: 1 });
                        }
                    },
                    onEnterBack: () => {
                        gsap.to([heading, nums[i]], { opacity: 1 });
                    },
                    onLeaveBack: () => {
                        if (i === 0) return;
                        gsap.to([heading, nums[i]], { opacity: 0 });
                    },
                },
            });
        });

        gsap.to("#humans-gif", {
            scrollTrigger: {
                trigger: ".header",
                end: "+=" + `${totalDuration}s`,
                pin: ".historia",
                pinSpacing: true,
                // markers: true,
            },
        });

        ScrollTrigger.refresh();

        console.log("initscroll");
        initLottieAnimation(totalDuration);

        await revealX(".adn .title-decorated", ".adn");
        await revealY(".adn .row .row > *", ".adn");
        await revealY(".team .title-decorated", ".team");
        await revealY(".team .team--layout", ".team", undefined, 3);

        resolve();
    });
};

// Función para manejar los cambios según el media query
const updateLayoutBasedOnMediaQuery = () => {
    return new Promise(async (resolve) => {
        const headingSection = document.querySelector(".historia .content-box");
        const cajaHeading = document.querySelectorAll(".historia__panel__item");

        if (mediaQueryDesktop.matches) {
            const template = `
            <div class="heading" id="heading4"><div class="historia__panel"></div></div>
            <div class="heading" id="heading5"><div class="historia__panel"></div></div>
        `;
            headingSection.insertAdjacentHTML("beforeend", template);

            document
                .querySelector("#heading2 .historia__panel")
                .appendChild(cajaHeading[1]);
            document
                .querySelector("#heading3 .historia__panel")
                .appendChild(cajaHeading[2]);
            document
                .querySelector("#heading4 .historia__panel")
                .appendChild(cajaHeading[3]);
            document
                .querySelector("#heading5 .historia__panel")
                .appendChild(cajaHeading[4]);
        } else {
            document
                .querySelector("#heading1 .historia__panel")
                .appendChild(cajaHeading[1]);
            document
                .querySelector("#heading2 .historia__panel")
                .appendChild(cajaHeading[2]);
            document
                .querySelector("#heading2 .historia__panel")
                .appendChild(cajaHeading[3]);
            document
                .querySelector("#heading3 .historia__panel")
                .appendChild(cajaHeading[4]);

            if (document.querySelector("#heading4")) {
                document.querySelector("#heading4").remove();
                document.querySelector("#heading5").remove();
            }
        }

        ScrollTrigger.refresh();
        initScrollTrigger();
        await adn();
        console.log("update");
        resolve();
    });
};

// mediaQueryDesktop.addEventListener("change", updateLayoutBasedOnMediaQuery);

// updateLayoutBasedOnMediaQuery();

/////////// ADN

const adn = () => {
    return new Promise((resolve) => {
        let start;
        if (mediaQueryDesktop.matches) {
            // console.log("m");
            start = "+=100 top";
        } else {
            start = "top top";
            // console.log("d");
        }

        const container = document.querySelector(".adn");
        const imgAdn = document.querySelector("#canvas");

        const ctx = imgAdn.getContext("2d");

        const imgOriginal = new Image();
        imgOriginal.src = "../img/circulos.png";
        const imgChanged1 = new Image();
        imgChanged1.src = "../img/circulos-1.png";
        const imgChanged2 = new Image();
        imgChanged2.src = "../img/circulos-2.png";
        const imgChanged3 = new Image();
        imgChanged3.src = "../img/circulos-3.png";
        const imgChanged4 = new Image();
        imgChanged4.src = "../img/circulos-4.png";

        let currentImage = imgOriginal;

        imgOriginal.onload = function () {
            ctx.drawImage(currentImage, 0, 0, imgAdn.width, imgAdn.height);
        };

        const items = document.querySelectorAll(".adn__hover-item");

        const scrollTrigger = ScrollTrigger.create({
            trigger: ".adn",
            start: start,
            end: "bottom+=400 top",
            pin: ".adn",
            pinSpacer: true,
            scrub: true,
            toggleActions: "play reverse play reverse",
            // markers: true,

            onUpdate: (self) => {
                const progress = self.progress;
                let currentMoment = "";

                if (progress === 0) {
                    currentMoment = "";
                    currentImage = imgOriginal;
                } else if (progress >= 0 && progress < 0.25) {
                    currentMoment = "moment-1";
                    currentImage = imgChanged1;
                } else if (progress >= 0.25 && progress < 0.5) {
                    currentMoment = "moment-2";
                    currentImage = imgChanged2;
                } else if (progress >= 0.5 && progress < 0.75) {
                    currentMoment = "moment-3";
                    currentImage = imgChanged3;
                } else if (progress >= 0.75 && progress <= 1) {
                    currentMoment = "moment-4";
                    currentImage = imgChanged4;
                }

                // Redibujar la imagen en el canvas
                ctx.clearRect(0, 0, imgAdn.width, imgAdn.height);
                ctx.drawImage(currentImage, 0, 0, imgAdn.width, imgAdn.height);

                if (!container.classList.contains(currentMoment)) {
                    container.classList.remove(
                        "moment-1",
                        "moment-2",
                        "moment-3",
                        "moment-4"
                    );

                    if (currentMoment) {
                        container.classList.add(currentMoment);
                    }
                }
            },
        });

        imgAdn.addEventListener("click", function (event) {
            const x = event.offsetX;
            const y = event.offsetY;
            const tamañoZona = 100;

            container.classList.remove(
                "moment-1",
                "moment-2",
                "moment-3",
                "moment-4"
            );

            // Cambiar imagen dependiendo de la posición del mouse
            // rango exacto if (x >= 425 && x <= 435 && y >= 2 && y <= 12) {

            if (
                x > 410 - tamañoZona / 2 &&
                x < 410 + tamañoZona / 2 &&
                y > 90 - tamañoZona / 2 &&
                y < 90 + tamañoZona / 2
            ) {
                progress = 0.25;
                container.classList.add("moment-1");
                currentImage = imgChanged1;
            } else if (
                x > 290 - tamañoZona / 2 &&
                x < 290 + tamañoZona / 2 &&
                y > 325 - tamañoZona / 2 &&
                y < 325 + tamañoZona / 2
            ) {
                currentImage = imgChanged2;
                canvas.style.cursor = "pointer";
            } else if (
                x > 250 - tamañoZona / 2 &&
                x < 250 + tamañoZona / 2 &&
                y > 380 - tamañoZona / 2 &&
                y < 380 + tamañoZona / 2
            ) {
                currentImage = imgChanged3;
                canvas.style.cursor = "pointer";
            } else if (
                x > 216 - tamañoZona / 2 &&
                x < 216 + tamañoZona / 2 &&
                y > 474 - tamañoZona / 2 &&
                y < 474 + tamañoZona / 2
            ) {
                currentImage = imgChanged4;
                canvas.style.cursor = "pointer";
            } else {
                currentImage = imgOriginal;
                canvas.style.cursor = "default";
            }

            // Redibujar la imagen en el canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);

            document.getElementById(
                "coords"
            ).textContent = `Coordenadas: X: ${x}, Y: ${y}`;
        });

        items.forEach((el) => {
            el.addEventListener("click", () => {
                let id = el.id;
                let progress = 0;

                container.classList.remove(
                    "moment-1",
                    "moment-2",
                    "moment-3",
                    "moment-4"
                );

                switch (id) {
                    case "adn-hover1":
                        progress = 0.25;
                        container.classList.add("moment-1");
                        currentImage = imgChanged1;
                        break;
                    case "adn-hover2":
                        progress = 0.49;
                        container.classList.add("moment-2");
                        currentImage = imgChanged2;
                        break;
                    case "adn-hover3":
                        progress = 0.74;
                        container.classList.add("moment-3");
                        currentImage = imgChanged3;
                        break;
                    case "adn-hover4":
                        progress = 0.9;
                        container.classList.add("moment-4");
                        currentImage = imgChanged4;
                        break;
                }
                const scrollPosition =
                    progress * (scrollTrigger.end - scrollTrigger.start) +
                    scrollTrigger.start;

                gsap.to(window, {
                    scrollTo: { y: scrollPosition, autoKill: false },
                    duration: 0,
                    ease: "none",
                });
            });
        });

        // ScrollTrigger.refresh();
        console.log("adn");
        resolve();
    });
};

// adn();

const canvasHover = () => {
    const canvas = document.getElementById("canvas-name");
    const ctx = canvas.getContext("2d");

    const imgOriginal = new Image();
    imgOriginal.src = "../img/circulos-0.png";
    const imgChanged1 = new Image();
    imgChanged1.src = "../img/circulos-1-hover.png";
    const imgChanged2 = new Image();
    imgChanged2.src = "../img/circulos-2-hover.png";
    const imgChanged3 = new Image();
    imgChanged3.src = "../img/circulos-3-hover.png";
    const imgChanged4 = new Image();
    imgChanged4.src = "../img/circulos-4-hover.png";

    let currentImage = imgOriginal;

    // Dibuja la imagen en el canvas
    imgOriginal.onload = function () {
        ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
    };

    // Detecta el hover sobre áreas del canvas
    canvas.addEventListener("mousemove", function (event) {
        const x = event.offsetX;
        const y = event.offsetY;
        const tamañoZona = 100;

        // Cambiar imagen dependiendo de la posición del mouse
        // rango exacto if (x >= 425 && x <= 435 && y >= 2 && y <= 12) {

        if (
            x > 410 - tamañoZona / 2 &&
            x < 410 + tamañoZona / 2 &&
            y > 90 - tamañoZona / 2 &&
            y < 90 + tamañoZona / 2
        ) {
            currentImage = imgChanged1;
            canvas.style.cursor = "pointer";
        } else if (
            x > 290 - tamañoZona / 2 &&
            x < 290 + tamañoZona / 2 &&
            y > 325 - tamañoZona / 2 &&
            y < 325 + tamañoZona / 2
        ) {
            currentImage = imgChanged2;
            canvas.style.cursor = "pointer";
        } else if (
            x > 250 - tamañoZona / 2 &&
            x < 250 + tamañoZona / 2 &&
            y > 380 - tamañoZona / 2 &&
            y < 380 + tamañoZona / 2
        ) {
            currentImage = imgChanged3;
            canvas.style.cursor = "pointer";
        } else if (
            x > 216 - tamañoZona / 2 &&
            x < 216 + tamañoZona / 2 &&
            y > 474 - tamañoZona / 2 &&
            y < 474 + tamañoZona / 2
        ) {
            currentImage = imgChanged4;
            canvas.style.cursor = "pointer";
        } else {
            currentImage = imgOriginal;
            canvas.style.cursor = "default";
        }

        // Redibujar la imagen en el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);

        document.getElementById(
            "coords"
        ).textContent = `Coordenadas: X: ${x}, Y: ${y}`;
    });
};

// mediaQueryDesktop.addEventListener("change", () => {
//     // alert("m");
//     setTimeout(() => {
//         revealX(".adn .title-decorated", ".adn");
//         revealY(".adn .row .row > *", ".adn");
//         revealY(".team .title-decorated", ".team");
//         revealY(".team .team--layout", ".team", undefined, 3);
//     }, 1000);
// });

// window.addEventListener("load", () => {
//     // ScrollTrigger.refresh();
//
//     setTimeout(() => {
//         revealX(".adn .title-decorated", ".adn");
//         revealY(".adn .row .row > *", ".adn");
//         revealY(".team .title-decorated", ".team");
//         revealY(".team .team--layout", ".team", undefined, 3);
//     }, 1000);
// });

////////////

async function init() {
    try {
        await updateLayoutBasedOnMediaQuery();
        mediaQueryDesktop.addEventListener(
            "change",
            updateLayoutBasedOnMediaQuery
        );
        canvasHover();

        // console.log("Todas las funciones se ejecutaron en orden.");
    } catch (error) {
        console.error("Ocurrió un error:", error);
    }
}

init();