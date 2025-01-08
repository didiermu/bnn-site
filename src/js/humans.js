import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import lottie from "lottie-web";

gsap.registerPlugin(ScrollTrigger);

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

    ScrollTrigger.create({
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

            container.classList.remove(
                "moment-1",
                "moment-2",
                "moment-3",
                "moment-4"
            );

            if (progress === 0) {
                container.classList.remove("moment-1");
                imgAdn.setAttribute("src", "img/circulos.png");
            } else if (progress >= 0 && progress < 0.25) {
                container.classList.add("moment-1");
                imgAdn.setAttribute("src", "img/circulos-1.png");
            } else if (progress >= 0.25 && progress < 0.5) {
                container.classList.add("moment-2");
                imgAdn.setAttribute("src", "img/circulos-2.png");
            } else if (progress >= 0.5 && progress < 0.75) {
                container.classList.add("moment-3");
                imgAdn.setAttribute("src", "img/circulos-3.png");
            } else if (progress >= 0.75 && progress <= 1) {
                container.classList.add("moment-4");
                imgAdn.setAttribute("src", "img/circulos-4.png");
            }
        },
    });
};

adn();

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
