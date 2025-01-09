import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import lottie from "lottie-web";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

////////// PANELES

const paneles = () => {
    const headings = document.querySelectorAll(".heading");
    const nums = document.querySelectorAll(".scroll-num");

    const numOfTransitions = headings.length;
    const singleDuration = 500;
    const totalDuration = singleDuration * numOfTransitions;

    gsap.to("#humans-gif", {
        scrollTrigger: {
            trigger: ".header",
            // start: "-=300 top",
            end: "+=" + `${totalDuration}s`,
            pin: ".historia",
            // pin: true,
            pinSpacing: true,
            // markers: true,
        },
    });

    headings.forEach((heading, i) => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: heading,
                toggleActions: "play reverse play reverse",
                start: "+=" + `${singleDuration * i}s`,
                end: "+=" + `${singleDuration}s`,
                // markers: true,
                onEnter: () => {
                    gsap.to([heading, nums[i]], { opacity: 1 });

                    // if (i === headings.length - 1) {
                    //     console.log("ultimo enter");
                    // }
                },
                onLeave: () => {
                    gsap.to([heading, nums[i]], { opacity: 0 });

                    if (i === headings.length - 1) {
                        // console.log("ultimo leave");
                        gsap.to([heading, nums[i]], { opacity: 1 });
                    }
                },
                onEnterBack: () => {
                    gsap.to([heading, nums[i]], { opacity: 1 });

                    // if (i === headings.length - 1) {
                    //     console.log("ultimo enter back");
                    // }
                },
                onLeaveBack: () => {
                    if (i === 0) return;
                    gsap.to([heading, nums[i]], { opacity: 0 });

                    // if (i === headings.length - 1) {
                    //     console.log("ultimo leave back");
                    // }
                },
            },
        });
    });

    // Cargar la animación de Lottie
    const animation = lottie.loadAnimation({
        container: document.getElementById("humans-gif"),
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "./../lottie/GIF_HUMANS3.lottie.json",
    });

    // Sincronizar Lottie con el scroll
    animation.addEventListener("DOMLoaded", () => {
        const totalFrames = animation.totalFrames;

        ScrollTrigger.create({
            trigger: ".humans",
            start: "top top",
            end: "+=" + `${totalDuration}s`,
            scrub: true,
            // markers: true,
            onUpdate: (self) => {
                const frame = Math.round(totalFrames * self.progress); // Redondear el valor del frame
                const clampedFrame = Math.min(
                    totalFrames - 1,
                    Math.max(0, frame)
                ); // Limitar el frame
                animation.goToAndStop(clampedFrame, true);
            },
        });
    });
};

paneles();

/////////// ADN

const adn = () => {
    const container = document.querySelector(".adn");
    const imgAdn = document.querySelector("#img--adn");
    const items = document.querySelectorAll(".adn__hover-item");
    // Crear ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
        trigger: ".adn",
        start: "top top",
        end: "bottom+=400 top",
        pin: ".adn",
        pinSpacer: true,
        scrub: true,
        toggleActions: "play reverse play reverse",
        // markers: true,

        onUpdate: (self) => {
            const progress = self.progress;
            let currentMoment = "";

            // Determinar el momento actual basado en el progreso
            if (progress === 0) {
                currentMoment = "";
                imgAdn.setAttribute("src", "img/circulos.png");
            } else if (progress >= 0 && progress < 0.25) {
                currentMoment = "moment-1";
                imgAdn.setAttribute("src", "img/circulos-1.png");
            } else if (progress >= 0.25 && progress < 0.5) {
                currentMoment = "moment-2";
                imgAdn.setAttribute("src", "img/circulos-2.png");
            } else if (progress >= 0.5 && progress < 0.75) {
                currentMoment = "moment-3";
                imgAdn.setAttribute("src", "img/circulos-3.png");
            } else if (progress >= 0.75 && progress <= 1) {
                currentMoment = "moment-4";
                imgAdn.setAttribute("src", "img/circulos-4.png");
            }

            // Si ya tiene la clase correcta, no hacer nada
            if (!container.classList.contains(currentMoment)) {
                // Remover todas las clases previas
                container.classList.remove(
                    "moment-1",
                    "moment-2",
                    "moment-3",
                    "moment-4"
                );

                // Agregar la nueva clase si corresponde
                if (currentMoment) {
                    container.classList.add(currentMoment);
                }
            }
        },
    });

    // Lógica de clic para actualizar el progreso
    items.forEach((el) => {
        el.addEventListener("click", () => {
            let id = el.id;
            let progress = 0;

            // Remover clases previas
            container.classList.remove(
                "moment-1",
                "moment-2",
                "moment-3",
                "moment-4"
            );

            // Determinar el progreso basado en el ID
            switch (id) {
                case "adn-hover1":
                    progress = 0.25;
                    container.classList.add("moment-1");
                    imgAdn.setAttribute("src", "img/circulos-1.png");
                    break;
                case "adn-hover2":
                    progress = 0.49;
                    container.classList.add("moment-2");
                    imgAdn.setAttribute("src", "img/circulos-2.png");
                    break;
                case "adn-hover3":
                    progress = 0.74;
                    container.classList.add("moment-3");
                    imgAdn.setAttribute("src", "img/circulos-3.png");
                    break;
                case "adn-hover4":
                    progress = 0.9;
                    container.classList.add("moment-4");
                    imgAdn.setAttribute("src", "img/circulos-4.png");
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
};

adn();

const hoverAdn = () => {
    const items = document.querySelectorAll(".adn__hover-item");
    const container = document.querySelector(".adn");
    const imgAdn = document.querySelector("#img--adn");

    items.forEach((el) => {
        el.addEventListener("click", () => {
            let id = el.id;
            switch (id) {
                case "adn-hover1":
                    container.classList.remove(
                        "moment-1",
                        "moment-2",
                        "moment-3",
                        "moment-4"
                    );
                    container.classList.add("moment-1");
                    imgAdn.setAttribute("src", "img/circulos-1.png");
                    break;
                case "adn-hover2":
                    container.classList.remove(
                        "moment-1",
                        "moment-2",
                        "moment-3",
                        "moment-4"
                    );
                    container.classList.add("moment-2");
                    imgAdn.setAttribute("src", "img/circulos-2.png");

                    break;
                case "adn-hover3":
                    container.classList.remove(
                        "moment-1",
                        "moment-2",
                        "moment-3",
                        "moment-4"
                    );
                    container.classList.add("moment-3");
                    imgAdn.setAttribute("src", "img/circulos-3.png");
                    break;

                case "adn-hover4":
                    container.classList.remove(
                        "moment-1",
                        "moment-2",
                        "moment-3",
                        "moment-4"
                    );
                    container.classList.add("moment-4");
                    imgAdn.setAttribute("src", "img/circulos-4.png");
                    break;
            }
        });
    });
};

// hoverAdn();

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

revealX(".adn .title-decorated", ".adn");
revealY(".adn .row .row > *", ".adn");
revealY(".team .title-decorated", ".team");
revealY(".team .team--layout", ".team", undefined, 3);
