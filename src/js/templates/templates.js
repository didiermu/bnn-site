// HEADER

document.addEventListener("DOMContentLoaded", function () {
    fetch("./templates/header.html")
        .then((response) => response.text())
        .then((data) => {
            document.querySelector("header").innerHTML = data;
        })
        .catch((error) => console.error("Error cargando el header:", error));
});

// FOOTER

document.addEventListener("DOMContentLoaded", function () {
    fetch("./templates/footer.html")
        .then((response) => response.text())
        .then((data) => {
            document.querySelector(".footer").innerHTML = data;
        })
        .catch((error) => console.error("Error cargando el footer:", error));
});
