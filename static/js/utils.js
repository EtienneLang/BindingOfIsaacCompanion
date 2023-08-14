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
    // else if (isNaN(steamIdInput.value)) {
    //     steamIdValidationText.innerHTML = "A Steam ID is only composed of numbers";
    //     valide = false;
    // }
    // else if (steamIdInput.value.length !== 17) {
    //     steamIdValidationText.innerHTML = "A Steam ID does not count more than 17 characters";
    //     valide = false;
    // }

    if (valide){
        location.replace("http://127.0.0.1:5000/api/" + steamIdInput.value);
    }
    else{
        steamIdInput.className = "is-invalid";
    }
}



async function initialisation() {
    steamIdButton.addEventListener('click', steamIdToURL);
}

window.addEventListener('load', initialisation)