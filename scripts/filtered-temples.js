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

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x250/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Chicago Illinois",
    location: "Chicago, Illinois, United States",
    dedicated: "1985, August, 9",
    area: 37062,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/chicago-illinois/400x250/Chicago-Temple_0784.jpg"
  },
  {
    templeName: "Hong Kong China",
    location: "Hong Kong, China",
    dedicated: "1996, May, 26",
    area: 51921,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/hong-kong-china/400x250/hong_kong_china_temple_bride-room.jpeg"
  },
  {
    templeName: "Stockholm Sweden",
    location: "Stockholm, Sweden",
    dedicated: "1985, July, 2",
    area: 31000,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/stockholm-sweden/400x250/stockholm-sweden-lds-temple-1029790-wallpaper.jpg"
  }
];

const container = document.getElementById("temples");
const oldTemples = document.getElementById("old");
const allTemples = document.getElementById("home");
const newTemples = document.getElementById("new");
const largeTemples = document.getElementById("large");
const smallTemples = document.getElementById("small");

function clearTemples() {
    container.innerHTML = '';
}


function createTempleCard(temples) {
    temples.forEach(element => {

        const templeCard = document.createElement("div");
            
        const templeName = document.createElement("h3");
        templeName.innerHTML = element.templeName;
        templeCard.appendChild(templeName);

        const templeLocation = document.createElement("p");
        templeLocation.innerHTML = `Location: ${element.location}`;
        templeCard.appendChild(templeLocation);

        const dedication = document.createElement("p");
        dedication.innerHTML = `Dedicated: ${element.dedicated}`;
        templeCard.appendChild(dedication);

        const templeArea = document.createElement("p");
        templeArea.innerHTML = `Size: ${element.area} sq ft`;
        templeCard.appendChild(templeArea);

        const templeImage = document.createElement("img");
        templeImage.src = element.imageUrl;
        templeImage.alt = element.templeName;
        templeImage.loading = "lazy";
        //templeImage.width = 400;
        //templeImage.height = 250;
        templeCard.appendChild(templeImage);

        container.appendChild(templeCard);

        console.log(templeCard);
    });
};

createTempleCard(temples);

allTemples.addEventListener('click', () => {
    createTempleCard(temples);
})

oldTemples.addEventListener('click', () => {
    clearTemples();
    
    const filteredTemples = temples.filter(temple => {
        const year = new Date(temple.dedicated).getFullYear();
        return year < 1900;
    })

    createTempleCard(filteredTemples);
});

newTemples.addEventListener('click', () => {
    clearTemples();
    
    const filteredTemples = temples.filter(temple => {
        const year = new Date(temple.dedicated).getFullYear();
        return year > 2000;
    })

    createTempleCard(filteredTemples);
});

largeTemples.addEventListener('click', () => {
    clearTemples();
    
    const filteredTemples = temples.filter(temple => {
        const area = parseInt(temple.area);
        return area > 90000;
    })

    createTempleCard(filteredTemples);
});

smallTemples.addEventListener('click', () => {
    clearTemples();
    
    const filteredTemples = temples.filter(temple => {
        const area = parseInt(temple.area);
        return area < 10000;
    })

    createTempleCard(filteredTemples);
});