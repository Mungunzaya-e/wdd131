// javascript code for displaying the current date and time

// const currentYEar = document.querySelector("#currentyear");
// const lastEdited = document.querySelector("#lastModified");

// let date = new Date();

// let year = date.getFullYear();

// document.addEventListener('DOMContentLoaded', 
//     document.getElementById("currentyear").textContent = year
    
// );

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