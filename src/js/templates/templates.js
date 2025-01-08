import { Modal } from "bootstrap";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// HEADER

document.addEventListener("DOMContentLoaded", function () {
    fetch("./templates/header.html")
        .then((response) => response.text())
        .then((data) => {
            document.querySelector("header").innerHTML = data;
        })
        .catch((error) => console.error("Error cargando el header:", error));

    if (window.location.hash === "#modal-servicios") {
        const myModal = new Modal(document.getElementById("modal-servicios"));
        myModal.show();
    }
});

// FOOTER

document.addEventListener("DOMContentLoaded", function () {
    fetch("./templates/footer.html")
        .then((response) => response.text())
        .then((data) => {
            document.querySelector(".footer").innerHTML = data;
            reveal(".footer h2", ".footer");
        })
        .catch((error) => console.error("Error cargando el footer:", error));

    const reveal = (el, trigger) => {
        gsap.fromTo(
            el,
            {
                scale: 0,
                opacity: 0,
            },
            {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "none",
                scrollTrigger: {
                    trigger: trigger,
                    start: "-=400 center",
                    end: "+=200 center",
                    scrub: 1,
                    toggleActions: "restart pause reverse pause",
                    // markers: true,
                },
            }
        );
    };
});
