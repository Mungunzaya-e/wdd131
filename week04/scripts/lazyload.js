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