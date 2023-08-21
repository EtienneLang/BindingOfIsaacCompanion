/**
 * Pour faciliter les requêtes Ajax.
 */

"use strict";


/**
 * Envoie une requête AJAX et parse la réponse en JSON
 * @param {string} url Adresse utilisée pour votre requête
 * @param {string} methode Indique si la requête est en GET ou POST
 * @param {Object.<string, string>} parametres Tableau associatif des paramètres GET ou POST
 * @param {AbortController} controleur Permet d'annuler la requête
 * @return {Object.<string, *>} Tableau associatif retourné par le serveur
 */
async function envoyerRequeteAjax(
    url,
    methode = "GET",
    parametres = {},
    controleur = null
) {
    let urlCible = url;

    let body = null;
    if ((parametres !== null) && (Object.keys(parametres).length > 0)) {
        const paramStr = new URLSearchParams(parametres);
        if (methode.toUpperCase() === "GET") {
            urlCible = `${urlCible}?${paramStr}`;
        } else {
            body = paramStr;
        }
    }

    const parametresFetch = {
        method: methode,
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: body,
        cache: "no-store"
    }

    if (controleur != null) {
        parametresFetch["signal"] = controleur.signal
    }

    const reponse = await fetch(
        urlCible,
        parametresFetch
    );

    if (!reponse.ok) {
        // Pour gérer les codes 4xx et 5xx :
        throw new Error(`${reponse.status} ${reponse.statusText}`)
    }

    return await reponse.json();
}

function get_all_completed_achievements() {
    controleur = new AbortController()

    try {
        const achievements = envoyerRequeteAjax(
            "/api/MyAchievements/get_all_completed_achievements",
            "GET",
            null,
            controleur);

        return achievements;
    } catch (error) {
        console.log(error);
    }
}
function getAllGameAchievement() {

    controleur = new AbortController()

    try {
        const achievements = envoyerRequeteAjax(
            "/api/get_all_game_achievements",
            "GET",
            null,
            controleur);

        return achievements;
    } catch (error) {
        console.log(error);
    }
}