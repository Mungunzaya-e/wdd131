document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.querySelector("#currentyear");
    const lastModifiedElement = document.querySelector("#lastModified");

    const date = new Date();
    currentYearElement.textContent = date.getFullYear();

    if (document.lastModified) {
        const modifiedDate = new Date(document.lastModified).toLocaleString();
        lastModifiedElement.textContent = "Last Modified: " + modifiedDate;
    }
});

const mainNav = document.querySelector(".navigation")
const hamButton = document.querySelector("#menu")

hamButton.addEventListener("click", () => {
    mainNav.classList.toggle("show");
    hamButton.classList.toggle("show");
})