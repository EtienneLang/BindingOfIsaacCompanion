"use strict";


const steamIdInput = document.getElementById("steamid-input");
const steamIdButton = document.getElementById("steamid-button");
let steamIdValidationText = document.getElementById("validation_steam_id");


/**
 * Permets de rediriger vers la page de l'utilisateur
 */
function steamIdToURL() {
    let valide = true;
    steamIdValidationText.innerHTML = "";
    if (steamIdInput.value === "") {
        steamIdValidationText.innerHTML = "Please enter a Steam ID ;(";
        valide = false;
    }
    if (valide){
        location.replace("/api/" + steamIdInput.value);
    }
    else{
        steamIdInput.className = "is-invalid";
    }
}



async function initialisation() {
    steamIdButton.addEventListener('click', steamIdToURL);
    steamIdInput.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            steamIdButton.click();
        }
    });
}

window.addEventListener('load', initialisation)