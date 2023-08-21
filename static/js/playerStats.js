"use strict";

const buttonMainStats = document.getElementById("main-stats");
const buttonCharactersStats = document.getElementById("characters-stats");
const buttonItemsStats = document.getElementById("items-stats");
const vectMainProgression = [];

let controleur = null;

function gererClickMenu(event) {
    if (event.target.id === "main-stats") {
        buttonMainStats.classList.add("active");
        buttonCharactersStats.classList.remove("active");
        buttonItemsStats.classList.remove("active");
    }
    else if (event.target.id === "characters-stats") {
        buttonMainStats.classList.remove("active");
        buttonCharactersStats.classList.add("active");
        buttonItemsStats.classList.remove("active");
    }
    else if (event.target.id === "items-stats") {
        buttonMainStats.classList.remove("active");
        buttonCharactersStats.classList.remove("active");
        buttonItemsStats.classList.add("active");
    }
}

async function createDicoMainStats() {
    const allGameAchievements = await getAllGameAchievement();
    const completedAchievementsList = await get_all_completed_achievements();
    for (const achievement in dataMainProgression) {
        for (let i=0; i < completedAchievementsList.length; i++){
            if(achievement !== completedAchievementsList[i]){
                vectMainProgression.push(achievement);
            }
        }
    }
    console.log(vectMainProgression);
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


async function initialisation() {
    buttonMainStats.addEventListener('click', gererClickMenu);
    buttonCharactersStats.addEventListener('click', gererClickMenu);
    buttonItemsStats.addEventListener('click', gererClickMenu);
}

window.addEventListener('load', initialisation);
window.addEventListener('load', createDicoMainStats)