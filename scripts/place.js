document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.querySelector("#currentyear");
    const lastModifiedElement = document.querySelector("#lastModified");

    const date = new Date();
    currentYearElement.textContent = date.getFullYear();

    if (document.lastModified) {
        const modifiedDate = new Date(document.lastModified).toLocaleString();
        lastModifiedElement.textContent = "Last Modified: " + modifiedDate;
    }

    const temperature = document.getElementById("temp");
    const windSpeed = document.getElementById("wind-speed");
    const windChill = document.getElementById("wind-chill");

    let tempValue = parseInt(temperature.textContent);
    let speedValue = parseInt(windSpeed.textContent);

    function calculateWindChill(temperature, speed) {
        return (0.6215 * temperature - 11.37 * (speed ** 0.16) + 0.3965 * temperature * (speed ** 0.16) + 13.12);
    }

    if (tempValue <= 10 && speedValue > 4.8) {
        let windChillValue = calculateWindChill(tempValue, speedValue);
        windChill.textContent = `${windChillValue.toFixed(1)} °C`;
    }

    else {
        windChill.textContent = "N/A";
    }
});

